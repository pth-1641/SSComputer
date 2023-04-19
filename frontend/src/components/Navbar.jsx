import { useEffect, useState } from 'preact/hooks';
import toast from 'react-hot-toast';
import { BsCart2, BsGpuCard, BsSearch } from 'react-icons/bs';
import {
  CiDesktopMouse1,
  CiHardDrive,
  CiHeadphones,
  CiKeyboard,
  CiLaptop,
} from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import { MdBorderAll } from 'react-icons/md';
import { SlScreenDesktop } from 'react-icons/sl';
import { VscServerEnvironment } from 'react-icons/vsc';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/user';
import CartModal from './CartModal';

const routes = [
  { label: 'Laptop', icon: <CiLaptop />, link: '/laptop' },
  { label: 'Máy tính bàn', icon: <VscServerEnvironment />, link: '/computer' },
  { label: 'GPU', icon: <BsGpuCard />, link: '/gpu' },
  { label: 'Màn hình', icon: <SlScreenDesktop />, link: '/screen' },
  { label: 'Ổ cứng', icon: <CiHardDrive />, link: '/drive' },
  { label: 'Tai nghe', icon: <CiHeadphones />, link: 'headphone' },
  { label: 'Chuột', icon: <CiDesktopMouse1 />, link: '/mouse' },
  { label: 'Bàn phím', icon: <CiKeyboard />, link: 'keyboard' },
  { label: 'Tất cả', icon: <MdBorderAll />, link: '/browse' },
];

function Navbar() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const totalItems = useStore((state) => state.totalItems);
  const setTotalItems = useStore((state) => state.setTotalItems);
  const removeUser = useStore((state) => state.removeUser);
  const navigate = useNavigate();

  const [openSettings, setOpenSettings] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSignOut = () => {
    removeUser();
    localStorage.clear();
    toast.success('Đăng xuất thành công');
    navigate('/');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    setUser(user);
    setTotalItems(cart?.reduce((total, item) => (total += item.quantity), 0));
  }, [user?.name]);

  const handleSearchItem = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    navigate(`/search?q=${searchValue}`);
  };

  const notLogin = () => (
    <div className='flex items-center gap-3'>
      <Link to='signup'>
        <button className='border border-emerald-500 px-3 py-1 text-emerald-500'>
          Đăng ký
        </button>
      </Link>
      <Link to='signin'>
        <button className='bg-emerald-500 px-3 py-1 text-white'>
          Đăng nhập
        </button>
      </Link>
    </div>
  );

  const logged = () => (
    <div className='flex items-center gap-3'>
      {user !== 'admin' && (
        <button
          className='flex items-center gap-2 bg-emerald-500 px-3 py-2 text-xl text-white'
          onClick={() => setIsOpenModal(true)}
        >
          <BsCart2 />
          <span className='bg-yellow-400 text-black px-2 text-base'>
            {totalItems}
          </span>
        </button>
      )}
      <button
        className='border border-emerald-500 text-emerald-500 rounded-full aspect-square p-2 text-lg relative'
        onClick={() => setOpenSettings(!openSettings)}
      >
        <FaUser />
        {openSettings && (
          <span className='fixed inset-0 cursor-default z-10'></span>
        )}
        <ul
          className={`absolute bg-white z-20 right-0 text-left text-base top-11 -shadow-2xl duration-100 ${
            openSettings
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <Link to='/user'>
            <li className='min-w-max px-3 py-1 hover:bg-emerald-500 hover:text-white duration-100'>
              Cài đặt
            </li>
          </Link>
          <Link to='/order'>
            <li className='min-w-max px-3 py-1 hover:bg-emerald-500 hover:text-white duration-100'>
              Đơn mua
            </li>
          </Link>
          <li
            className='min-w-max px-3 py-1 hover:bg-emerald-500 hover:text-white duration-100'
            onClick={handleSignOut}
          >
            Đăng xuất
          </li>
        </ul>
      </button>
    </div>
  );

  return (
    <>
      <header>
        <div className='py-2 border border-b'>
          <div className='flex justify-between max-w-6xl mx-auto'>
            <Link to='/'>
              <h1 className='font-bold text-2xl bg-emerald-500 text-white px-3 py-1 -skew-x-12 select-none flex items-center'>
                TNC Computer
              </h1>
            </Link>
            <form
              className='flex items-stretch h-9'
              onSubmit={handleSearchItem}
            >
              <input
                type='text'
                className='border border-emerald-500 outline-none px-3 py-1 w-80'
                placeholder='Nhập tên sản phẩm...'
                value={searchValue}
                onInput={(e) => setSearchValue(e.target.value)}
              />
              <button
                className='bg-emerald-500 text-white h-full px-3'
                type='submit'
              >
                <BsSearch />
              </button>
            </form>
            {user ? logged() : notLogin()}
          </div>
        </div>
        <nav className='bg-slate-200 uppercase'>
          <ul className='flex justify-center'>
            {routes.map(({ label, icon, link }) => (
              <NavLink
                key={link}
                to={link}
                className={({ isActive }) =>
                  isActive ? 'bg-emerald-500 text-white' : ''
                }
              >
                <li className='flex gap-1 items-center font-medium px-3 hover:bg-emerald-500 py-2 hover:text-white duration-100'>
                  <span className='text-lg'>{icon}</span>
                  {label}
                </li>
              </NavLink>
            ))}
          </ul>
        </nav>
      </header>
      <CartModal setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />
    </>
  );
}

export default Navbar;
