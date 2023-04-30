import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { BsFillStarFill } from 'react-icons/bs';
import { useStore } from '../stores/user';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';

function ProductReviews() {
  const user = useStore((state) => state.user);
  const location = useLocation();
  const token = localStorage.getItem('access-token');
  const [_, itemType, itemId] = location.pathname.split('/');

  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState({});

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const { data } = await axios.get(`comments?id=${itemId}`);
    const _1Star = data.items.filter((x) => x.rating === 1).length;
    const _2Star = data.items.filter((x) => x.rating === 2).length;
    const _3Star = data.items.filter((x) => x.rating === 3).length;
    const _4Star = data.items.filter((x) => x.rating === 4).length;
    const _5Star = data.items.filter((x) => x.rating === 5).length;
    setTotalComments({
      1: _1Star,
      2: _2Star,
      3: _3Star,
      4: _4Star,
      5: _5Star,
    });
    setComments(data);
  };

  const formik = useFormik({
    initialValues: {
      ratingStar: 0,
      content: '',
    },

    onSubmit: async (values) => {
      try {
        const { ratingStar, content } = values;
        if (!ratingStar || !content.trim()) {
          toast.error('Vui lòng điền đầy đủ thông tin');
        }
        const comment = {
          ...user,
          createdAt: new Date().toLocaleDateString(),
          updatedAt: new Date().toLocaleDateString(),
          type: user !== 'admin' ? 'user' : 'admin  ',
          message: content,
          repliedTo: '',
          rating: ratingStar,
          itemType,
          itemId,
        };

        const { data } = await axios.post('comments/create', comment, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.status !== 200) {
          toast.error(data.message);
          return;
        }
        toast.success('Bình luận thành công');
        formik.setValues({ ratingStar: 0, content: '' });
        await getComments();
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className='my-10'>
      <div className='grid grid-cols-5 gap-28'>
        <div className='col-span-2'>
          <h4 className='font-semibold text-lg'>
            Đánh giá và nhận xét ({comments.totalItems})
          </h4>
          <div className='flex flex-col-reverse gap-3 mt-4'>
            {[1, 2, 3, 4, 5].map((amount, idx) => {
              const stars = [];
              for (let i = 0; i < idx + 1; i++) {
                stars.push(<BsFillStarFill />);
              }
              return (
                <div className='grid grid-cols-10 items-center gap-10'>
                  <span
                    className='text-yellow-400 flex gap-0.5 justify-end items-center col-span-3'
                    key={amount}
                  >
                    {stars.map((x) => x)}
                  </span>
                  <div className='h-2 bg-gray-300 relative col-span-6'>
                    <span
                      className={`bg-emerald-500 left-0 inset-y-0 absolute`}
                      style={{
                        width:
                          (totalComments[amount] / comments.totalItems) * 100 +
                          '%',
                      }}
                    ></span>
                  </div>
                  <span className='col-span-1'>{totalComments[amount]}</span>
                </div>
              );
            })}
          </div>
        </div>
        <form className='col-span-3' onSubmit={formik.handleSubmit}>
          <div className='flex items-center gap-5'>
            <span className='text-lg font-semibold'>Đánh giá</span>
            <span className='flex flex-row-reverse items-center gap-3'>
              {[5, 4, 3, 2, 1].map((rating) => (
                <span
                  key={rating}
                  className={`text-gray-300 text-xl cursor-pointer duration-100 peer peer-hover:text-yellow-400 hover:text-yellow-400 ${
                    rating <= formik.values.ratingStar ? 'text-yellow-400' : ''
                  }`}
                  onClick={() => formik.setFieldValue('ratingStar', rating)}
                >
                  <BsFillStarFill />
                </span>
              ))}
            </span>
          </div>
          <h5 className='text-lg font-semibold my-2'>Nội dung (bắt buộc)</h5>
          <textarea
            cols='30'
            rows='10'
            className='bg-gray-100 w-full outline-none p-2 text-sm resize-none'
            onInput={formik.handleChange}
            id='content'
          />
          <button
            type='submit'
            className='bg-emerald-500 text-white py-3 px-10 font-bold mt-3'
          >
            Gửi Review
          </button>
        </form>
      </div>
      <hr className='my-8' />
      <div className='flex flex-col items-start gap-5'>
        {comments.items?.map((comment) => {
          const stars = [];
          for (let i = 0; i < comment.rating; i++) {
            stars.push(<BsFillStarFill />);
          }

          return (
            <div className='flex gap-4' key={comment._id}>
              <span className='text-4xl'>
                <FaUserCircle />
              </span>
              <div>
                <span className='text-yellow-400 flex gap-2'>{stars}</span>
                <h4 className='font-semibold text-lg'>{comment?.name}</h4>
                <p>{comment?.message}</p>
                <span className='font-semibold text-sm'>
                  {moment(comment?.createdAt).format('DD-MM-YYYY')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductReviews;
