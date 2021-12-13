import React, { useState, useEffect } from "react";
import Nominations from "./Nominations";
import SearchResults from "./SearchResults";
import NavBar from "./NavBar";
import axios from "axios";

const Main = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [headerText, setHeaderText] = useState("Latest Releases");

  useEffect(() => {
    let storedNominations = localStorage.getItem("nominations");

    if (storedNominations) {
      setNominatedMovies(JSON.parse(storedNominations));
    }
    fetchLatestMovies();
  }, []);

  const fetchLatestMovies = async () => {
    const response = await axios(
      `https://www.omdbapi.com/?s='the'&y=2020&apikey=c8c11022`
    );
    setResults(response.data.Search);
  };

  const isAlreadyNominated = (movie) => {
    let isNominated = false;
    nominatedMovies.forEach((el) => {
      if (el.imdbID === movie.imdbID) {
        isNominated = true;
        return isNominated;
      }
    });
    return isNominated;
  };

  const fetchMovies = async (e) => {
    e.preventDefault();
    const response = await axios(
      `https://www.omdbapi.com/?s=${query}&apikey=c8c11022`
    );
    if (response.data.Error) {
      setError(response.data.Error);
      setHeaderText(response.data.Error);
    } else {
      setResults(
        response.data.Search.map((movie) => {
          return {
            ...movie,
            nominated: false,
          };
        })
      );
      setHeaderText(`Results for "${query}"`);
      setError("");
    }
  };

  const filterSearchResults = (results) => {
    if (results.length) {
      const filteredResults = results.filter((res) => {
        return !isAlreadyNominated(res);
      });
      return filteredResults;
    }
    return results;
  };

  const toggleNomination = (movie) => {
    movie.nominated = !movie.nominated;
    const updatedNominations = movie.nominated
      ? [...nominatedMovies, movie]
      : nominatedMovies.filter((el) => el !== movie);
    setNominatedMovies(updatedNominations);
    localStorage.setItem("nominations", JSON.stringify(updatedNominations));
  };
  const setMovieQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <NavBar
        query={query}
        fetchMovies={fetchMovies}
        setMovieQuery={setMovieQuery}
      />
      <div>
        <Nominations
          nominatedMovies={nominatedMovies}
          toggleNomination={toggleNomination}
          nominationLength={nominatedMovies.length}
        />
      </div>
      <div>
        <SearchResults
          headerText={headerText}
          toggleNomination={toggleNomination}
          nominationLength={nominatedMovies.length}
          results={filterSearchResults(results)}
          error={error}
        />
      </div>
    </div>
  );
};
export default Main;