"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IUserLogin } from "@/type/user";
import { loginUser } from "@/lib/user";
import { useRouter } from "next/navigation"; 

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginForm: React.FC = () => {
  const router = useRouter(); 
  const formik = useFormik<IUserLogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values);
        if (response.ok) {
          const userId = response.user.id;

          router.push(`/user/${userId}`);
        } else {
          alert("Login failed");
        }
      } catch (error) {
        console.error("Login error: ", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border rounded p-2 w-full"
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border rounded p-2 w-full"
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
    </form>
  );
};

export default LoginForm;
