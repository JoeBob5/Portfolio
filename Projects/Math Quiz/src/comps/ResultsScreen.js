function ResultsScreen(props){

  return(

    <div className="results-overlay">
      <div className="results-container">
        <h3>Score: {props.score}/10</h3>
        <button onClick={props.handleClick} className="reset-button">Play Again</button>
      </div>
    </div>
  )
}

export default ResultsScreen; 