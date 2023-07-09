import { Helmet } from "react-helmet";
import style from "./Login.module.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import baseUrl from "./../../Context/baseUrl.js";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ saveUserData }) {
  const [isloading, setisloading] = useState(false);
  const [messageError, setmessageError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid Eamil Address"),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase and length between 5 & 10"
      ),
  });

  async function handleSubmit(values) {
    setisloading(true);
    await axios
      .post(`${baseUrl}/api/v1/auth/signin`, values)
      .then((result) => {
        console.log(result);
        if (result?.data?.message === "success") {
          setisloading(false);
          localStorage.setItem("noxeUserToken", result?.data.token);
          saveUserData();
          navigate("/");
        }
      })
      .catch((err) => {
        setisloading(false);
        console.log(err);
        setmessageError(err?.response?.data?.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Helmet>
        <title>LogIn-Page</title>
      </Helmet>

      <div className={` d-flex align-items-center vh-100 ${style.background}`}>
        <div className=" w-50 mx-auto shadow-lg form-background p-3 px-4 rounded-3">
          <h1 className="text-danger fw-bold mb-3">LogIn Now...</h1>

          {messageError ? (
            <div className=" alert alert-danger">{messageError}</div>
          ) : null}

          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className=" form-control mt-2 mb-4"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className=" alert alert-danger">{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password">Password :</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className=" form-control mt-2 mb-3"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className=" alert alert-danger">
                {formik.errors.password}
              </div>
            ) : null}

            <div className="mb-4 text-danger">
              <Link
                className=" text-reset text-decoration-none"
                to="/ForgotPassword"
              >
                Forgot-Password...? &nbsp; 
                <i className="fa-solid text-danger fa-unlock-keyhole"></i>
              </Link>
            </div>

            {isloading ? (
              <button type="button" className="btn bg-danger w-100 text-white">
                <i className="fas fa-spinner fa-spin text-white"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="btn bg-danger text-white border-0 w-100 mt-2 fw-bold"
                disabled={!(formik.isValid && formik.dirty)}
              >
                LogIn
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
