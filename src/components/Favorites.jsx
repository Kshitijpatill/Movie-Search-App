import React from "react";

function Favorites({ favorites }) {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">My Favorite Movies</h2>
      <div className="row">
        {favorites && favorites.length > 0 ? (
          favorites.map((value, index) => {
            return (
              <div className="col-6 col-md-3 my-4" key={index}>
                <div className="card" style={{ height: "100%" }}>
                  <img
                    src={value.Poster}
                    className="card-img-top"
                    alt={value.Title}
                  />
                  <div className="card-body d-flex flex-column">
                    <h3 className="card-title">{value.Title}</h3>
                    <h6 className="card-text">{value.Year}</h6>
                  </div>{" "}
                  <button
                    href="#"
                    className="btn btn-danger mt-auto my-2 w-auto"
                    // onClick={() => addToFavorites(value)}
                  >
                    Remove from &hearts;
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12 text-center">
            <p>You haven't added any favorites yet!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
