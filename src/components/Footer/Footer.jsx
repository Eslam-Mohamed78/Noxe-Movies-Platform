// import style from './Footer.module.css'
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="vstack align-items-center my-3">
        <ul className=" list-unstyled d-flex mb-1">
          <li>
            <Link
              to="https://www.linkedin.com/in/eslam-mohamed-71695b255/"
              target="_blank"
              className=" text-danger"
            >
              <i className="fa-brands cursor-pointer fa-linkedin mx-2"></i>
            </Link>
          </li>
          <li>
            <Link
              to="https://github.com/Eslam-Mohamed78"
              target="_blank"
              className=" text-danger"
            >
              <i className="fa-brands cursor-pointer fa-github mx-2"></i>
            </Link>
          </li>
          <li>
            <Link
              to="https://leetcode.com/em7506386/"
              target="_blank"
              className=" text-danger"
            >
              <i className="fa-solid cursor-pointer fa-code mx-2"></i>
            </Link>
          </li>
          <li>
            <Link
              to="https://drive.google.com/file/d/12G0-L4xdDG9dM0ZoC8J-D5hQYvXQCn3y/view?usp=sharing"
              target="_blank"
              className=" text-danger"
            >
              <i className="fa-regular fa-file-lines cursor-pointer mx-2"></i>
            </Link>
          </li>
          <li>
            <Link
              to="mailto: eslam.mohamed.swe@gmail.com"
              target="_blank"
              className=" text-danger"
            >
              <i className="fa-solid cursor-pointer fa-envelope mx-2"></i>
            </Link>
          </li>
        </ul>

        <div>
          <p className="mb-3 text-center text-info">
            <span className=" text-danger">Designed By :</span> Eslam Mohamed /
            SWE & React.js Developer
          </p>
        </div>
      </div>
    </>
  );
}
