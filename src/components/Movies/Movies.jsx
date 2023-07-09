import style from "./Movies.module.css";
import { Helmet } from "react-helmet";
import { dataContext } from "../../Context/DataContext.js";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Movies() {
  const { getMovies } = useContext(dataContext);
  const [isloading, setisloading] = useState(false);
  const [Movies, setMovies] = useState(null);

  async function allMovies() {
    setisloading(true);
    const movieResponse = await getMovies();
    setMovies(movieResponse.data.results);
    console.log(movieResponse);

    if (
      movieResponse?.response?.data?.success === false) {
      console.log("Erorr to get Movies Data");
    }

    setisloading(false);
  }

  useEffect(() => {
    allMovies();
  }, []);

  return (
    <>
      <Helmet>
        <title>Movies-Page</title>
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
                All Movies to watch right now
              </h2>
              <p className=" mb-0 text-color">
                A list of all Movies ,this list is updated every week
                depends on trending Movies.
              </p>
            </div>

            {Movies?.map((movie) => (
              <div
                key={movie.id}
                className={`col-lg-2 col-md-4 ${style.poster}`}
              >
                <Link to={`/movieDetails/${movie?.id}`}>
                  <div className={`${style.movie}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                      alt={movie?.title}
                      className={`w-100  rounded-2`}
                    />
                    <span className={`${style.rate} text-white`}>
                      {movie?.vote_average.toFixed(1)}
                    </span>

                    <h6 className="text-center mt-2 mb-0 text-color">
                      {movie?.title.length > 20
                        ? `${movie?.title.slice(0, 20)}...`
                        : movie?.title}
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
