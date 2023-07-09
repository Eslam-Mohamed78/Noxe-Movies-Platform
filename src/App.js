import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import jwtDecode from "jwt-decode";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";
import Home from "./components/Home/Home.jsx";
import Movies from "./components/Movies/Movies.jsx";
import TV from "./components/TV/TV.jsx";
import Actors from "./components/Actors/Actors.jsx";
import MovieDetails from "./components/movieDetails/movieDetails.jsx";
import TvDetails from "./components/tvDetails/tvDetails.jsx";
import ActorDetails from "./components/actorDetails/actorDetails.jsx";
import Login from "./components/Login/Login.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Register from "./components/Register/Register.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import Notfound from "./components/Notfound/Notfound.jsx";
import { DataContextProvider } from "./Context/DataContext.js";

export default function App() {
  const [userData, setuserData] = useState(null);

  // prevent logout after refresh
  useEffect(() => {
    if (localStorage.getItem("noxeUserToken")) saveUserData();
  }, []);

  function saveUserData() {
    const encodedToken = localStorage.getItem("noxeUserToken");
    const decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken);
  }

  function ProtectedRoute(props) {
    if (!localStorage.getItem("noxeUserToken")) {
      return <Navigate to="/login" />;
    }

    return props.children;
  }

  const routers = createHashRouter([
    {
      path: "",
      element: <Layout userData={userData} setuserData={setuserData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "Movies",
          element: (
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          ),
        },
        {
          path: "TV",
          element: (
            <ProtectedRoute>
              <TV />
            </ProtectedRoute>
          ),
        },
        {
          path: "Actors",
          element: (
            <ProtectedRoute>
              <Actors />
            </ProtectedRoute>
          ),
        },
        {
          path: "movieDetails/:id",
          element: (
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "tvDetails/:id",
          element: (
            <ProtectedRoute>
              <TvDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "actorDetails/:id",
          element: (
            <ProtectedRoute>
              <ActorDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "Register",
          element: <Register />,
        },
        { path: "Login", element: <Login saveUserData={saveUserData} /> },
        { path: "ForgotPassword", element: <ForgotPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <DataContextProvider>
        <Toaster />
        <Offline>
          <div className="offline text-danger rounded-2">
            We are Offline Now !{" "}
            <i className="text-color fa-solid fa-wifi"> </i>
          </div>
        </Offline>
        <RouterProvider router={routers}></RouterProvider>
      </DataContextProvider>
    </>
  );
}
