import { Helmet } from "react-helmet";
import style from "./Register.module.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import baseUrl from "./../../Context/baseUrl.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isloading, setisloading] = useState(false);
  const [messageError, setmessageError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(4, "Name minimum length is 4")
      .max(15, "Name maximum length is 15"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid Eamil Address"),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase and length between 5 & 10"
      ),
    rePassword: Yup.string()
      .required("rePassword is Required")
      .oneOf([Yup.ref("password")], "Password & Confirmation doesn't match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone must be Egyption number"),
  });

  async function handleSubmit(values) {
    setisloading(true);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/signup`, values)
      .then((result) => {
        console.log(result);
        if (data?.message === "success") {
          setisloading(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        setisloading(false);
        console.log(err);
        setmessageError(err.response.data.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Register-Page</title>
      </Helmet>

      <div className={` d-flex align-items-center vh-100 ${style.background}`}>
        <div className=" w-75 mx-auto shadow-lg form-background p-3 px-4 rounded-3">
          <h1 className="text-danger fw-bold">Register Now...</h1>

          {messageError ? (
            <div className=" alert alert-danger">{messageError}</div>
          ) : null}

          <form onSubmit={formik.handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-md-6 px-">
                  <div>
                    <label htmlFor="name" className="mt-2">
                      Name :
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className=" form-control mt-1 mb-3"
                    />
                    {formik.errors.name && formik.touched.name ? (
                      <div className=" alert alert-danger">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div>
                    <label htmlFor="email" className="mt-2">
                      Email :
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className=" form-control mt-1 mb-3"
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <div className=" alert alert-danger">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div>
                    <label htmlFor="password">Password :</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className=" form-control mt-1 mb-3"
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <div className=" alert alert-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div>
                    <label htmlFor="rePassword">Confirm Password :</label>
                    <input
                      type="password"
                      name="rePassword"
                      id="rePassword"
                      value={formik.values.rePassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className=" form-control mt-1 mb-3"
                    />
                    {formik.errors.rePassword && formik.touched.rePassword ? (
                      <div className=" alert alert-danger">
                        {formik.errors.rePassword}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-12">
                  <div>
                    <label htmlFor="phone">Phone :</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className=" form-control mt-1 mb-3"
                    />
                    {formik.errors.phone && formik.touched.phone ? (
                      <div className=" alert alert-danger">
                        {formik.errors.phone}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-12">
                  <div>
                    {isloading ? (
                      <button
                        type="button"
                        className="btn bg-danger w-100 text-white"
                      >
                        <i className="fas fa-spinner fa-spin text-white"></i>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn bg-danger text-white border-0 w-100 mt-2 fw-bold"
                        disabled={!(formik.isValid && formik.dirty)}
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
