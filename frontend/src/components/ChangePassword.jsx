import { useFormik } from 'formik';
import { useEffect } from 'preact/hooks';
import { useStore } from '../stores/user';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

const formFields = [
  {
    name: 'password',
    field: 'Mật khẩu',
  },
  {
    name: 'newPassword',
    field: 'Mật khẩu mới',
  },
  {
    name: 'confirmPassword',
    field: 'Xác nhận mật khẩu',
  },
];

function ChangePassword({ setCurrentTab }) {
  const user = useStore((state) => state.user);

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'Độ dài không đủ 8 ký tự')
        .max(32, 'Độ dài không quá 32 ký tự')
        .required('Mật khẩu không thể bỏ trống!'),
      newPassword: Yup.string()
        .min(8, 'Độ dài không đủ 8 ký tự')
        .max(32, 'Độ dài không quá 32 ký tự')
        .required('Mật khẩu không thể bỏ trống!'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp!')
        .required('Xác nhận mật khẩu không thể bỏ trống!'),
    }),
    onSubmit: async (values) => {
      try {
        const { password, newPassword } = values;
        if (password === newPassword) {
          toast.error('Mật khẩu mới không thể giống mật khẩu hiện tại');
          return;
        }
        const { data } = await axios.post('users/update-password', {
          ...values,
          email: user.email,
        });
        if (data.status !== 200) {
          toast.error(data.message);
          return;
        }
        toast.success('Đổi mật khẩu thành công');
        setCurrentTab('profile');
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    if (!user) return;
    formik.setValues(user);
  }, [user]);

  return (
    <div className='max-w-2xl shadow mx-auto bg-white px-6 py-4'>
      <h2 className='text-xl font-semibold'>Đổi mật khẩu</h2>
      <p className='my-0.5'>
        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
      </p>
      <hr className='my-6' />
      <form className='grid gap-3' onSubmit={formik.handleSubmit}>
        {formFields.map(({ field, placeholder, type, name }) => (
          <div key={name}>
            <div className='grid grid-cols-10 items-center gap-5'>
              <label htmlFor={name} className='col-span-3 text-right'>
                {field}
              </label>
              <div className='col-span-7'>
                <input
                  type='password'
                  className={`px-4 py-2 w-full outline-none ${
                    name === 'email' ? '' : 'border-emerald-300'
                  } border ${
                    formik.touched[name] &&
                    formik.errors[name] &&
                    'border-rose-500'
                  }`}
                  placeholder='*********'
                  onInput={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
                  id={name}
                />
              </div>
            </div>
            <div className='grid grid-cols-10 items-center gap-5'>
              <span className='col-span-3'></span>
              <span className='col-span-7 block text-sm text-rose-500 mt-0.5'>
                {formik.touched[name] && formik.errors[name]}
              </span>
            </div>
          </div>
        ))}
        <button
          className='ml-auto px-4 py-2 text-white bg-emerald-500'
          type='submit'
        >
          Thay đổi
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
