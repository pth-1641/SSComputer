import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'preact/hooks';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/user';

const cartInfo = [
  'Hỗ trợ trả góp 0%, trả trước 0đ',
  'Hoàn tiền 200% khi phát hiện hàng giả',
  'Giao hàng nhanh 3H nội thành Hà Nội',
  'Giao hàng từ 5 - 7 ngày toàn quốc',
  'Đội ngũ kĩ thuật hỗ trợ online 7/7',
];

const formFields = [
  {
    name: 'email',
    field: 'Email',
    type: 'text',
  },
  {
    name: 'name',
    field: 'Họ tên',
    type: 'text',
  },
  {
    name: 'phoneNumber',
    field: 'Số điện thoại',
    type: 'text',
  },
  {
    name: 'address',
    field: 'Địa chỉ',
    type: 'text',
  },
];

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem('access-token');
  const setTotalItems = useStore((state) => state.setTotalItems);
  const user = useStore((state) => state.user);

  const totalAmount = cart?.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );
  const totalItems = cart?.reduce((total, item) => (total += item.quantity), 0);
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    setCart(JSON.parse(cart));
  }, []);

  const handleDeleleAllCart = async () => {
    const { data } = await axios.post(
      'users/add-to-cart',
      {
        delete: 'all',
      },
      options
    );
    if (data.status !== 200) {
      toast.error(data.message);
      return;
    }
    toast.success('Xoá thành công');
    localStorage.setItem('cart', '[]');
    setCart([]);
  };

  const handleDeleteItem = async (itemId) => {
    const { data } = await axios.post(
      'users/add-to-cart',
      {
        delete: 'item',
        itemId,
      },
      options
    );
    if (data.status !== 200) {
      toast.error(data.message);
      return;
    }
    toast.success('Xoá thành công');
    const items = cart.filter((item) => item.itemId !== itemId);
    localStorage.setItem('cart', JSON.stringify(items));
    setCart(items);
  };

  const handleUpdateQuantity = async ({ item, type }) => {
    const { quantity, itemId } = item;
    const nextQuantity = type === 'decrease' ? quantity - 1 : quantity + 1;
    if (nextQuantity <= 0) {
      await handleDeleteItem(item.itemId);
    } else {
      const { data } = await axios.post(
        'users/add-to-cart',
        {
          itemId: itemId,
          quantity: nextQuantity,
          updateCart: true,
        },
        options
      );
      if (data.status !== 200) {
        toast.error(data.message);
        return;
      }
      toast.success('Cập nhật thành công');
      const cart = JSON.parse(localStorage.getItem('cart'));
      const itemIdx = cart.findIndex((item) => item.itemId === itemId);
      cart.splice(itemIdx, 1, {
        ...item,
        quantity: nextQuantity,
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      setCart(cart);
      setTotalItems(cart.reduce((total, item) => (total += item.quantity), 0));
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phoneNumber: '',
      address: '',
    },
  });

  useEffect(() => {
    if (!user) return;
    formik.setValues(user);
  }, [user]);

  const handleNewOrder = async () => {
    if (cart.length === 0) {
      toast.error('Không thể đặt đơn hàng rỗng');
      return;
    }
    const { email, address, name, phoneNumber } = user;
    const token = localStorage.getItem('access-token');
    const { data } = await axios.post(
      'order/create',
      {
        email,
        items: cart,
        customer: {
          address,
          name,
          phoneNumber,
        },
        status: 1,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (data.status !== 200) {
      toast.error(data.message);
      return;
    }
    toast.success('Đặt hàng thành công');
    localStorage.setItem('cart', '[]');
    setCart([]);
    setTotalItems(0);
  };

  return (
    <div className='grid grid-cols-10 items-stretch gap-10 mt-5'>
      <div className='col-span-6'>
        <h3 className='text-2xl font-semibold text-emerald-600 uppercase mb-2'>
          Thông tin sản phẩm
        </h3>
        {cart?.length > 0 ? (
          cart?.map((item) => (
            <div className='w-full border p-2 flex items-center gap-5 mb-2'>
              <img src={item.thumbnail} alt='' className='h-16' />
              <div className='flex-1'>
                <Link to={`/${item.type}/${item.itemId}`}>
                  <h5 className='text-emerald-700 font-medium hover:underline'>
                    {item.title}
                  </h5>
                </Link>
                <span className='text-rose-500 font-semibold'>
                  {item.price?.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <button
                  className='px-2 bg-gray-300'
                  onClick={() =>
                    handleUpdateQuantity({
                      item,
                      type: 'decrease',
                    })
                  }
                >
                  -
                </button>
                <span className='text-emerald-500 font-bold'>
                  {item.quantity}
                </span>
                <button
                  className='px-2 bg-gray-300'
                  onClick={() =>
                    handleUpdateQuantity({
                      item,
                      type: 'increase',
                    })
                  }
                >
                  +
                </button>
              </div>
              <button
                className='text-emerald-500 text-lg mr-3'
                onClick={() => handleDeleteItem(item.itemId)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className='text-emerald-600'>
            Bạn đang không có sản phẩm nào trong giỏ hàng.
          </p>
        )}
        <h3 className='text-2xl font-semibold text-emerald-600 uppercase mt-4 mb-2'>
          Thông tin khách hàng
        </h3>
        {formFields.map(({ field, type, name }) => (
          <div key={name} className='mb-3'>
            <div className='grid grid-cols-10 items-center gap-5'>
              <label htmlFor={name} className='col-span-2 text-left'>
                {field}
              </label>
              <div className='col-span-8'>
                <input
                  type={type}
                  className={`px-4 py-2 w-full outline-none border`}
                  value={formik.values[name]}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        ))}
        <Link to='/user'>
          <button className='w-max px-4 py-2 bg-emerald-500 text-white ml-auto block'>
            Chỉnh sửa
          </button>
        </Link>
      </div>
      <div className='col-span-4'>
        <div className='bg-emerald-50 p-4'>
          <h4 className='font-bold text-lg text-emerald-600'>
            Thông tin giỏ hàng
          </h4>
          <div className='flex items-center justify-between my-1'>
            <h5 className='font-semibold text-emerald-600'>
              Số lượng sản phẩm
            </h5>
            <span className='font-bold text-sky-600 text-lg'>{totalItems}</span>
          </div>
          <div className='flex items-center justify-between'>
            <h5 className='font-semibold text-emerald-600'>Tổng chi phí</h5>
            <span className='font-bold text-rose-500 text-lg'>
              {totalAmount?.toLocaleString('vi-VN')} đ
            </span>
          </div>
          <span className='ml-auto block w-max text-sm text-gray-700'>
            Đã bao gồm VAT (nếu có)
          </span>
          <button
            className='w-full py-3 font-bold uppercase bg-emerald-500 text-white mt-3'
            onClick={handleNewOrder}
          >
            Xác nhận đơn hàng
          </button>
          <button
            className='w-full py-3 font-bold uppercase bg-red-500 text-white my-3'
            onClick={handleDeleleAllCart}
          >
            Xoá giỏ hàng
          </button>
          <button
            className='w-full py-3 font-bold uppercase border-2 border-emerald-500 text-emerald-500'
            onClick={() => {
              navigate('/browse');
            }}
          >
            Xem sản phẩm khác
          </button>
        </div>
        <ul className='my-5'>
          {cartInfo.map((text) => (
            <p className='text-sm flex items-center gap-2 mt-2 text-emerald-800'>
              <span className='text-green-500 text-base'>
                <IoCheckmarkCircle />
              </span>
              {text}
            </p>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cart;
