import { useState, useEffect } from 'preact/hooks';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import CategoryTable from '../../components/Admin/CategoryTable';
import UserTable from '../../components/Admin/UserTable';
import OrderTable from '../../components/Admin/OrderTable';

const sidebarItems = [
  // { label: 'Doanh thu', path: 'incomes' },
  { label: 'Đơn hàng', path: 'orders' },
  { label: 'Người dùng', path: 'users' },
  { label: 'Laptop', path: 'laptops' },
  { label: 'Case', path: 'cases' },
  { label: 'Mainboard', path: 'mainboards' },
  { label: 'Máy tính bàn', path: 'computers' },
  { label: 'CPU', path: 'cpus' },
  { label: 'GPU', path: 'gpus' },
  { label: 'RAM', path: 'rams' },
  { label: 'Ổ cứng', path: 'drives' },
  { label: 'Nguồn máy tính', path: 'psus' },
  { label: 'Tản nhiệt', path: 'coolers' },
  { label: 'Màn hình', path: 'screens' },
  { label: 'Tai nghe', path: 'headphones' },
  { label: 'Chuột', path: 'mice' },
  { label: 'Bàn phím', path: 'keyboards' },
];

function Admin() {
  const [currentTab, setCurrentTab] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { pathname } = useLocation();

  useEffect(() => {
    const tab = searchParams.get('tab');
    setCurrentTab(tab);
  }, []);

  const handleNavigate = (path) => {
    setCurrentTab(path);
    navigate(`${pathname}?tab=${path}`);
  };

  return (
    <div className='grid grid-cols-10 gap-5'>
      <ul className='py-3 bg-emerald-600 col-span-2 font-medium text-white'>
        {sidebarItems.map((item) => (
          <li
            className={`px-3 py-2 cursor-pointer hover:bg-white hover:text-black duration-100 ${
              item.path === currentTab ? 'bg-white text-black' : ''
            }`}
            key={item.path}
            onClick={() => handleNavigate(item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div className='col-span-8'>
        {currentTab === 'users' ? (
          <UserTable />
        ) : currentTab === 'orders' ? (
          <OrderTable />
        ) : (
          <CategoryTable category={currentTab} />
        )}
      </div>
    </div>
  );
}

export default Admin;
