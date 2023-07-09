import style from "./Actors.module.css";
import { Helmet } from "react-helmet";
import { dataContext } from "../../Context/DataContext.js";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Actors() {
  const { getActors } = useContext(dataContext);
  const [isloading, setisloading] = useState(false);
  const [actors, setactors] = useState(null);

  async function allActors() {
    setisloading(true);
    const actorsResponse = await getActors();
    setactors(actorsResponse.data.results.filter((e) => e.name !== "Seung Ha"));
    console.log(actorsResponse);

    if (
      actorsResponse?.response?.data?.success === false) {
      console.log("Erorr to get actors Data");
    }

    setisloading(false);
  }

  useEffect(() => {
    allActors();
  }, []);

  return (
    <>
      <Helmet>
        <title>Actors-Page</title>
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
                All Actors to review right now
              </h2>
              <p className=" mb-0 text-color">
                A list of all Actors ,this list is updated every week
                depends on trending Actors.
              </p>
            </div>

            {actors?.map((actor) => (
              <div
                key={actor.id}
                className={`col-lg-2 col-md-4 ${style.poster}`}
              >
                <Link to={`/actorDetails/${actor?.id}`}>
                  <div className={`${style.movie}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
                      alt={actor?.title}
                      className={`w-100  rounded-2`}
                    />

                    <h6 className="text-center mt-2 mb-0 text-color">
                      {actor?.name.length > 20
                        ? `${actor?.name.slice(0, 20)}...`
                        : actor?.name}
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
