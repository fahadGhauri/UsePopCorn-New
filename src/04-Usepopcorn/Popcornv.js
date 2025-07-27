import React, { Children, use, useEffect, useRef } from "react";
import { useState } from "react";
import "./Usepopcorn.css";
import StarRating from "./StarRating";
import { useMovie } from "./useMovie";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const KEY = "ba1fb5c0";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function SearchBar({ query, setQuery }) {
  const inputEL = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEL.current) return;
    inputEL.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEL}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Foundmovies({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function SelectedMovies({ selectedID, handleClose, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newatchMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecision: countRef.current,
    };
    onAddWatched(newatchMovie);
    handleClose();
  }

  useEffect(
    function () {
      async function getMovie() {
        setIsloading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await res.json();
        // console.log(data);
        setMovie(data);
        setIsloading(false);
      }
      getMovie();
    },
    [selectedID]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useKey("Escape", handleClose);

  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You Rated Movie <span>⭐️</span> {watchedUserRating}
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Movie({ movie, handleSeled }) {
  return (
    <li onClick={() => handleSeled(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies, handleSeled }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          movies={movies}
          key={movie.imdbID}
          handleSeled={handleSeled}
        />
      ))}
    </ul>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Watchsummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchMovieList({ watched, handleDelet }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleDelet={handleDelet}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, handleDelet }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => handleDelet(movie.imdbID)}
        ></button>
      </div>
    </li>
  );
}

// function WatchMovieList({ watched, movie }) {
//   return (
//     <ul className="list">
//       {watched.map((movie) => (
//         <li key={movie.imdbID}>
//           <img src={movie.poster} alt={`${movie.title} poster`} />
//           <h3>{movie.title}</h3>
//           <div>
//             <p>
//               <span>⭐️</span>
//               <span>{movie.imdbRating}</span>
//             </p>
//             <p>
//               <span>🌟</span>
//               <span>{movie.userRating}</span>
//             </p>
//             <p>
//               <span>⏳</span>
//               <span>{movie.runtime} min</span>
//             </p>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

const Popcornv = () => {
  // const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  const { movies, isloading, error } = useMovie(query, handleClose);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });

  function handleSeled(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handleClose() {
    setSelectedID(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watch", JSON.stringify([...watched, movie]));
  }

  function handleDelet(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function ErrorMessage({ message }) {
    return (
      <p className="error">
        <span>🚫</span>
        {message}
      </p>
    );
  }
  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <Foundmovies movies={movies} />
      </Navbar>
      <Main>
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <Watchsummary watched={watched} />
              <WatchMovieList watched={watched} />
            </>
          }
        /> */}
        <Box>
          {/* {isloading ? <Loader /> : <MovieList movies={movies} />} */}
          {isloading && <Loader />}
          {!isloading && !error && (
            <MovieList movies={movies} handleSeled={handleSeled} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedID ? (
            <SelectedMovies
              selectedID={selectedID}
              handleClose={handleClose}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Watchsummary watched={watched} />
              <WatchMovieList
                watched={watched}
                movie={movies}
                handleDelet={handleDelet}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

export default Popcornv;
