import React, { useState } from "react";

const StatesComponent = () => {
  // const [movie, setMovie] = useState({
  //   title: "Weak Hero",
  //   rating: 4,
  // });
  // const handleRating = () => {
  //   setMovie({ ...movie, rating: 5 });
  // };
  const [movies, setMovie] = useState([
    { id: 1, title: "SpiderMan", rating: 4 },
    { id: 2, title: "MoonKnight", rating: 5 },
  ]);

  const handleRating = () => {
    const updatedMovies = movies.map((movie) =>
      movie.rating === 4 ? { ...movie, rating: 10 } : movie
    );
    setMovie(updatedMovies);
  };

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>Title: {movie.title}</h2>
          <h3>Rating: {movie.rating}</h3>
        </div>
      ))}

      <button onClick={handleRating}>Change Rating</button>
    </div>
  );
};

export default StatesComponent;
