import { useFormik } from 'formik';
import { BsFillStarFill } from 'react-icons/bs';

function ProductReviews() {
  const formik = useFormik({
    initialValues: {
      ratingStar: 0,
      content: '',
    },

    onSubmit: async (values) => {
      try {
        console.log(values);
        // const { data } = await axios.post('users', values);
        // if (data.status !== 200) {
        //   toast.error(data.message);
        //   return;
        // }
        // toast.success('Vui lòng kiểm tra email');
        // navigate('/signin');
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className='my-10'>
      <div className='grid grid-cols-5 gap-28'>
        <div className='col-span-2'>
          <h4 className='font-semibold text-lg'>Đánh giá và nhận xét</h4>
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
                    <span className='bg-emerald-500 left-0 inset-y-0 w-1/2 absolute'></span>
                  </div>
                  <span className='col-span-1'>0</span>
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
          ></textarea>
          <button
            type='submit'
            className='bg-emerald-500 text-white py-3 px-10 font-bold mt-3'
          >
            Gửi Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductReviews;
