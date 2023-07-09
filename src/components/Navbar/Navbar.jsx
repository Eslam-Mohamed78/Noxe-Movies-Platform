import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import style from "./Navbar.module.css";

export default function Navbar({ userData, setuserData }) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("noxeUserToken");
    setuserData(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light shadow-sm fixed-top">
        <div className="container">
          <Link className="navbar-brand text-danger fw-semibold fs-4" to="">
            Noxe
          </Link>
          <button
            className="navbar-toggler d-lg-none bg-danger"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userData ? (
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0 gap-3">
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white"
                    to="/"
                    aria-current="page"
                  >
                    Home <span className="visually-hidden">(current)</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white"
                    to="/movies"
                  >
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/tv">
                    TV
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/Actors">
                    Actors
                  </NavLink>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 align-items-center">
              <li className="d-sm-none d-lg-block">
                <i className="fa-brands social-color cursor-pointer fa-facebook mx-2 text-danger"></i>
                <i className="fa-brands social-color cursor-pointer fa-twitter mx-2 text-danger"></i>
                <i className="fa-brands social-color cursor-pointer fa-instagram mx-2 text-danger"></i>
                <i className="fa-brands social-color cursor-pointer fa-youtube mx-2 text-danger"></i>
                <i className="fa-brands social-color cursor-pointer fa-tiktok mx-2 text-danger"></i>
                <i className="fa-brands social-color cursor-pointer fa-dribbble mx-2 text-danger"></i>
              </li>

              {userData ? (
                <li className="nav-item">
                  <Link
                    onClick={logOut}
                    className="nav-link cursor-pointer navbarLink fw-bol text-white"
                  >
                    LogOut
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link navbarLink fw-bol text-white"
                      to="/Login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link navbarLink fw-bol text-white"
                      to="/Register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
