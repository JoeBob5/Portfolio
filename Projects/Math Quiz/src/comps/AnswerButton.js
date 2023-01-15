function AnswerButton(props){

  const styles = {
    backgroundColor: props.on ? "green" : "rgba(220, 220, 220, 0.7)"
  } 
  return(

    <button style={styles} className="answer-button" onClick={ () => props.handleClick(props.id) }>
      { props.value }
    </button>
  )
}

export default AnswerButton; 