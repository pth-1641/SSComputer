import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import GoingOrder from './GoingOrder';
import PendingOrder from './PendingOrder';
import FinishedOrder from './FinishedOrder';

function OrderTable({ category }) {
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

  const [currentTab, setCurrentTab] = useState('pending');

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <div className='max-w-5xl mx-auto py-10'>
      <ul className='flex bg-gray-100 mb-5'>
        <li
          className={`cursor-pointer py-2 px-4 font-semibold text-lg hover:text-white hover:bg-emerald-500 duration-150 ${
            currentTab === 'pending' ? 'bg-emerald-500 text-white' : ''
          }`}
          onClick={() => setCurrentTab('pending')}
        >
          Chờ xác nhận
        </li>
        <li
          className={`cursor-pointer py-2 px-4 font-semibold text-lg hover:text-white hover:bg-emerald-500 duration-150 ${
            currentTab === 'on-going' ? 'bg-emerald-500 text-white' : ''
          }`}
          onClick={() => setCurrentTab('on-going')}
        >
          Đang giao
        </li>
        <li
          className={`cursor-pointer py-2 px-4 font-semibold text-lg hover:text-white hover:bg-emerald-500 duration-150 ${
            currentTab === 'finished' ? 'bg-emerald-500 text-white' : ''
          }`}
          onClick={() => setCurrentTab('finished')}
        >
          Hoàn thành
        </li>
      </ul>
      {currentTab === 'pending' && <PendingOrder />}
      {currentTab === 'on-going' && <GoingOrder />}
      {currentTab === 'finished' && <FinishedOrder />}
    </div>
  );
}

export default OrderTable;
