import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Home";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Favorites from "./components/Favorites";

function App() {
  const [movie, setmovie] = useState([]);
  const [favorites, setfavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const addToFavorites = (movieToAdd) => {
    if (!favorites.some((movie) => movie.imdbID === movieToAdd.imdbID)) {
      const newFavorites = [...favorites, movieToAdd];
      setfavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      alert("This movie is already in your favorites");
    }
  };

  const removeFromFavorites = (movieToRemove) => {
    const newFavorites = favorites.filter(
      (movie) => movie.imdbID !== movieToRemove.imdbID
    );
    setfavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };


  return (
    <Router>
      <Navbar setmovie={setmovie} />
      <Routes>
        <Route
          path="/"
          element={
            <Hero
              movie={movie}
              setmovie={setmovie}
              addToFavorites={addToFavorites}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
