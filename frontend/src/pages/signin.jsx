import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/user';

const formFields = [
  { name: 'email', field: 'Email', type: 'text' },
  { name: 'password', field: 'Mật khẩu', type: 'password' },
];

function SignIn() {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        if (
          email === import.meta.env.VITE_ADMIN_EMAIL &&
          password === import.meta.env.VITE_ADMIN_PASSWORD
        ) {
          const { data } = await axios.post('admin', { email, password });
          localStorage.setItem('access-token', data.token);
          localStorage.setItem('user', JSON.stringify('admin'));
          localStorage.setItem('cart', JSON.stringify([]));
          setUser('admin');
          toast.success('Đăng nhập thành công');
          navigate('/admin');
          return;
        }
        const { data } = await axios.post('users', values);
        if (data.status !== 200) {
          toast.error(data.message);
          return;
        }
        const userCopy = { ...data.user };
        delete userCopy.cart;
        localStorage.setItem('access-token', data.token);
        localStorage.setItem('user', JSON.stringify(userCopy));
        localStorage.setItem(
          'cart',
          JSON.stringify(data.user.cart.filter((i) => Object.keys(i).length))
        );
        setUser(data.user);
        toast.success('Đăng nhập thành công');
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className='flex items-center justify-center bg-emerald-500 p-10 min-h-[80vh]'>
      <form
        className='bg-white px-6 py-6 shadow-2xl rounded'
        onSubmit={formik.handleSubmit}
      >
        <h2 className='text-4xl font-semibold text-center mb-6'>Đăng nhập</h2>
        <div className='grid gap-4'>
          {formFields.map(({ name, field, type }) => (
            <div>
              <input
                placeholder={field}
                className={`px-2 py-2 border border-emerald-300 outline-none w-96 ${
                  formik.touched[name] &&
                  formik.errors[name] &&
                  'border-rose-500'
                }`}
                name={name}
                type={type}
                onInput={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
              />
              <span className='block text-sm text-rose-500 mt-0.5'>
                {formik.touched[name] && formik.errors[name]}
              </span>
            </div>
          ))}

          <button
            type='submit'
            className='w-full py-2 bg-emerald-500 text-white'
          >
            Đăng nhập
          </button>
          <div className='flex justify-between items-center'>
            <Link to='/signup'>
              <span className='text-emerald-500'> Đăng ký</span>
            </Link>
            <Link to='/reset-password'>
              <span className='text-emerald-500'> Quên mật khẩu?</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
