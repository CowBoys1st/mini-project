'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IUserReg } from '@/type/user';
import { regUser } from '@/lib/user';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  roleId: Yup.number().required('Role is required'),
  referral: Yup.string(),
});

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const formik = useFormik<IUserReg>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      roleId: 1,
      referral: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(JSON.stringify(values));
      
      try {
        const response = await regUser(values);
        console.log("formik", response);
        
        if (response.error) throw response.error;
        
        alert("Account has created")
        router.push('/login');
      } catch (error: any) {
        alert(`Registration failed: ${error}`);
        console.error('Registration error: ', error);
      }
    },
  });
  

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Register
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>

        {/* Email */}
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
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* Password */}
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
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        {/* Role Dropdown */}
        <div>
          <label
            htmlFor="roleId"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="roleId"
            name="roleId"
            value={formik.values.roleId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={1}>Customer</option>
            <option value={2}>Event Organizer</option>
          </select>
          {formik.touched.roleId && formik.errors.roleId && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.roleId}
            </div>
          )}
        </div>

        {/* Referral Code */}
        <div>
          <label
            htmlFor="referral"
            className="block text-sm font-medium text-gray-700"
          >
            Referral Code (Optional)
          </label>
          <input
            id="referral"
            name="referral"
            type="text"
            value={formik.values.referral}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.referral && formik.errors.referral && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.referral}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full border-2 border-red-600 text-red-600 hover:text-white rounded-full py-3 font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors duration-300"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-red-600 font-semibold hover:underline"
          >
            Login Here
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
