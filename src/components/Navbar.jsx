import axios from "axios";
import React, { useEffect, useState } from "react";

function Navbar({ setmovie }) {
  const [text, settext] = useState("");
  

  const changeText = (e) => {
    settext(e.target.value);
  };


  const getMovie = (e) => {
    e.preventDefault();
    if (text === "") {
      return;
    }
    axios
      .get(`https://www.omdbapi.com/?s=${text}&apikey=12380014`)
      .then((res) => {
        setmovie(res.data.Search);
      });
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg  bg-body-tertiary px-5"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand " href="/">
            Movie Search
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Favorites">
                  Favorites
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={getMovie}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={text}
                onChange={changeText}
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
