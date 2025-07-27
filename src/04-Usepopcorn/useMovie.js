import { useState, useEffect } from "react";

const KEY = "ba1fb5c0";

export function useMovie(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsloading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { singal: controller.singal }
          );

          if (!res.ok) {
            throw new Error("Internet not Avalabail");
          }
          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie Not Found");
          }
          setMovies(data.Search);
          setError("");

          // console.log(data.Search);
        } catch (error) {
          // console.log(error.message);

          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsloading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      //   handleClose();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isloading, error };
}
