import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'preact/hooks';

function FinishedOrder() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('access-token');
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('order/admin/finished', options);
      setOrders(data.orders);
    })();
  }, []);

  return (
    <div>
      {orders?.length > 0 ? (
        orders.map(({ items, createdAt }) => (
          <div className='border border-gray-100 pb-3 mb-8'>
            <h3 className='font-medium text-lg text-emerald-600 px-4 pt-2'>
              Ngày đặt hàng:{' '}
              {moment.unix(createdAt / 1000).format('DD/MM/YYYY HH:mm')}
            </h3>
            <hr className='my-2 border-gray-100' />
            <hr className='my-2 border-gray-100' />
            {items.map((item) => (
              <div className='w-full p-2 flex items-center gap-5 mb-2 px-4'>
                <img src={item.thumbnail} alt='' className='h-16' />
                <div className='flex-1'>
                  <h5 className='text-emerald-700 font-medium hover:underline'>
                    {item.title}
                  </h5>
                  <span className='text-rose-500 font-semibold'>
                    {item.price?.toLocaleString('vi-VN')} đ
                  </span>
                  <span className='block text-sm leading-3'>
                    Số lượng: {item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className='text-emerald-600'>
          Không có sản phẩm nào trong danh sách.
        </p>
      )}
    </div>
  );
}

export default FinishedOrder;
