import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
// import style from './Layout.module.css'

export default function Layout({ userData, setuserData }) {
  return (
    <>
      <Navbar userData={userData} setuserData={setuserData} />
      <Outlet></Outlet>
      <Footer/>
    </>
  );
}
