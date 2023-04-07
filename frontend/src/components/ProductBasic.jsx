import axios from 'axios';
import { useState } from 'preact/hooks';
import { AiOutlineCreditCard, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillStarFill } from 'react-icons/bs';
import { FaMoneyBillAlt, FaShippingFast } from 'react-icons/fa';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import HeaderTitle from './HeaderTitle';
import toast from 'react-hot-toast';
import { useStore } from '../stores/user';

const services = [
  { icon: <AiOutlineCreditCard />, title: 'Hỗ trợ trả góp 0%, trả trước 0đ' },
  { icon: <FaMoneyBillAlt />, title: 'Hoàn tiền 200% nếu có hàng giả' },
  { icon: <FaShippingFast />, title: 'Giao hàng nhanh trên toàn quốc' },
  { icon: <IoChatboxEllipsesOutline />, title: 'Hỗ trợ kĩ thuật online 24/7' },
];

function ProductBasic({ item, currentTab, setCurrentTab, inventory }) {
  const [quantity, setQuantity] = useState(1);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const cart = JSON.parse(localStorage.getItem('cart'));
  const setTotalItems = useStore((state) => state.setTotalItems);

  const handleAddToCart = async () => {
    if (!user) navigate('/signin');
    const [_, type, itemId] = pathname.split('/');
    const { title, price, thumbnail } = item;
    const token = localStorage.getItem('access-token');
    const product = {
      title,
      price,
      type,
      itemId,
      quantity,
      thumbnail: thumbnail || item.details.gallery[0],
    };
    const { data } = await axios.post('users/add-to-cart', product, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.status !== 200) {
      toast.error(data.message);
      return;
    }
    toast.success('Thêm vào giỏ hàng thành công');
    const isExistedItem = cart.find((item) => item.itemId === itemId);
    if (isExistedItem) {
      localStorage.setItem(
        'cart',
        JSON.stringify([
          ...cart.filter((x) => x.itemId !== itemId),
          { ...product, quantity: product.quantity + isExistedItem.quantity },
        ])
      );
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, product]));
    }
    const localCart = JSON.parse(localStorage.getItem('cart'));
    setTotalItems(
      localCart.reduce((total, item) => (total += item.quantity), 0)
    );
  };

  return (
    <>
      <div className='flex gap-10 mt-10'>
        {item.details.gallery?.length ? (
          <Swiper
            slidesPerView={1}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            className='mb-8 flex-1'
            autoplay={{
              disableOnInteraction: false,
            }}
          >
            {item.details.gallery?.map((src) => (
              <SwiperSlide key={src}>
                <img src={src} alt={item?.title} className='w-full' />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={item.thumbnail}
            alt={item?.title}
            className='object-contain flex-1'
          />
        )}
        <div className='flex-1'>
          <h1 className='text-emerald-500 text-3xl font-semibold'>
            {item.title}
          </h1>
          <div className='flex items-center gap-4 my-2'>
            <span className='flex gap-0.5 items-center group-hover:opacity-0 duration-100'>
              {[1, 2, 3, 4, 5].map((item, idx) => (
                <span className='text-yellow-400' key={idx}>
                  <BsFillStarFill />
                </span>
              ))}
            </span>
            <p className='text-sm font-semibold opacity-50 group-hover:opacity-0 duration-100'>
              20 đánh giá
            </p>
          </div>
          <div>
            {item.features.map((feature) => (
              <p className='mb-2' key={feature.type}>
                - {feature.type}: {feature.name}
              </p>
            ))}
          </div>
          <div
            className={`text-${
              inventory > 0 ? 'emerald' : 'rose'
            }-500 flex items-center gap-2 font-semibold uppercase`}
          >
            <RiCheckboxBlankCircleFill />
            {inventory > 0 ? 'Còn hàng' : 'Hết hàng'}
            <span className='text-xs text-gray-600'>{`Còn ${inventory} sản phẩm`}</span>
          </div>
          <div className='flex gap-5 items-center mt-3'>
            <span className='font-semibold w-max'>Số lượng</span>
            <div className='flex items-center'>
              <input
                type='number'
                value={quantity}
                className='border border-r-0 outline-none p-4 h-11 w-16 text-2xl text-emerald-500 text-center font-bold'
                readOnly
                min={1}
                max={item.quantity}
              />
              <span className='flex flex-col items-center justify-center'>
                <button
                  className='border border-b-0 p-0.5 outline-none'
                  onClick={() =>
                    quantity < item.quantity && setQuantity(quantity + 1)
                  }
                >
                  <HiPlusSm />
                </button>
                <button
                  className='border p-0.5 outline-none'
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <HiMinusSm />
                </button>
              </span>
            </div>
            <span className='flex-1 text-right text-4xl text-rose-500 font-bold'>
              {item.price.toLocaleString('vi-VN')} đ
            </span>
          </div>
          <div className='flex items-center gap-8 mt-5'>
            <button
              className='flex justify-center gap-2 items-center border border-emerald-500 text-emerald-500 uppercase font-bold px-5 py-3 flex-1'
              onClick={handleAddToCart}
            >
              <span className='text-xl'>
                <AiOutlineShoppingCart />
              </span>
              Thêm vào giỏ
            </button>
            <button className='flex justify-center gap-2 items-center bg-emerald-500 text-white uppercase font-bold px-5 py-3 flex-1'>
              <span className='text-2xl'>
                <HiPlusSm />
              </span>
              Mua hàng
            </button>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-8 text-emerald-800 mt-10'>
        {services.map(({ title, icon }) => (
          <div
            key={title}
            className='flex items-center gap-4 bg-emerald-100 p-7 text-sm'
          >
            <span className='text-5xl -skew-x-12'>{icon}</span>
            {title}
          </div>
        ))}
      </div>
      <HeaderTitle title='Thông tin sản phẩm' />
      <ul className='flex bg-gray-100'>
        <li
          className={`cursor-pointer py-2 px-4 font-semibold text-lg hover:text-white hover:bg-emerald-500 duration-150 ${
            currentTab === 'specs' ? 'bg-emerald-500 text-white' : ''
          }`}
          onClick={() => setCurrentTab('specs')}
        >
          Thông số kỹ thuật
        </li>
        <li
          className={`cursor-pointer py-2 px-4 font-semibold text-lg hover:text-white hover:bg-emerald-500 duration-150 ${
            currentTab === 'details' ? 'bg-emerald-500 text-white' : ''
          }`}
          onClick={() => setCurrentTab('details')}
        >
          Chi tiết sản phẩm
        </li>
        <li
          className={`cursor-pointer py-2 px-4 font-semibold text-lg hover:text-white hover:bg-emerald-500 duration-150 ${
            currentTab === 'reviews' ? 'bg-emerald-500 text-white' : ''
          }`}
          onClick={() => setCurrentTab('reviews')}
        >
          Review sản phẩm
        </li>
      </ul>
    </>
  );
}

export default ProductBasic;
