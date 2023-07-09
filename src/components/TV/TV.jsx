import style from "./TV.module.css";
import { Helmet } from "react-helmet";
import { dataContext } from "../../Context/DataContext.js";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tv() {
  const { getTV } = useContext(dataContext);
  const [isloading, setisloading] = useState(false);
  const [tvSeries, settvSeries] = useState(null);

  async function allTVs() {
    setisloading(true);
    const tvResponse = await getTV();
    settvSeries(tvResponse.data.results);
    console.log(tvResponse);

    if (
      tvResponse?.response?.data?.success === false) {
      console.log("Erorr to get tvSeries Data");
    }

    setisloading(false);
  }

  useEffect(() => {
    allTVs();
  }, []);

  return (
    <>
      <Helmet>
        <title>TV-Series-Page</title>
      </Helmet>

      {isloading ? (
        <div className="d-flex justify-content-center my-5 py-3">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="container my-5 py-4">
          <div className={`row gy-4 mt-3`}>
            <div
              className={`col-xl-4 col-lg-6 col-md-12 ${style.caption} px-4 py-5 mb-3 rounded-3`}
            >
              <h2 className=" fw-bold h3 text-info mb-3">
                All TV Series to watch right now
              </h2>
              <p className=" mb-0 text-color">
                A list of all TV Series ,this list is updated every week
                depends on trending TV Series.
              </p>
            </div>

            {tvSeries?.map((tv) => (
              <div
                key={tv.id}
                className={`col-lg-2 col-md-4 ${style.poster}`}
              >
                <Link to={`/tvDetails/${tv?.id}`}>
                  <div className={`${style.movie}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${tv?.poster_path}`}
                      alt={tv?.name}
                      className={`w-100  rounded-2`}
                    />
                    <span className={`${style.rate} text-white`}>
                      {tv?.vote_average.toFixed(1)}
                    </span>

                    <h6 className="text-center mt-2 mb-0 text-color">
                      {tv?.name.length > 20
                        ? `${tv?.name.slice(0, 20)}...`
                        : tv?.name}
                    </h6>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
