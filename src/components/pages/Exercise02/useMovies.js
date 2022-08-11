import { useState, useEffect, useCallback } from "react";

const useMovies = (handleCount = (f) => f) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    handleCount((prev) => prev + 1);
    Promise.all([
      fetch("http://localhost:3001/movies?_limit=50"),
      fetch("http://localhost:3001/genres"),
    ])
      .then(([moviesRes, genresRes]) => {
        return Promise.all([moviesRes.json(), genresRes.json()]);
      })
      .then(([movies, genres]) => {
        setMovies(movies);
        setFilterMovies(movies);
        setGenres(genres);
      })
      .catch(() => {
        console.log("error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!selectedGenre) return setFilterMovies(orderMovies(movies));
    const filteredMovies = movies.filter((movie) => {
      return movie.genres.includes(selectedGenre);
    });
    setFilterMovies(orderMovies(filteredMovies));
  }, [selectedGenre, movies]);

  useEffect(() => {
    if (movies.length === 0) return;
    setFilterMovies((prev) => orderMovies(prev));
  }, [order]);

  const orderMovies = (listMovies) => {
    return [...listMovies].sort((a, b) => {
      if (order === "asc") return a.year - b.year;
      return b.year - a.year;
    });
  };

  const handleOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };
  return {
    filterMovies,
    genres,
    selectedGenre,
    setSelectedGenre,
    order,
    handleOrder,
    loading,
  };
};

export default useMovies;
