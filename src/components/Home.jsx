import axios from "axios";
import React, { useEffect, useState } from "react";


const heroList = [
  "The Last of Us",
  "Inception",
  "Interstellar",
  "The Dark Knight",
];
function Home({ movie, setmovie, addToFavorites, favorites }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://www.omdbapi.com/?t=${heroList[featuredIndex]}&apikey=12380014`
      )
      .then((res) => {
        setFeaturedMovie(res.data);
      });

    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % heroList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredIndex]);

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?s=Moon&page=${page}&apikey=12380014`)
      .then((res) => {
        if (res.data.Search) {
          setmovie(res.data.Search);
          setTotalResults(parseInt(res.data.totalResults));
        }
      });
  }, [setmovie, page]);

  const cardDetails = (imdbID) => {
    axios
      .get(`https://www.omdbapi.com/?i=${imdbID}&apikey=12380014`)
      .then((res) => {
        setSelectedMovie(res.data);
      });
  };

  const handleNext = () => {
    if (page * 10 < totalResults) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      {featuredMovie && (
        <div
          className="hero-section d-flex align-items-center mb-5"
          style={{
            height: "75vh",
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url(${featuredMovie.Poster})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            transition: "background-image 0.8s ease-in-out",
          }}
        >
          <div className="container position-relative">
            <div className="row">
              <div className="col-md-6">
                <h1 className="display-3 fw-bold mb-3">
                  {featuredMovie.Title}
                </h1>
                <div className="d-flex gap-3 mb-3 text-secondary">
                  <span>{featuredMovie.Year}</span>
                  <span>{featuredMovie.Rated}</span>
                  <span className="text-warning">
                    IMDb {featuredMovie.imdbRating}
                  </span>
                </div>
                <p className="lead mb-4 text-light-50">{featuredMovie.Plot}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-light btn-lg px-4 fw-bold">
                    <i className="fa-solid fa-play me-2"></i> PLAY
                  </button>
                  <button
                    className="btn btn-outline-light btn-lg px-4"
                    onClick={() => cardDetails(featuredMovie.imdbID)}
                  >
                    DETAILS
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 justify-content-center start-0  d-flex gap-2">
              {heroList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setFeaturedIndex(idx)}
                  className={`btn rounded-circle p-1 ${
                    featuredIndex === idx ? "btn-danger" : "btn-outline-light"
                  }`}
                  style={{ width: "12px", height: "12px" }}
                ></button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container pb-5">
        <h2 className="mb-4 border-start border-danger border-4 ps-3">
          Explore Movies
        </h2>
        <div className="row">
          {movie &&
            movie.map((value, index) => (
              <div
                className="col-6 col-md-4 col-lg-3 my-3"
                key={value.imdbID || index}
              >
                <div className="card h-100 bg-dark border-secondary text-white shadow-sm overflow-hidden movie-card">
                  <div style={{ height: "400px", overflow: "hidden" }}>
                    <img
                      src={
                        value.Poster !== "N/A"
                          ? value.Poster
                          : "https://via.placeholder.com/400x600?text=No+Image"
                      }
                      className="card-img-top h-100 w-100"
                      alt={value.Title}
                      style={{
                        objectFit: "cover",
                        cursor: "pointer",
                        transition: "transform 0.3s",
                      }}
                      onClick={() => cardDetails(value.imdbID)}
                    />
                  </div>
                  <div className="card-body d-flex flex-column bg-black bg-opacity-50">
                    <h6 className="card-title text-truncate mb-1">
                      {value.Title}
                    </h6>
                    <p className="card-text small text-secondary mb-3">
                      {value.Year}
                    </p>
                    {(() => {
                      const isFavorite = favorites.some(
                        (fav) => fav.imdbID === value.imdbID
                      );
                      return (
                        <button
                          className={`btn btn-sm mt-auto ${
                            isFavorite
                              ? "btn-outline-danger disabled"
                              : "btn-danger"
                          }`}
                          onClick={() => addToFavorites(value)}
                        >
                          {isFavorite ? "In Favorites" : "Add to \u2665"}
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="d-flex justify-content-center align-items-center gap-4 mt-5">
          <button
            className="btn btn-outline-light px-4"
            onClick={handlePrev}
            disabled={page === 1}
          >
            &laquo; Previous
          </button>
          <span className="fw-bold text-secondary">
            Page <span className="text-white">{page}</span> of{" "}
            {Math.ceil(totalResults / 10)}
          </span>
          <button
            className="btn btn-outline-light px-4"
            onClick={handleNext}
            disabled={page * 10 >= totalResults}
          >
            Next &raquo;
          </button>
        </div>
      </div>

      {selectedMovie && (
        <div className="modal show d-block bg-dark bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-secondary">
              <div className="modal-header border-secondary">
                <h3 className="modal-title">{selectedMovie.Title}</h3>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedMovie(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 text-center">
                    <img
                      src={selectedMovie.Poster}
                      className="img-fluid rounded mb-3 shadow"
                      alt={selectedMovie.Title}
                    />
                    <button
                      className="btn btn-danger w-100 mt-2"
                      onClick={() => addToFavorites(selectedMovie)}
                      disabled={favorites.some(
                        (fav) => fav.imdbID === selectedMovie.imdbID
                      )}
                    >
                      {favorites.some(
                        (fav) => fav.imdbID === selectedMovie.imdbID
                      )
                        ? "In Favorites"
                        : "Add to \u2665"}
                    </button>
                  </div>
                  <div className="col-md-8">
                    <p className="text-secondary">
                      {selectedMovie.Genre} • {selectedMovie.Runtime} •{" "}
                      {selectedMovie.Released}
                    </p>
                    <p>
                      <strong>Plot:</strong> {selectedMovie.Plot}
                    </p>
                    <hr className="border-secondary" />
                    <p>
                      <strong>Director:</strong> {selectedMovie.Director}
                    </p>
                    <p>
                      <strong>Actors:</strong> {selectedMovie.Actors}
                    </p>
                    <p>
                      <strong>Awards:</strong> {selectedMovie.Awards}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
