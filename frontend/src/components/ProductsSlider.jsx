import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import HeaderTitle from './HeaderTitle';

function ProductsSlider({ title, items, link }) {
  const navigate = useNavigate();

  return (
    <>
      <HeaderTitle title={title} />
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        loop={true}
        navigation={true}
        modules={[Navigation]}
      >
        {items?.map((item) => (
          <SwiperSlide key={item._id}>
            <Link to={link + '/' + item._id}>
              <div className='group cursor-pointer'>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className='w-full p-4 border border-gray-300 group-hover:border-emerald-600 duration-100 object-contain'
                  loading='lazy'
                />
                <div className='p-2 px-3 border-t-0 border border-gray-300 group-hover:bg-emerald-600 group-hover:border-emerald-600 duration-100'>
                  <h4 className='text-lg font-semibold line-clamp-2 group-hover:text-white duration-100'>
                    {item.title}
                  </h4>
                  <div className='flex my-0.5 gap-3 items-center relative'>
                    <button
                      className='w-full uppercase absolute bg-rose-500 text-white py-1 font-semibold mt-6
                  opacity-0 group-hover:opacity-100 duration-100'
                    >
                      Mua ngay
                    </button>
                    <div
                      className={`text-${
                        item.quantity > 0 ? 'emerald' : 'rose'
                      }-500 flex items-center gap-2 font-semibold uppercase group-hover:opacity-0
                      `}
                    >
                      <RiCheckboxBlankCircleFill />
                      {item.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                      <span className='text-xs text-gray-600'>{`Còn ${item.quantity} sản phẩm`}</span>
                    </div>
                  </div>
                  <span className='text-xl text-rose-500 font-bold group-hover:opacity-0 duration-100'>
                    {item.price.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {link && (
        <button
          className='py-2 px-10 block my-8 mx-auto w-max bg-emerald-500 font-semibold text-xl text-white'
          onClick={() => navigate(link)}
        >
          Xem thêm
        </button>
      )}
    </>
  );
}

export default ProductsSlider;
