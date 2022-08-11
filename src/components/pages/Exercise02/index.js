/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import { useEffect, useState } from "react";
import "./assets/styles.css";
import useMovies from "./useMovies";

export default function Exercise02() {
  const [fetchCount, setFetchCount] = useState(0);
  const {
    filterMovies,
    genres,
    selectedGenre,
    setSelectedGenre,
    order,
    handleOrder,
    loading,
  } = useMovies(setFetchCount);

  return (
    <section className="movie-library">
      <div className="movie-library__header">
        <h1 className="movie-library__title">Movie Library</h1>
        <div className="movie-library__actions">
          <select
            name="genre"
            placeholder="Search by genre..."
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
            }}
          >
            <option value="">All</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button onClick={handleOrder}>
            {order === "asc" ? "Year Descending" : "Year Ascending"}
          </button>
        </div>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {filterMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-library__card"
              style={{
                backgroundImage: `url(${movie.posterUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="movie-library__card-front">
                <ul>
                  <li>{movie.title}</li>
                  <li>{movie.genres.join(", ")}</li>
                  <li>{movie.year}</li>
                </ul>
              </div>
            </div>
          ))}
        </ul>
      )}
    </section>
  );
}
