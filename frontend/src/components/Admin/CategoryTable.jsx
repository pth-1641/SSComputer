import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import toast from 'react-hot-toast';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function CategoryTable({ category }) {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const [searchParams] = useSearchParams();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const currentPage = searchParams.get('page') || 1;
  const token = localStorage.getItem('access-token');

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${category}?page=${currentPage}`);
      setItems(data.items);
      setTotalPages(data.totalPages);
    })();
  }, [category]);

  useEffect(() => {
    if (selectedItem) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'unset';
    }
  }, [selectedItem]);

  const handleChangePage = async (state) => {
    if (currentPage <= 1 && state === 'prev') return;
    if (currentPage >= totalPages && state === 'next') return;
    const hasPaging = search.includes('page');
    const newUrl = hasPaging
      ? pathname +
        search.replace(
          /page=\d+/g,
          `page=${parseInt(currentPage) + (state === 'prev' ? -1 : 1)}`
        )
      : window.location.href + '&page=2';
    const regex = new RegExp(window.location.origin, 'g');
    navigate(newUrl.replace(regex, ''));
    const { data } = await axios.get(
      `${category}?page=${parseInt(currentPage) + (state === 'prev' ? -1 : 1)}`
    );
    setItems(data.items);
  };

  const handleEditItem = (id) => {
    navigate(`/admin/edit?category=${category}&id=${id}`);
  };

  const handleDeleteItem = (item) => {
    setDisplayModal(true);
    setSelectedItem(item);
  };

  return (
    <>
      <table className='w-full mt-8 max-w-5xl border'>
        <tr className='bg-emerald-100'>
          <th className='py-2'>Ảnh</th>
          <th className='py-2'>Tên sản phẩm</th>
          <th className='py-2'>Giá</th>
          <th className='py-2 w-max'>Số lượng</th>
          <th className='py-2'>Tùy chọn</th>
        </tr>
        {items?.map((item) => (
          <tr key={item._id}>
            <td className='px-3 py-1'>
              <img
                src={item.thumbnail || item.details.gallery[0]}
                alt=''
                className='aspect-square h-16 object-contain'
              />
            </td>
            <td>{item.title}</td>
            <td className='font-medium text-emerald-500 text-center'>
              {item.price.toLocaleString('vi-VN')}đ
            </td>
            <td className='text-center'>{item.quantity}</td>
            <td className='px-3 py-1'>
              <div className='flex justify-center items-center gap-5'>
                <button
                  className='text-blue-600 flex items-center gap-2'
                  onClick={() => handleEditItem(item._id)}
                >
                  <AiFillEdit /> Sửa
                </button>
                <button
                  className='text-rose-600 flex items-center gap-2'
                  onClick={() => handleDeleteItem(item)}
                >
                  <AiFillDelete /> Xóa
                </button>
              </div>
            </td>
          </tr>
        ))}
      </table>
      <div className='w-full max-w-5xl flex items-center justify-end mt-1 mb-5'>
        <button className='text-2xl' onClick={() => handleChangePage('prev')}>
          <GrFormPrevious />
        </button>
        <span className='mx-4'>
          Trang: {currentPage} / {totalPages || 1}
        </span>
        <button className='text-2xl' onClick={() => handleChangePage('next')}>
          <GrFormNext />
        </button>
      </div>
      <button
        className='bg-emerald-500 text-white font-medium mx-auto block mb-10 px-4 py-2'
        onClick={() => navigate(`/admin/create?category=${category}`)}
      >
        Thêm sản phẩm
      </button>

      {/* Modal */}
      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center duration-200 ${
          displayModal
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='bg-white px-10 py-5 rounded w-full max-w-3xl'>
          <h3 className='text-2xl font-semibold text-center'>
            Bạn có chắc muốn xóa sản phẩm này?
          </h3>
          <div className='flex items-center justify-center gap-4 mt-4 mb-8'>
            <img
              src={selectedItem?.thumbnail || selectedItem?.details.gallery[0]}
              alt=''
              className='w-28'
            />
            <div>
              <h5 className='font-medium'>{selectedItem?.title}</h5>
              <span className='font-semibold text-sky-600'>
                {selectedItem?.price.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <button
              className='font-medium text-rose-600 border border-rose-500 px-4 py-2'
              onClick={() => {
                setDisplayModal(false);
                setSelectedItem(undefined);
              }}
            >
              Hủy
            </button>
            <button
              className='px-4 py-2 text-white bg-emerald-500 font-medium'
              onClick={async () => {
                const { data } = await axios.post(
                  `${category}/delete`,
                  { id: selectedItem._id },

                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                if (data.status !== 200) {
                  toast.error(data.message);
                  return;
                }
                setDisplayModal(false);
                setSelectedItem(undefined);
                setItems(items.filter((item) => item._id !== selectedItem._id));
                toast.success('Xóa thành công');
              }}
            >
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryTable;
