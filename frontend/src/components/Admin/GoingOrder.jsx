import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import toast from 'react-hot-toast';

function GoingOrder() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('access-token');
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('order/admin/going', options);
      setOrders(data.orders);
    })();
  }, []);

  const handleFinishOrder = async (id) => {
    const { data } = await axios.post(
      'order/update-status',
      { id, status: 3 },
      options
    );
    if (data.status !== 200) {
      toast.error(data.message);
      return;
    }
    toast.success('Cập nhật thành công');
    const items = orders.filter((item) => item._id !== id);
    setOrders(items);
  };

  return (
    <div>
      {orders?.length > 0 ? (
        orders.map(({ items, createdAt, _id, email, customer }) => (
          <div className='border border-gray-100 pb-3 mb-8'>
            <h3 className='font-medium text-lg text-emerald-600 px-4 pt-2'>
              Ngày đặt hàng:{' '}
              {moment.unix(createdAt / 1000).format('DD/MM/YYYY HH:mm')}
            </h3>
            <hr className='my-2 border-gray-100' />
            <div className='px-4 flex items-center gap-4'>
              <p>Tên: {customer?.name}</p>
              <p>SĐT: {customer?.phoneNumber}</p>
              <p>Email: {email}</p>
              <p>Địa chỉ: {customer?.address}</p>
            </div>
            <hr className='my-2 border-gray-100' />
            {items.map((item) => (
              <div className='w-full p-2 flex items-center gap-5 mb-2 px-4'>
                <img src={item.thumbnail} alt='' className='h-16' />
                <div className='flex-1'>
                  <Link to={`/${item.type}/${item.itemId}`}>
                    <h5 className='text-emerald-700 font-medium hover:underline'>
                      {item.title}
                    </h5>
                  </Link>
                  <span className='text-rose-500 font-semibold'>
                    {item.price?.toLocaleString('vi-VN')} đ
                  </span>
                  <span className='block text-sm leading-3'>
                    Số lượng: {item.quantity}
                  </span>
                </div>
              </div>
            ))}
            <button
              className='px-4 py-2 text-white bg-emerald-500 font-medium ml-auto block mr-3'
              onClick={() => handleFinishOrder(_id)}
            >
              Hoàn thành
            </button>
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

export default GoingOrder;
