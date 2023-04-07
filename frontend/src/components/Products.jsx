import { useState } from 'preact/hooks';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Products({ title, items, totalItems, totalPages }) {
  const { search, pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = searchParams.get('page') || 1;

  const handleLoadMoreItems = (state) => {
    if (currentPage <= 1 && state === 'prev') return;
    if (currentPage >= totalPages && state === 'next') return;

    const hasPaging = search.includes('page');
    const newUrl = hasPaging
      ? pathname +
        search.replace(
          /page=\d+/g,
          `page=${parseInt(currentPage) + (state === 'prev' ? -1 : 1)}`
        )
      : window.location.href + '?page=2';
    const regex = new RegExp(window.location.origin, 'g');
    navigate(newUrl.replace(regex, ''));
  };

  return (
    <>
      <h1 className='text-5xl text-center my-6 font-semibold'>
        {title}
        <span className='block text-base font-normal my-2'>{`(${
          totalItems || 0
        } sản phẩm)`}</span>
      </h1>
      <div className={`grid max-w-6xl mx-auto gap-5`}>
        <div className={`col-span-4 grid grid-cols-4 gap-x-3 gap-y-8`}>
          {items?.map((item) => (
            <Link
              key={item._id}
              to={
                item.type
                  ? '/' + item.type + '/' + item._id
                  : pathname + '/' + item._id
              }
              onClick={() => console.log(item)}
            >
              <div className='group cursor-pointer h-full'>
                <img
                  src={item.thumbnail || item.details.gallery[0]}
                  alt={item.title}
                  className='w-full p-4 aspect-square border border-gray-300 group-hover:border-emerald-600 duration-100 object-contain'
                />
                <div className='p-2 px-3 border border-gray-300 border-t-0 group-hover:bg-emerald-600 group-hover:border-emerald-600 duration-100 h-[31%]'>
                  <h4 className='text-lg font-semibold line-clamp-2 group-hover:text-white duration-100'>
                    {item.title}
                  </h4>
                  <div className='flex my-0.5 gap-3 items-center relative'>
                    <button
                      className='w-full uppercase absolute bg-rose-500 text-white py-1 font-semibold mt-6
                  opacity-0 group-hover:opacity-100 duration-100'
                    >
                      Chi tiết
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
          ))}
        </div>
      </div>
      {totalPages ? (
        <div className='flex items-center justify-between max-w-3xl mx-auto mt-6'>
          <button
            className='py-2 px-10 block my-8 mx-auto w-max bg-emerald-500 font-semibold text-white'
            onClick={() => handleLoadMoreItems('prev')}
          >
            Trang trước
          </button>
          <span className='text-lg'>
            Trang {currentPage} / {totalPages || 1}
          </span>
          <button
            className='py-2 px-10 block my-8 mx-auto w-max bg-emerald-500 font-semibold text-white'
            onClick={() => handleLoadMoreItems('next')}
          >
            Trang tiếp
          </button>
        </div>
      ) : (
        <div className='pb-20'></div>
      )}
    </>
  );
}

export default Products;
