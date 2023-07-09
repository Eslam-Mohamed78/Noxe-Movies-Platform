import style from "./Home.module.css";
import { Helmet } from "react-helmet";
import { dataContext } from "../../Context/DataContext.js";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function Home() {
  const { getTrending } = useContext(dataContext);
  const [isloading, setisloading] = useState(false);
  const [trendingMovies, settrendingMovies] = useState(null);
  const [trendingTv, settrendingTv] = useState(null);
  const [trendingPersons, settrendingPersons] = useState(null);

  async function trendings() {
    setisloading(true);
    const movieResponse = await getTrending("movie");
    settrendingMovies(movieResponse?.data?.results);

    const tvResponse = await getTrending("tv");
    settrendingTv(tvResponse?.data?.results);

    const personResponse = await getTrending("person");
    settrendingPersons(
      personResponse?.data?.results.filter((e) => e.name !== "Yua Mikami")
    );

    console.log(movieResponse, tvResponse, personResponse);

    if (
      movieResponse?.response?.data?.success === false ||
      tvResponse?.response?.data?.success === false ||
      personResponse?.response?.data?.success === false
    ) {
      console.log("Erorr to get Trending Data");
    }

    setisloading(false);
  }

  useEffect(() => {
    trendings();
  }, []);

  // Slick slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Home-Page</title>
      </Helmet>

      {isloading ? (
        <div className="d-flex justify-content-center">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <>
          <div className={` vh-100 ${style.background}`}>
            <div className="container vstack justify-content-end vh-100">
              <div>
                <h2 className="mb-5 fw-bold fs-1">
                  Top Trending Media Right Now
                </h2>
                <Slider
                  {...settings}
                  className=" rounded-3 overflow-hidden mb-4"
                >
                  {trendingMovies?.map((movie, index) => (
                    <div key={movie.id} className=" cursor-pointer h-100">
                      <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                        alt="slider"
                      ></img>
                      {/* <h2 className="h6 pt-3 fw- text-white">{movie?.name}</h2> */}
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          <div className="container my-5 py-4">
            <div className={`row gy-4 ${style.trendingSection} mt-3`}>
              <div
                className={`col-xl-4 col-lg-6 col-md-12 ${style.caption} px-4 py-5 mb-3 rounded-3`}
              >
                <h2 className=" fw-bold h3 text-info mb-3">
                  Top Trending Movies to watch right now
                </h2>
                <p className=" mb-0 text-color">
                  A list of Top ranked 10 Movies ,this list update every week
                  depends on trending Movies.
                </p>
              </div>
              {trendingMovies?.slice(0, 10).map((movie) => (
                <div
                  key={movie.id}
                  className={`col-lg-2 col-md-4 ${style.poster}`}
                >
                  <Link to={`movieDetails/${movie?.id}`}>
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

            <div className={`row gy-4 ${style.trendingSection}`}>
              <div
                className={`col-xl-4 col-lg-6 col-md-12 ${style.caption} px-4 py-5 mb-3 rounded-3`}
              >
                <h2 className=" fw-bold h3 text-info mb-3">
                  Top Trending Series to watch right now
                </h2>
                <p className=" mb-0 text-color">
                  A list of Top ranked 10 Series ,this list update every week
                  depends on trending Series.
                </p>
              </div>
              {trendingTv?.slice(0, 10).map((movie) => (
                <div
                  key={movie.id}
                  className={`col-md-4 col-lg-2 ${style.poster}`}
                >
                  <Link to={`tvDetails/${movie?.id}`}>
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
                        {movie?.name.length > 20
                          ? `${movie?.name.slice(0, 20)}...`
                          : movie?.name}
                      </h6>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className={`row gy-4 ${style.trendingSection} mb-0`}>
              <div
                className={`col-xl-4 col-lg-6 col-md-12 ${style.caption} px-4 py-5 mb-3 rounded-3`}
              >
                <h2 className=" fw-bold h3 text-info mb-3">
                  Top Trending Celebrites to check right now
                </h2>
                <p className=" mb-0 text-color">
                  A list of Top 10 Celebrites ,this list update every week
                  depends on trending people.
                </p>
              </div>
              {trendingPersons?.slice(0, 10).map((actor) => (
                <div
                  key={actor.id}
                  className={`col-md-4 col-lg-2 ${style.poster}`}
                >
                  <Link to={`actorDetails/${actor?.id}`}>
                    <div className={`${style.person}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
                        alt={actor?.title}
                        className={`w-100  rounded-2`}
                      />

                      <h6 className="text-center mt-2 mb-0 text-color">
                        {actor?.name}
                      </h6>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
