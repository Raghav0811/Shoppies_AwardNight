import React from 'react'

const MovieCard = props => {
  const setButtonText = movie => {
    return movie.nominated ? 'Remove Nomination' : 'Nominate'
  }

  const setDisabled = movie => {
    return !movie.nominated && props.nominationLength >= 5
  }

  const setButtonClassName = movie => {
    return movie.nominated ? 'remove-nomination-button' : 'nominate-button'
  }
  return (
    <div className='movie-card'>
      <div className='movie-img-container'>
        <img
          className='movie-img'
          src={props.movie.Poster}
          alt={props.movie.Title}
          onError={e => {
            e.target.onerror = null
            e.target.src = './404-image.png'
          }}
        />
      </div>
      <p className='movie-title'>{props.movie.Title}</p>
      <p>{props.movie.Year}</p>
      <button
        className={setButtonClassName(props.movie)}
        disabled={setDisabled(props.movie)}
        onClick={() => props.toggleNomination(props.movie)}
      >
        {setButtonText(props.movie)}
      </button>
    </div>
  )
}

export default MovieCard