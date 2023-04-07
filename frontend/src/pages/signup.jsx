import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect } from 'preact/hooks';
import toast, { useToasterStore } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const formFields = [
  { name: 'email', field: 'Email', type: 'text' },
  { name: 'name', field: 'Họ tên', type: 'text' },
  { name: 'password', field: 'Mật khẩu', type: 'password' },
  { name: 'confirmPassword', field: 'Xác nhận mật khẩu', type: 'password' },
  { name: 'phoneNumber', field: 'Số điện thoại', type: 'text' },
  { name: 'address', field: 'Địa chỉ', type: 'text' },
];

function SignUp() {
  const { toasts } = useToasterStore();
  const navigate = useNavigate();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 1)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email không hợp lệ!')
        .max(255)
        .required('Email không thể bỏ trống!'),
      password: Yup.string()
        .min(8, 'Độ dài không đủ 8 ký tự')
        .max(32, 'Độ dài không quá 32 ký tự')
        .required('Mật khẩu không thể bỏ trống!'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp!')
        .required('Xác nhận mật khẩu không thể bỏ trống!'),
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
        const { data } = await axios.post('users/create', values);
        if (data.status !== 200) {
          toast.error(data.message);
          return;
        }
        toast.success('Vui lòng kiểm tra email');
        setTimeout(() => navigate('/signin'), 1000);
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className='flex items-center justify-center bg-emerald-500 p-10 min-h-[80vh]'>
      <form
        className='bg-white px-6 py-4 shadow-2xl rounded'
        onSubmit={formik.handleSubmit}
      >
        <h2 className='text-4xl font-semibold text-center mb-5'>Đăng ký</h2>
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
            Đăng ký
          </button>
          <Link to='/signin'>
            <span className='text-emerald-500'>Bạn đã có tài khoản?</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
