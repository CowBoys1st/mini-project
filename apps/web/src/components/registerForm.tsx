"use client"
import { useFormik } from "formik";
import * as Yup from "yup";
import { IUserReg } from "@/type/user";
import { regUser } from "@/lib/user";


const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  roleId: Yup.number().required("Role is required"),
  referral: Yup.string(),
});

const RegisterForm: React.FC = () => {
  const formik = useFormik<IUserReg>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      roleId: 1,
      referral: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await regUser(values);
        if (response.ok) {
          alert("User registered successfully");
        } else {
          alert("Registration failed");
        }
      } catch (error) {
        console.error("Registration error: ", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border rounded p-2 w-full"
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>

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

      <div>
        <label htmlFor="roleId">Role ID</label>
        <input
          id="roleId"
          name="roleId"
          type="number"
          value={formik.values.roleId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border rounded p-2 w-full"
        />
        {formik.touched.roleId && formik.errors.roleId ? (
          <div>{formik.errors.roleId}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="referral">Referral Code</label>
        <input
          id="referral"
          name="referral"
          type="text"
          value={formik.values.referral}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border rounded p-2 w-full"
        />
        {formik.touched.referral && formik.errors.referral ? (
          <div>{formik.errors.referral}</div>
        ) : null}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
};

export default RegisterForm;
