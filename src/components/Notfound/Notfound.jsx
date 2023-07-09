import React from "react";
import style from "./Notfound.module.css";
import { Helmet } from "react-helmet";

export default function Notfound() {
  return (
    <>
      <Helmet>
        <title>Page-NotFound</title>
      </Helmet>

      <div className={style.background}></div>
    </>
  );
}
