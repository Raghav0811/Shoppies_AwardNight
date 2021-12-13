import React from "react";

const NavBar = (props) => {
  return (
    <div className="navbar-container">
      <img
        className="navbar-logo"
        src="shoppies-logo-2.png"
        alt="shoppies-logo"
      />
      <div className="search-bar">
        <form className="search-form" onSubmit={props.fetchMovies}>
          <input
            type="search"
            placeholder="Search movies"
            name="search"
            value={props.query}
            onChange={props.setMovieQuery}
          />
          <button
            className="button-search"
            type="submit"
            disabled={!props.query.length}
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default NavBar;