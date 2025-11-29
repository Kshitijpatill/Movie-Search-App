import axios from "axios";
import React, { useEffect, useState } from "react";

function Hero({ movie, setmovie, addToFavorites, favorites }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios
      .get("https://www.omdbapi.com/?s=Moon&apikey=12380014")
      .then((res) => {
        setmovie(res.data.Search);
      });
  }, []);

  const cardDetails = (imdbID) => {
    axios
      .get(`https://www.omdbapi.com/?i=${imdbID}&apikey=12380014`)
      .then((res) => {
        setSelectedMovie(res.data);
      });
  };

  return (
    <div className="container my-4">
      <div className="row">
        {movie.map((value, index) => {
          return (
            <div className="col-6 col-md-3 my-4">
              <div className="card" style={{ height: "100%" }}>
                <img
                  src={value.Poster}
                  className="card-img-top"
                  onClick={() => cardDetails(value.imdbID)}
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="card-title">{value.Title}</h3>
                  <h6 className="card-text">{value.Year}</h6>
                  {(() => {
                    const isFavorite = favorites.some(
                      (movie) => movie.imdbID === value.imdbID
                    );
                    return (
                      <button
                        href="#"
                        className="btn btn-danger mt-auto my-2 w-50"
                        onClick={() => addToFavorites(value)}
                        disabled={isFavorite}
                      >
                        {isFavorite ? "Added To  \u2665" : "Add To  \u2665"}
                      </button>
                    );
                  })()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedMovie && (
        <div
          className="modal show d-block bg-dark bg-opacity-75  "
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title ">{selectedMovie.Title}</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedMovie(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={selectedMovie.Poster}
                      className="img-fluid rounded"
                      alt={selectedMovie.Title}
                    />
                    {(() => {
                      const isFavorite = favorites.some(
                        (movie) => movie.imdbID === selectedMovie.imdbID
                      );
                      return (
                        <button
                          href="#"
                          className="btn btn-danger my-2  w-50"
                          onClick={() => addToFavorites(selectedMovie)}
                          disabled={isFavorite}
                        >
                          {isFavorite ? "Added To \u2665" : "Add To \u2665"}
                        </button>
                      );
                    })()}
                  </div>
                  <div className="col-md-8">
                    <p>
                      <strong>Genre:</strong> {selectedMovie.Genre}
                    </p>
                    <p>
                      <strong>Released:</strong> {selectedMovie.Released}
                    </p>
                    <p>
                      <strong>Rated:</strong> {selectedMovie.Rated}
                    </p>
                    <p>
                      <strong>Runtime:</strong> {selectedMovie.Runtime}
                    </p>
                    <p>
                      <strong>Director:</strong> {selectedMovie.Director}
                    </p>
                    <p>
                      <strong>Actors:</strong> {selectedMovie.Actors}
                    </p>
                    <p>
                      <strong>Plot:</strong> {selectedMovie.Plot}
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

export default Hero;
