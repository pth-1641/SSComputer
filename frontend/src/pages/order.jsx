import { useState } from 'preact/hooks';
import CanceledOrder from '../components/CanceledOrder';
import Cart from '../components/Cart';
import PendingOrder from '../components/PendingOrder';
import FinishedOrder from '../components/FinishedOrder';
import GoingOrder from '../components/OnGoing';

function Order() {
  const [currentTab, setCurrentTab] = useState('cart');

  return (
    <div className='max-w-5xl mx-auto py-10'>
      <ul className='flex bg-gray-100 mb-5'>
        <li
          className={`cursor-pointer py-2 px-4 font-semibold text-lg hover:text-white hover:bg-emerald-500 duration-150 ${
            currentTab === 'cart' ? 'bg-emerald-500 text-white' : ''
          }`}
          onClick={() => setCurrentTab('cart')}
        >
          Giỏ hàng
        </li>
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
        <li
          className={`cursor-pointer py-2 px-4 font-semibold text-lg hover:text-white hover:bg-emerald-500 duration-150 ${
            currentTab === 'canceled' ? 'bg-emerald-500 text-white' : ''
          }`}
          onClick={() => setCurrentTab('canceled')}
        >
          Đã huỷ
        </li>
      </ul>
      {currentTab === 'cart' && <Cart />}
      {currentTab === 'pending' && <PendingOrder />}
      {currentTab === 'on-going' && <GoingOrder />}
      {currentTab === 'finished' && <FinishedOrder />}
      {currentTab === 'canceled' && <CanceledOrder />}
    </div>
  );
}

export default Order;
