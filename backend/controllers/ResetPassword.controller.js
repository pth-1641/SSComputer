const User = require('../models/User.model');
const ResetPassword = require('../models/ResetPassword.model');
const createError = require('http-errors');
const nodemailer = require('nodemailer');
const { nodeMailerToken } = require('../helpers/create-token');
require('dotenv').config();

const sendEmail = async ({ email, code }) => {
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
      subject: 'Reset Password [TNC Computer]',
      html: `
      <div style="color: #000">
        <p style="color: #000">Yêu cầu cấp lại mật khẩu.</p>
        <p style="color: #000">Mã của bạn là <strong>${code}</strong></p>
        <p style="color: #000">Mã này có hiệu lực <strong><i>15 phút</i></strong></p>
        <p style="color: #000">Nếu bạn không phải người yêu cầu. Vui lòng bỏ qua tin nhắn này.</p>
        <strong style="color: #000">Trân trọng,
        <br/>
        TNC Computer
        </strong>
      </div>`,
    });
  } catch (err) {
    throw new Error("Can't send email");
  }
};

const genResetCode = () => {
  const TOTAL_NUMS = 10;
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let code = '';
  for (let i = 0; i < 6; i++) {
    const position = Math.floor(Math.random() * TOTAL_NUMS);
    code += nums[position];
  }
  return parseInt(code);
};

const createResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError.NotFound('Email chưa đăng ký!');
    }
    const deleteExistedDoc = await ResetPassword.deleteMany({ email });
    const code = genResetCode();
    const ttl = new Date().getTime() + 15 * 60 * 1000; //Time to live 15 minutes
    const resetPwd = await ResetPassword.create({
      email,
      code,
      ttl,
      isVerify: false,
    });
    if (resetPwd) await sendEmail({ email, code });
    res.status(200).json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createResetPassword,
};
