import { useFormik } from 'formik';
import { useEffect } from 'preact/hooks';
import * as Yup from 'yup';
import { useStore } from '../stores/user';
import toast from 'react-hot-toast';
import axios from 'axios';

const formFields = [
  {
    name: 'email',
    field: 'Email',
    type: 'text',
    placeholder: 'VD: example@gmail.com',
  },
  {
    name: 'name',
    field: 'Họ tên',
    type: 'text',
    placeholder: 'VD: Nguyễn Văn A',
  },
  {
    name: 'phoneNumber',
    field: 'Số điện thoại',
    type: 'text',
    placeholder: 'VD: 0123456789',
  },
  {
    name: 'address',
    field: 'Địa chỉ',
    type: 'text',
    placeholder: 'VD: 175 Tấy Sơn, Đống Đa, Hà Nội',
  },
];

function Profile() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phoneNumber: '',
      address: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(255, 'Độ dài không quá 255 ký tự')
        .required('Tên người dùng không thể bỏ trống!'),
      phoneNumber: Yup.string()
        .length(10, 'SĐT không hợp lệ')
        .required('SĐT không thể bỏ trống!'),
      address: Yup.string()
        .max(1000, 'Độ dài không quá 1000 ký tự')
        .required('Địa chỉ không thể bỏ trống!'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('users/update-profile', values);
        if (data.status !== 200) {
          toast.error(data.message);
          return;
        }
        localStorage.setItem('user', JSON.stringify(values));
        setUser(values);
        toast.success('Thay đổi thành công');
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
      <h2 className='text-xl font-semibold'>Hồ Sơ Của Tôi</h2>
      <p className='my-0.5'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
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
                  type={type}
                  className={`px-4 py-2 w-full outline-none ${
                    name === 'email' ? '' : 'border-emerald-300'
                  } border ${
                    formik.touched[name] &&
                    formik.errors[name] &&
                    'border-rose-500'
                  }`}
                  placeholder={placeholder}
                  onInput={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
                  id={name}
                  disabled={name === 'email'}
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
          Lưu
        </button>
      </form>
    </div>
  );
}

export default Profile;
