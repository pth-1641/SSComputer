import { useEffect, useState } from 'preact/hooks';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { useToasterStore, Toaster } from 'react-hot-toast';

const formFields = [
  { name: 'email', field: 'Email', type: 'text' },
  { name: 'verifyCode', field: 'Mã xác nhận', type: 'number' },
  { name: 'password', field: 'Mật khẩu', type: 'password' },
  { name: 'confirmPassword', field: 'Xác nhận mật khẩu', type: 'password' },
];

function ResetPassword() {
  const { toasts } = useToasterStore();
  const navigate = useNavigate();
  const [resendCodeTime, setResetCodeTime] = useState(60);
  const [isSentCode, setIsSentCode] = useState(false);

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 1)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  useEffect(() => {
    let timer;
    if (isSentCode) {
      timer = setInterval(() => {
        setResetCodeTime(resendCodeTime - 1);
      }, 1000);
    }

    if (resendCodeTime === 0) {
      setResetCodeTime(60);
      setIsSentCode(false);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isSentCode, resendCodeTime]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      verifyCode: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email không hợp lệ!')
        .max(255)
        .required('Email không thể bỏ trống!'),
      verifyCode: Yup.number().required('Chưa nhập mã xác thực'),
      password: Yup.string()
        .min(8, 'Độ dài không đủ 8 ký tự')
        .max(32, 'Độ dài không quá 32 ký tự')
        .required('Mật khẩu không thể bỏ trống!'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp!')
        .required('Xác nhận mật khẩu không thể bỏ trống!'),
    }),
    onSubmit: async (values) => {
      try {
        if (!values.verifyCode) {
          toast.error('Mã xác thực không được để trống!');
          return;
        }
        const { data } = await axios.post('users/reset-password', values);
        if (data.status !== 200) {
          toast.error(data.message);
          return;
        }
        toast.success('Đổi mật khẩu thành công!');
        navigate('/signin');
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleGetVerifyCode = async () => {
    try {
      if (isSentCode) return;
      const { error, value } = formik.getFieldMeta('email');
      if (!value || error) {
        formik.setFieldTouched('email', true).then((e) => e);
        return;
      }
      setIsSentCode(true);
      const { data } = await axios.post('reset-password', {
        email: formik.values.email,
      });
      if (data.status !== 200) {
        toast.error(data.message);
        return;
      }
      toast.success('Vui lòng kiểm tra email.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex items-center justify-center bg-emerald-500 p-10 min-h-[80vh]'>
      <form
        className='bg-white px-6 py-6 shadow-2xl rounded'
        onSubmit={formik.handleSubmit}
      >
        <h2 className='text-4xl font-semibold text-center mb-6'>
          Quên mật khẩu?
        </h2>
        <div className='grid gap-4'>
          {formFields.map(({ name, field, type }, idx) =>
            idx !== 1 ? (
              <div>
                <input
                  placeholder={field}
                  className={`w-full px-2 py-2 border border-emerald-300 outline-none ${
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
            ) : (
              <div className='flex items-stretch gap-2'>
                <input
                  placeholder={field}
                  className='px-2 py-2 border border-emerald-300 outline-none w-96'
                  name={name}
                  type={type}
                  onInput={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
                />
                <button
                  className={`w-28 text-white ${
                    isSentCode ? 'bg-slate-400' : 'bg-emerald-500'
                  }`}
                  onClick={handleGetVerifyCode}
                  type='button'
                >
                  {isSentCode ? resendCodeTime : 'Lấy mã'}
                </button>
              </div>
            )
          )}
          <button
            type='submit'
            className='w-full py-2 bg-emerald-500 text-white'
          >
            Xác nhận
          </button>
          <div className='flex justify-between items-center'>
            <Link to='/signup'>
              <span className='text-emerald-500'>Đăng ký</span>
            </Link>
            <Link to='/signin'>
              <span className='text-emerald-500'>Đăng nhập</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
