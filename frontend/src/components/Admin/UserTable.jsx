import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import toast from 'react-hot-toast';
import { HiOutlineLockClosed, HiOutlineLockOpen } from 'react-icons/hi';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const [searchParams] = useSearchParams();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const currentPage = searchParams.get('page') || 1;
  const token = localStorage.getItem('access-token');

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`users`);
      setUsers(data.items);
      setTotalPages(data.totalPages);
    })();
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'unset';
    }
  }, [selectedUser]);

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
      `users?page=${parseInt(currentPage) + (state === 'prev' ? -1 : 1)}`
    );
    setUsers(data.items);
  };

  const handleUnlockUser = (item) => {
    setDisplayModal(true);
    setSelectedUser(item);
  };

  const handleLockUser = (item) => {
    setDisplayModal(true);
    setSelectedUser(item);
  };

  return (
    <>
      <table className='w-full mt-8 max-w-5xl border'>
        <tr className='bg-emerald-100'>
          <th className='py-2'>Tên</th>
          <th className='py-2'>SĐT</th>
          <th className='py-2'>Email</th>
          <th className='py-2 w-max'>Địa chỉ</th>
          <th className='py-2'>Trạng thái</th>
          <th className='py-2'>Tùy chọn</th>
        </tr>
        {users?.map((user) => (
          <tr key={user._id}>
            <td className='px-3 py-1 text-center'>{user?.name}</td>
            <td className='font-medium text-center'>{user?.phoneNumber}</td>
            <td className='text-center'>{user?.email}</td>
            <td className='text-center'>{user?.address}</td>
            <td className='text-center'>
              {user?.status === 0 ? 'Khoá' : 'Mở khoá'}
            </td>
            <td className='px-3 py-1'>
              <div className='flex justify-center items-center gap-5'>
                {user?.status === 0 ? (
                  <button
                    className='text-blue-600 flex items-center gap-2'
                    onClick={() => handleUnlockUser(user)}
                  >
                    <HiOutlineLockOpen /> Mở khoá
                  </button>
                ) : (
                  <button
                    className='text-rose-600 flex items-center gap-2'
                    onClick={() => handleLockUser(user)}
                  >
                    <HiOutlineLockClosed /> Khoá
                  </button>
                )}
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
            Bạn có chắc muốn {selectedUser?.status === 2 ? 'khoá' : 'mở khoá'}{' '}
            người dùng này này?
          </h3>
          <div className='flex items-center flex-col justify-center mt-4 mb-8'>
            <h5 className='font-semibold'>{selectedUser?.name}</h5>
            <h5 className='font-semibold'>{selectedUser?.email}</h5>
            <h5 className='font-semibold'>{selectedUser?.phoneNumber}</h5>
            <h5 className='font-semibold'>{selectedUser?.address}</h5>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <button
              className='font-medium text-rose-600 border border-rose-500 px-4 py-2'
              onClick={() => {
                setDisplayModal(false);
                setSelectedUser(undefined);
              }}
            >
              Hủy
            </button>
            <button
              className='px-4 py-2 text-white bg-emerald-500 font-medium'
              onClick={async () => {
                const { data } = await axios.post(
                  `users/update-status`,
                  {
                    email: selectedUser.email,
                    status: selectedUser?.status === 0 ? 2 : 0,
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                if (data.status !== 200) {
                  toast.error(data.message);
                  return;
                }
                setDisplayModal(false);
                setSelectedUser(undefined);
                toast.success(
                  `${
                    selectedUser?.status === 2 ? 'Khoá' : 'Mở khoá'
                  } thành công`
                );
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

export default UserTable;
