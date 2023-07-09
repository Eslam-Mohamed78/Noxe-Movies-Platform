import style from "./ForgotPassword.module.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import baseUrl from "../../Context/baseUrl.js";

export default function ForgotPassword() {
  const [isloading, setisloading] = useState(false);
  const [MessageError, setMessageError] = useState("");
  const [codeSent, setcodeSent] = useState(false);
  let navigate = useNavigate();

  // ====================== Forget Password  =====================
  const emailRecoveryValidation = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid Email Address"),
  });

  async function handleEmailRecovery(values) {
    setisloading(true);
    await axios
      .post(`${baseUrl}/api/v1/auth/forgotPasswords`, values)
      .then((result) => {
        if (result?.data?.statusMsg === "success") {
          setcodeSent(true);
          toast.success("Code Sent Successfully", { duration: 2000 });
          console.log(result);
        }
      })
      .catch((err) => {
        setMessageError(err?.response?.data?.message);
        console.log(err);
      });

    setisloading(false);
  }

  const formikEmailRecovery = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleEmailRecovery,
    validationSchema: emailRecoveryValidation,
  });

  // ========================= Reset Code =======================
  const resetCodeValidation = Yup.object({
    resetCode: Yup.string()
      .required("Code is required")
      .matches(/^[0-9]+$/, "The reset code is only numbers..."),
  });

  async function handleResetCode(values) {
    setisloading(true);
    await axios
      .post(`${baseUrl}/api/v1/auth/verifyResetCode`, values)
      .then((result) => {
        console.log(result);
        if (result?.data?.status === "Success") {
          toast.success("Code Verified Successfully'", { duration: 2000 });
          console.log(result);
          navigate("/ResetPassword");
          setcodeSent(false);
        }
      })
      .catch((err) => {
        setMessageError(err?.response?.data?.message);
        console.log(err);
      });

    setisloading(false);
  }

  const formikResetCode = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleResetCode,
    validationSchema: resetCodeValidation,
  });

  return (
    <>
      <Helmet>
        <title>Forgot_Password</title>
      </Helmet>

      {codeSent ? (
        <>
          <div
            className={` d-flex align-items-center vh-100 ${style.background}`}
          >
            <div className="w-50 mx-auto shadow-lg form-background py-5 px-4 rounded-3">
              <h3 className="mb-4 text-danger">Enter The Recieved Code :</h3>
              {MessageError ? (
                <div className="alert alert-danger">{MessageError}</div>
              ) : null}

              <form onSubmit={formikResetCode.handleSubmit}>
                <label htmlFor="resetCode">Reset Code :</label>
                <input
                  type="text"
                  name="resetCode"
                  id="resetCode"
                  onChange={formikResetCode.handleChange}
                  onBlur={formikResetCode.handleBlur}
                  value={formikResetCode.values.resetCode}
                  className="form-control mt-3 mb-4"
                />
                {formikResetCode?.errors?.resetCode &&
                formikResetCode?.touched?.resetCode ? (
                  <div className="alert alert-danger">
                    {formikResetCode?.errors?.resetCode}
                  </div>
                ) : null}

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
                    disabled={
                      !(formikResetCode.isValid && formikResetCode.dirty)
                    }
                  >
                    Reset Code
                  </button>
                )}
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={` d-flex align-items-center vh-100 ${style.background}`}
          >
            <div className="w-50 mx-auto shadow-lg form-background py-5 px-4 rounded-3">
              <h3 className="mb-4 text-danger">Get Recovery Code :</h3>
              {MessageError ? (
                <div className="alert alert-danger">{MessageError}</div>
              ) : null}

              <form onSubmit={formikEmailRecovery.handleSubmit}>
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formikEmailRecovery.handleChange}
                  onBlur={formikEmailRecovery.handleBlur}
                  value={formikEmailRecovery.values.email}
                  className="form-control mt-3 mb-4"
                />
                {formikEmailRecovery.errors.email &&
                formikEmailRecovery.touched.email ? (
                  <div className="alert alert-danger">
                    {formikEmailRecovery.errors.email}
                  </div>
                ) : null}

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
                    disabled={
                      !(
                        formikEmailRecovery.isValid && formikEmailRecovery.dirty
                      )
                    }
                  >
                    Send Code
                  </button>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
