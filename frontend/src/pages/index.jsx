import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import HeaderTitle from '../components/HeaderTitle';
import ProductsSlider from '../components/ProductsSlider';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import introduceBg from '../assets/introduce.png';
import keyboardBanner from '../assets/bpc.png';
import mouseBanner from '../assets/chuot-gaming.png';
import laptopBanner from '../assets/laptop-dohoa.png';
import laptopGamingBanner from '../assets/laptop-gaming.png';
import screenBanner from '../assets/manhinh-gaming.png';
import PCBanner from '../assets/pc-dohoa.png';
import PCGamingBanner from '../assets/pc-gaming.png';
import PCGamingAccesory from '../assets/accessory-pc-gaming.png';
import keyboardAccesory from '../assets/accessory-keyboard.png';
import headphoneAccesory from '../assets/accessory-headphone.png';
import mouseAccesory from '../assets/accessory-mouse.png';
import screenAccesory from '../assets/accessory-screen.png';
import laptopGamingAccesory from '../assets/accessory-laptop-gaming.png';
import laptopAccesory from '../assets/accessory-laptop.png';
import PCAccesory from '../assets/accessory-pc.png';
import feedback1 from '../assets/feedback-1.jpg';
import feedback2 from '../assets/feedback-2.jpg';
import feedback3 from '../assets/feedback-3.jpg';
import feedback4 from '../assets/feedback-4.jpg';
import feedback5 from '../assets/feedback-5.jpg';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.jpg';
import brandAcer from '../assets/brand-acer.png';
import brandAOC from '../assets/brand-aoc.png';
import brandAMD from '../assets/brand-amd.jpg';
import brandApple from '../assets/brand-apple.jpg';
import brandAsus from '../assets/brand-asus.png';
import brandCorsair from '../assets/brand-corsair.png';
import brandDell from '../assets/brand-dell.png';
import brandGigabyte from '../assets/brand-gigabyte.png';
import brandFuhlen from '../assets/brand-fuhlen.jpg';
import brandHP from '../assets/brand-hp.png';
import brandIntel from '../assets/brand-intel.jpg';
import brandLenovo from '../assets/brand-lenovo.png';
import brandLG from '../assets/brand-lg.png';
import brandLogitech from '../assets/brand-logitech.png';
import brandMSI from '../assets/brand-msi.png';
import brandSamsung from '../assets/brand-samsung.png';
import brandViewSonic from '../assets/brand-viewsonic.png';
import { Link } from 'react-router-dom';

const accessoryBanners = [
  mouseBanner,
  laptopBanner,
  laptopGamingBanner,
  keyboardBanner,
  screenBanner,
  PCBanner,
  PCGamingBanner,
];

const accessories = [
  {
    thumbnail: PCGamingAccesory,
    title: 'PC Gaming',
    subTitle: 'Chiến mọi game',
    color: '#3b82f6',
    link: '/computer',
  },
  {
    thumbnail: keyboardAccesory,
    title: 'Bàn phím cơ',
    subTitle: 'Gõ lướt như bay',
    color: '#10b981',
    link: '/keyboard',
  },
  {
    thumbnail: headphoneAccesory,
    title: 'Tai nghe Gaming',
    subTitle: 'Âm thanh sống động',
    color: '#f43f5e',
    link: '/headphone',
  },
  {
    thumbnail: mouseAccesory,
    title: 'Chuột Gaming',
    subTitle: 'Chuyên nghiệp từng cú click',
    color: '#a855f7',
    link: '/mouse',
  },
  {
    thumbnail: screenAccesory,
    title: 'Màn hình Gaming',
    subTitle: 'Tận hưởng thế giới game',
    color: '#84cc16',
    link: '/screen',
  },
  {
    thumbnail: laptopGamingAccesory,
    title: 'Laptop Gaming',
    subTitle: 'Làm chủ cuộc chơi mọi nơi',
    color: '#334155',
    link: '/laptop',
  },
  {
    thumbnail: PCAccesory,
    title: 'PC đồ hoạ',
    subTitle: 'Tối ưu công việc',
    color: '#14b8a6',
    link: '/case',
  },
  {
    thumbnail: laptopAccesory,
    title: 'Laptop văn phòng',
    subTitle: 'Mỏng nhẹ, bền bỉ',
    color: '#f97316',
    link: '/laptop',
  },
];

const banners = [banner1, banner2, banner3, banner4];

const feedbacks = [feedback1, feedback2, feedback3, feedback4, feedback5];

const brands = [
  brandAOC,
  brandDell,
  brandViewSonic,
  brandIntel,
  brandCorsair,
  brandGigabyte,
  brandSamsung,
  brandAsus,
  brandAcer,
  brandApple,
  brandFuhlen,
  brandLenovo,
  brandAMD,
  brandHP,
  brandLogitech,
  brandMSI,
  brandLG,
];

function Home() {
  const [computers, setComputers] = useState([]);
  const [mice, setMice] = useState([]);

  useEffect(() => {
    (async () => {
      const computersRes = await axios.get('computers');
      const miceRes = await axios.get('mice');
      setComputers(computersRes.data);
      setMice(miceRes.data);
    })();
  }, []);

  return (
    <main className='max-w-7xl mx-auto mt-6'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className='mb-8'
        autoplay={{
          disableOnInteraction: false,
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner}>
            <img src={banner} alt='' className='w-full' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          disableOnInteraction: false,
        }}
      >
        {accessoryBanners.map((banner) => (
          <SwiperSlide key={banner}>
            <img src={banner} alt='' className='w-full' />
          </SwiperSlide>
        ))}
      </Swiper>
      <HeaderTitle title='Danh mục sản phẩm' />
      <div className='grid grid-cols-4 grid-rows-2 gap-8'>
        {accessories.map(({ thumbnail, title, subTitle, color, link }) => (
          <Link key={thumbnail} to={link}>
            <div className='bg-gray-200 relative overflow-hidden group pl-3'>
              <span
                className='absolute w-3/5 -right-24 h-full -skew-x-12 group-hover:-right-10 duration-500'
                style={{ backgroundColor: color }}
              ></span>
              <div className='flex gap-4 items-center justify-center relative z-10'>
                <h6 className='uppercase font-bold text-xl'>
                  {title}
                  <span className='block text-xs font-normal'>{subTitle}</span>
                </h6>
                <img
                  src={thumbnail}
                  alt=''
                  className='h-36 aspect-square object-cover object-left'
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ProductsSlider
        title='Sản phẩm nổi bật'
        items={computers?.items}
        link='/computer'
      />
      <ProductsSlider title='Chuột gaming' items={mice?.items} link='/mouse' />
      <HeaderTitle title='Giới thiệu về TNC Studio' />
      <div className='bg-slate-900 text-white pl-6 flex items-center'>
        <div>
          <h3 className='font-bold text-2xl mb-2'>
            TNC Studio - Địa chỉ sắm PC/Laptop uy tín hàng đầu Việt Nam!
          </h3>
          <p className='leading-7'>
            TNC Studio tự hào với tôn chỉ luôn lấy khách hàng làm trọng tâm bằng
            việc cung cấp các dịch vụ hậu mãi chu đáo, tận tâm để mang đến cho
            khách hàng những sản phẩm có chất lượng và trải nghiệm với PC/Laptop
            tốt nhất! Chúng tôi đảm bảo bạn sẽ có được những trải nghiệm tuyệt
            vời nhất khi, sử dụng các dịch vụ và sản phẩm của SS Studio.
          </p>
        </div>
        <img src={introduceBg} alt='' />
      </div>
      <HeaderTitle title='Các thương hiệu' />
      <marquee direction='left' scrollamount={20} loop={-1}>
        <div className='flex items-center gap-14'>
          {brands.map((brand) => (
            <img
              key={brand}
              src={brand}
              alt=''
              className='h-40'
              draggable={false}
            />
          ))}
        </div>
      </marquee>
      <HeaderTitle title='Đánh giá từ khách hàng' />
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          disableOnInteraction: false,
        }}
      >
        {feedbacks.map((feedback) => (
          <SwiperSlide key={feedback}>
            <img src={feedback} alt='' className='w-full' />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='pb-20'></div>
    </main>
  );
}

export default Home;
