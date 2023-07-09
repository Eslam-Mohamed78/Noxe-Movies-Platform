import style from "./ResetPassword.module.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import baseUrl from "../../Context/baseUrl.js";

export default function ResetPassword() {
  const [isloading, setisloading] = useState(false);
  const [MessageError, setMessageError] = useState("");
  let navigate = useNavigate();

  const resetPasswordValidation = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid Email Address"),
    newPassword: Yup.string()
      .required("Password is Required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/, // space after comma {5, 10} makes error
        "Password must start with uppercase..."
      ),
  });

  async function handleResetPassword(values) {
    setisloading(true);
    await axios
      .put(`${baseUrl}/api/v1/auth/resetPassword`, values)
      .then((result) => {
        if (result?.data?.token) {
          console.log("done");
          toast.success("Password Reset Successfully", { duration: 2000 });
          navigate("/login");
        }
        console.log(result);
      })
      .catch((err) => {
        setMessageError(err?.response?.data?.message);
      });

    setisloading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handleResetPassword,
    validationSchema: resetPasswordValidation,
  });

  return (
    <>
      <Helmet>
        <title>Reset-Password</title>
      </Helmet>

      <div className={` d-flex align-items-center vh-100 ${style.background}`}>
        <div className="w-50 mx-auto shadow-lg form-background py-5 px-4 rounded-3">
          <h3 className="mb-4 text-danger">Reset New Password</h3>
          {MessageError ? (
            <div className="alert alert-danger">{MessageError}</div>
          ) : null}

          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="form-control mt-3 mb-4"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : null}

            <label htmlFor="newPassword">New Password :</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="form-control mt-3 mb-4"
            />
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div className="alert alert-danger">
                {formik.errors.newPassword}
              </div>
            ) : null}

            {isloading ? (
              <button type="button" className="btn bg-danger w-100 text-white">
                <i className="fas fa-spinner fa-spin text-white"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="btn bg-danger text-white border-0 w-100 mt-2 fw-bold"
                disabled={!(formik.dirty && formik.isValid)}
              >
                Reset Password
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
