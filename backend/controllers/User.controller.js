const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const nodemailer = require('nodemailer');
const { nodeMailerToken, accessToken } = require('../helpers/create-token');
const ResetPassword = require('../models/ResetPassword.model');
const moment = require('moment');
const JWT = require('jsonwebtoken');
require('dotenv').config();

const sendEmail = async ({ email, name, token, host }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'noreply@TNC-Computer',
      html: `
      <div style="color: #000;">
      <p>Xin chào <strong>${name}</strong></p>
      <p>Cảm ơn bạn đã đăng ký tài khoản trên TNC Computer. Để có được trải nghiệm dịch vụ và được hỗ trợ tốt nhất, bạn cần hoàn thiện xác thực tài khoản.</p>
      <p>Vui lòng bấm nút Xác thực để hoàn tất quá trình này<p/>
      <br/>
      <a style="padding: 10px 20px; border-radius: 4px; background: #10b981; color: #fff; text-decoration: none; margin: 10px 0; display: inline-block" href="${host}/verify?token=${token}">Xác thực</a>
      <br/>
      <strong>Trân trọng,
      <br/>
      TNC Computer
      </strong>
      </div>`,
    });
  } catch (err) {
    throw new Error("Can't send email");
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!email) {
      throw createError.BadRequest();
    }
    const user = await User.findOne({
      email,
    });
    if (user) {
      throw createError.Conflict('Email đã được đăng ký.');
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      const user = await User.create({
        ...req.body,
        password: hash,
        status: 1,
      });
      if (user) {
        const host = req.protocol + '://' + req.get('host');
        const redirectUrl = req.headers.origin;
        const token = await nodeMailerToken({ name, redirectUrl });
        await sendEmail({ email, name, token, host });
      }
    });
    res.status(200).json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

const resetUserPassword = async (req, res, next) => {
  try {
    const { email, password, verifyCode } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError.NotFound('Email chưa đăng ký!');
    }
    const doc = await ResetPassword.findOne({ email });
    if (!doc) {
      throw createError.BadRequest('Vui lòng lấy mã xác thực!');
    }
    const isExpired = moment(moment()).isSameOrAfter(doc.ttl);
    if (isExpired) {
      throw createError.NotAcceptable('Mã này đã hết hạn!');
    }
    if (doc.code !== verifyCode) {
      throw createError.NotAcceptable('Mã xác minh không đúng!');
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      await User.findOneAndUpdate({ email }, { password: hash });
      await ResetPassword.deleteMany({ email });
    });
    res.status(200).json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { email, name, phoneNumber } = req.body;
    await User.findOneAndUpdate({ email }, { name, phoneNumber });
    res.status(200).json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

const updateUserStatus = async (req, res, next) => {
  try {
    const { status, email } = req.body;
    await User.findOneAndUpdate({ email }, { status });
    res.status(200).json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email });
    const isValidPwd = await bcrypt.compare(password, user.password);
    if (!isValidPwd) {
      throw createError.NotAcceptable('Mật khẩu không đúng!');
    }
    bcrypt.hash(newPassword, 10, async (err, hash) => {
      await User.findOneAndUpdate({ email }, { password: hash });
    });
    res.status(200).json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError.NotAcceptable(
        'Tên đăng nhập hoặc mật khẩu không đúng!'
      );
    }
    const isValidPwd = await bcrypt.compare(password, user.password);
    if (!isValidPwd) {
      throw createError.NotAcceptable('Mật khẩu không đúng!');
    }
    if (user.status === 1) {
      throw createError.NotAcceptable('Vui lòng kiểm tra email để xác thực!');
    }
    if (user.status === 0) {
      throw createError.NotAcceptable(
        'Tài khoản bị cấm! Vui lòng liên hệ quản trị viên'
      );
    }
    const token = await accessToken({
      role: 'user',
      email,
    });
    res.status(200).json({
      status: 200,
      token,
      user: {
        email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        cart: user.cart,
        address: user.address,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateUserCart = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw createError.Unauthorized('Người dùng chưa đăng nhập');
    }
    const isValidToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!isValidToken) {
      throw createError.Unauthorized('Người dùng chưa đăng nhập');
    }
    const { email } = isValidToken;
    const user = await User.findOne({ email });
    if (req.body.delete === 'all') {
      await User.findOneAndUpdate({ email }, { cart: [] });
    } else if (req.body.delete === 'item') {
      const userCart = user.cart.filter(
        (item) => item.itemId !== req.body.itemId
      );
      await User.findOneAndUpdate(
        { email },
        {
          cart: userCart,
        }
      );
    } else if (req.body.updateCart) {
      const userCart = user.cart.filter(
        (item) => item.itemId !== req.body.itemId
      );
      const { itemId, type, title, thumbnail, price } = user.cart.find(
        (item) => item.itemId === req.body.itemId
      );
      await User.findOneAndUpdate(
        { email },
        {
          cart: [
            ...userCart,
            {
              itemId,
              type,
              title,
              thumbnail,
              price,
              quantity: req.body.quantity,
            },
          ],
        }
      );
    } else {
      const itemInCart = user.cart.find(
        (item) => item.itemId === req.body.itemId
      );
      if (itemInCart) {
        const userCart = user.cart.filter(
          (item) => item.itemId !== req.body.itemId
        );
        await User.findOneAndUpdate(
          { email },
          {
            cart: [
              ...userCart,
              {
                ...req.body,
                quantity: itemInCart.quantity + req.body.quantity,
              },
            ],
          }
        );
      } else {
        await User.findOneAndUpdate(
          { email },
          { cart: [...user.cart, { ...req.body }] }
        );
      }
    }
    res.json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await User.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const users = await User.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: users,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  resetUserPassword,
  loginUser,
  updateUserProfile,
  updateUserPassword,
  updateUserCart,
  getAllUsers,
  updateUserStatus,
};
