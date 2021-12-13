import React from 'react'
import MovieCard from './MovieCard'

const SearchResults = props => {
  const filterMovies = allResults => {
    return allResults.filter(result => !result.nominated)
  }
  return (
    <div>
      <h2>{props.headerText}</h2>
      <div className='movie-list'>
        {!props.error &&
          filterMovies(props.results).map(movie => {
            return (
              <MovieCard
                key={movie.imdbID}
                nominationLength={props.nominationLength}
                toggleNomination={props.toggleNomination}
                movie={movie}
              />
            )
          })}
      </div>
    </div>
  )
}

export default SearchResults