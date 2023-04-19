import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { IoCheckmarkCircle, IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../stores/user';

const cartInfo = [
  'Hỗ trợ trả góp 0%, trả trước 0đ',
  'Hoàn tiền 200% khi phát hiện hàng giả',
  'Giao hàng nhanh 3H nội thành Hà Nội',
  'Giao hàng từ 5 - 7 ngày toàn quốc',
  'Đội ngũ kĩ thuật hỗ trợ online 7/7',
];

function CartModal({ isOpenModal, setIsOpenModal }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem('access-token');
  const setTotalItems = useStore((state) => state.setTotalItems);

  const totalAmount = cart?.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );

  const totalItems = cart?.reduce((total, item) => (total += item.quantity), 0);
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    setCart(cart);
  }, [isOpenModal]);

  useEffect(() => {
    if (isOpenModal) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'unset';
    }
  }, [isOpenModal]);

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
    const localCart = JSON.parse(localStorage.getItem('cart'));
    setTotalItems(
      localCart.reduce((total, item) => (total += item.quantity), 0)
    );
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

  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 duration-150 ${
        isOpenModal
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;
        setIsOpenModal(false);
      }}
    >
      <div className='aspect-video h-[85vh] bg-white relative py-3 px-5 overflow-auto'>
        <span
          className='absolute top-3 right-3 text-4xl cursor-pointer'
          onClick={() => setIsOpenModal(false)}
        >
          <IoClose />
        </span>
        <h3 className='text-xl font-semibold text-emerald-600'>
          Bạn đang có {totalItems} sản phẩm trong giỏ hàng
        </h3>
        <div className='grid grid-cols-10 items-stretch gap-10 mt-5'>
          <div className='col-span-6'>
            {cart?.length > 0 ? (
              cart?.map((item) => (
                <div className='w-full border p-2 flex items-center gap-5 mb-2'>
                  <img src={item.thumbnail} alt='' className='h-16' />
                  <div className='flex-1'>
                    <h5 className='text-emerald-700 font-medium'>
                      {item.title}
                    </h5>
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
                <span className='font-bold text-sky-600 text-lg'>
                  {totalItems}
                </span>
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
                onClick={() => {
                  setIsOpenModal(false);
                  navigate('/order');
                }}
              >
                Đến giỏ hàng
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
                  setIsOpenModal(false);
                  navigate('/browse');
                }}
              >
                Xem sản phẩm khác
              </button>
            </div>
            <ul className='mt-5'>
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
      </div>
    </div>
  );
}

export default CartModal;
