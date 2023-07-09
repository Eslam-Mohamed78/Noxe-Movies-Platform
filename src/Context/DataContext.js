import axios from "axios";
import { createContext } from "react";

export const dataContext = createContext();

const key = `ade27947f0b6183fa7f925f0eaf6e23a`;
const movieBaseUrl = `https://api.themoviedb.org/3`;

export function DataContextProvider(props) {
  async function getTrending(endPoint) {
    return axios
      .get(`${movieBaseUrl}/trending/${endPoint}/week?api_key=${key}`)
      .then((result) => result)
      .catch((err) => err);
  }

  async function getDetails(endPoint, id) {
    return axios
      .get(`${movieBaseUrl}/${endPoint}/${id}?api_key=${key}&language=en-US`)
      .then((result) => result)
      .catch((err) => err);
  }

  async function getMovies() {
    return axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=ade27947f0b6183fa7f925f0eaf6e23a" +
          "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}"
      )
      .then((result) => result)
      .catch((err) => err);
  }

  async function getTV() {
    return axios
      .get(
        "https://api.themoviedb.org/3/discover/tv?api_key=ade27947f0b6183fa7f925f0eaf6e23a" +
          "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}"
      )
      .then((result) => result)
      .catch((err) => err);
  }

  async function getActors() {
    return axios
      .get(
        "https://api.themoviedb.org/3/person/popular?api_key=ade27947f0b6183fa7f925f0eaf6e23a" +
          "&language=en-US&page=${page}"
      )
      .then((result) => result)
      .catch((err) => err);
  }

  return (
    <dataContext.Provider
      value={{ getTrending, getDetails, getMovies, getTV, getActors }}
    >
      {props.children}
    </dataContext.Provider>
  );
}
