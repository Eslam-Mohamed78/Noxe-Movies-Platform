// import style from './ActorDetails.module.css'
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { dataContext } from "../../Context/DataContext.js";
import { Link, useParams } from "react-router-dom";

export default function ActorDetails() {
  const { getDetails } = useContext(dataContext);
  const [isloading, setisloading] = useState(false);
  const [actorDetails, setactorDetails] = useState(null);
  const params = useParams();

  async function details() {
    const endPoint = "person";
    const id = params.id;

    setisloading(true);
    const actor = await getDetails(endPoint, id);
    setactorDetails(actor?.data);
    console.log(actor);

    if (actor?.response?.data?.success === false) {
      console.log("Error to get actor details");
    }

    setisloading(false);
  }

  useEffect(() => {
    details();
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${actorDetails?.name}`}</title>
      </Helmet>

      {isloading ? (
        <div className="d-flex justify-content-center my-5 py-3">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="container my-5 pt-3">
          <div className="row">
            <h1 className=" text-danger fw-bold text-center mb-5">
              {actorDetails?.name} Details
            </h1>

            <div className="col-md-4">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${actorDetails?.profile_path}`}
                  alt={actorDetails?.name}
                  className="w-100 rounded-4 mb-5"
                />

                {actorDetails?.homepage ? (
                  <div className="mb-5 text-center">
                    <Link
                      to={actorDetails?.homepage}
                      className="back-danger text-white rounded-2 text-danger fw-bold px-lg-5 px-2 py-3 text-center"
                    >
                      Visit Actor Home Page
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="col-md-7 offset-md-1">
              <div>
                <h2 className="text-info fw-bold">{actorDetails?.name}</h2>

                <p className="text-color">
                  {actorDetails?.biography.slice(0, 600)}
                </p>

                <h2 className="text-info fw-bold mb-3">
                  Popularity :
                  <span className="text-color fw-bold fs-4 ps-3">
                    {actorDetails?.popularity}
                  </span>
                </h2>

                <h2 className="text-info fw-bold mb-3">
                  Birthday :
                  <span className="text-color fw-bold fs-4 ps-3">
                    {actorDetails?.birthday}
                  </span>
                </h2>

                <h2 className="text-info fw-bold mb-3">
                  Place-of-Birth :
                  <span className="text-color fw-bold fs-4 ps-3">
                    {actorDetails?.place_of_birth}
                  </span>
                </h2>

                <h2 className="text-info fw-bold mb-3">
                  Department :
                  <span className="text-color fw-bold fs-4 ps-3">
                    {actorDetails?.known_for_department}
                  </span>
                </h2>

                <h2 className="text-info fw-bold">Known-As : </h2>

                <ul className="hstack list-unstyled gap-3 flex-wrap">
                  {actorDetails?.also_known_as.map((name, index) => (
                    <li key={index} className="text-color">
                      {name}
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
