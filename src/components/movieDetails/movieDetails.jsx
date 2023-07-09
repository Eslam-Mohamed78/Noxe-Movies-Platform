// import style from './MovieDetails.module.css'
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { dataContext } from "../../Context/DataContext.js";
import { Link, useParams } from "react-router-dom";

export default function MovieDetails() {
  const { getDetails } = useContext(dataContext);
  const [isloading, setisloading] = useState(false);
  const [movieDetails, setmovieDetails] = useState(null);
  const params = useParams();

  async function details() {
    const endPoint = "movie";
    const id = params.id;

    setisloading(true);
    const movie = await getDetails(endPoint, id);
    setmovieDetails(movie?.data);
    console.log(movie);

    if (movie?.response?.data?.success === false) {
      console.log("Error to get movie details");
    }

    setisloading(false);
  }

  useEffect(() => {
    details();
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${movieDetails?.original_title}-Details`}</title>
      </Helmet>

      {isloading ? (
        <div className="d-flex justify-content-center my-5 py-3">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="container my-5 pt-3">
          <div className="row">
            <h1 className=" text-danger fw-bold text-center mb-5">
              {movieDetails?.original_title} Details
            </h1>

            <div className="col-md-4">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
                  alt={movieDetails?.original_title}
                  className="w-100 rounded-4 mb-5"
                />
                <div className="mb-5 text-center">
                  <Link
                    to={movieDetails?.homepage}
                    className="back-danger text-white rounded-2 text-danger fw-bold px-lg-5 px-2 py-3 text-center"
                  >
                    Visit Movie Website
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-7 offset-md-1">
              <div>
                <h2 className="text-info fw-bold">
                  {movieDetails?.original_title} Movie
                </h2>

                <p className="text-color">{movieDetails?.overview}</p>

                <h2 className="text-info fw-bold">Genres :</h2>

                <ul className="hstack list-unstyled gap-3 flex-wrap">
                  {movieDetails?.genres.map((gen, index) => (
                    <li key={index} className="text-color">
                      {gen.name}
                    </li>
                  ))}
                </ul>

                <h2 className="text-info fw-bold mb-3">
                  Revenue :
                  <span className="text-color fw-bold fs-4 ps-3">
                    {movieDetails?.revenue}
                  </span>
                </h2>

                <h2 className="text-info fw-bold mb-3">
                  Runtime :
                  <span className="text-color fw-bold fs-4 ps-3">
                    {movieDetails?.runtime}
                  </span>
                </h2>

                <h2 className="text-info fw-bold mb-3">
                  Release Date :
                  <span className="text-color fw-bold fs-4 ps-3">
                    {movieDetails?.release_date}
                  </span>
                </h2>

                <h2 className="text-info fw-bold mb-3">Spoken Languages :</h2>

                <ul className="hstack list-unstyled gap-3 flex-wrap">
                  <li className="text-color">
                    Origingal_Language({movieDetails?.original_language})
                  </li>
                  {movieDetails?.spoken_languages.map((language, index) => (
                    <li key={index} className="text-color">
                      {language.name}
                    </li>
                  ))}
                </ul>

                <h2 className="text-info fw-bold">Production Companies : </h2>

                <ul className="hstack list-unstyled gap-3 flex-wrap">
                  {movieDetails?.production_companies.map((company, index) => (
                    <li key={index} className="text-color">
                      {company.name}
                    </li>
                  ))}
                </ul>

                <h2 className="text-info fw-bold">Production Countries : </h2>

                <ul className="hstack list-unstyled gap-3 flex-wrap">
                  {movieDetails?.production_countries.map((country, index) => (
                    <li key={index} className="text-color">
                      {country.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
