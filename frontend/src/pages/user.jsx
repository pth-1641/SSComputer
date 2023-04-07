import { useState } from 'preact/hooks';
import { BsFillSunFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import ChangePassword from '../components/ChangePassword';
import Profile from '../components/Profile';
import { useStore } from '../stores/user';

function User() {
  const user = useStore((state) => state.user);
  const [currentTab, setCurrentTab] = useState('profile');

  return (
    <div className='bg-emerald-50 py-10'>
      <div className='max-w-5xl mx-auto px-6 py-4 grid grid-cols-10'>
        <div className='col-span-2'>
          <div className='flex items-center gap-3'>
            <span className='border border-emerald-500 text-emerald-500 rounded-full aspect-square p-2 text-lg relative'>
              <FaUser />
            </span>
            <p className='font-medium text-lg'>{user?.name}</p>
          </div>
          <ul className='grid gap-2 mt-3 ml-6'>
            <li
              className={`flex items-center gap-2 cursor-pointer ${
                currentTab === 'profile' ? 'text-emerald-500' : ''
              }`}
              onClick={() => setCurrentTab('profile')}
            >
              <span className='text-xl col-span-1'>
                <CgProfile />
              </span>
              Hồ sơ
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer ${
                currentTab === 'change-pwd' ? 'text-emerald-500' : ''
              }`}
              onClick={() => setCurrentTab('change-pwd')}
            >
              <span className='text-xl'>
                <RiLockPasswordLine />
              </span>
              Đổi mật khẩu
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer ${
                currentTab === 'theme' ? 'text-emerald-500' : ''
              }`}
              onClick={() => setCurrentTab('theme')}
            >
              <span className='text-xl'>
                <BsFillSunFill />
              </span>
              Giao diện
            </li>
          </ul>
        </div>
        <div className='col-span-8'>
          {currentTab === 'profile' && <Profile />}
          {currentTab === 'change-pwd' && (
            <ChangePassword setCurrentTab={setCurrentTab} />
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
