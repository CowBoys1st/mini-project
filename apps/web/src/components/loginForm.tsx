'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IUserLogin } from '@/type/user';
import { loginUser } from '@/lib/user';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm: React.FC = () => {
  const router = useRouter();
  const formik = useFormik<IUserLogin>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values);
        if (response.ok) {
          const userId = response.user.id;

          router.push(`/user/${userId}`);
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error('Login error: ', error);
      }
    },
  });

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Login
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white border-2 border-red-600 hover:text-red-600 rounded-full py-3 font-semibold hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="text-red-600 font-semibold hover:underline"
          >
            Register Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
