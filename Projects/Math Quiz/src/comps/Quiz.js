import AnswerButton from "./AnswerButton";
import { useState, useEffect } from "react"; 
import ResultsScreen from "./ResultsScreen";

// data 
import QuizButtonControls from "../data/QuizButtonControls"

function Quiz(){

  /*
  ===========
    STATES
  ===========
  */
  
  const[randomQuestion, setRandomQuestion] = useState(null); 
  const[correctAnswer, setCorrectAnswer] = useState(null); 
  const[randomAnswers, setRandomAnswers] = useState([]); 
  const[buttonControls, setButtonControls] = useState(QuizButtonControls);
  const[questionNumber, setQuestionNumber] = useState(1); 
  const[score, setScore] = useState(0); 

  /*
  ========
    DATA
  ========
  */

  function createRandomQuestionAndAnswers(){
    /*
      CREATE QUESTION AND CORRECT ANSWER 
    */
    let a = Math.floor(Math.random() * 10); 
    let b = Math.floor(Math.random() * 10); 
    // Choose a random operator for question //
    const ops = ["+", "-"]; 
    let opsChooser = Math.floor(Math.random() * 2); 
    const randomOp = ops[opsChooser]; 
    // Prevent negative outcomes
    if(a < b){  
      let helper = a;
      a = b; 
      b = helper; 
    }
    // Store question and answer 
    const results = [a + b, a - b]; 
    const question = `${a} ${randomOp} ${b}`;
    const correctAnswer = results[opsChooser];
    setCorrectAnswer(correctAnswer); 
    setRandomQuestion(question); 

    /*
      CREATE WRONG ANSWERS 
    */
    // Using a set prevents duplicates, create a set with 4 elements 
    const set = new Set([correctAnswer]); 
    while(set.size < 4){ 
      const num = Math.floor(Math.random() * 21); 
      set.add(num); 
    }
    // Store wrong answers 
    const result = Array.from(set); 
    shuffleRandomAnswers(result); 
    setRandomAnswers(result); 
  }

  // Using Fisher-Yates algorithm, shuffle elements in array 
  function shuffleRandomAnswers(arr){ 
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const helper = arr[i];
      arr[i] = arr[j];
      arr[j] = helper; 
    }
  }

  // creates a random question and answer 
  useEffect(() => {
    createRandomQuestionAndAnswers();
  }, []);

  // updates the values of each button each time random numbers are created 
  useEffect(() => {
    setButtonControls(prev => {
      return prev.map(button => {
        return {...button, value: randomAnswers[button.id]}
      })
    })
  }, [randomAnswers])

  function checkAnswer(){
    buttonControls.forEach(button => {
      if(button.value == correctAnswer && button.clicked === true){
        setScore(prev => prev + 1); 
      }; 
    })
  }

  /*
  ===========
    DISPLAY
  ===========
  */

  function resetButtons(){
    setButtonControls(prev => {
      return prev.map(button => {
        return {...button, on: false}
      });
    });
  }

  const createButtons = buttonControls.map(button => {
    return <AnswerButton value={ button.value } on={button.on} id={ button.id } key={ button.id } handleClick={ handleClick } /> 
  }); 

  /*
  =================
    INTERACTIVITY
  =================
  */

  // When a button is clicked, it will be turned green and the others will be returned to the defualt color
  function handleClick(id){
    setButtonControls(prev => { 
      return prev.map(button => { 
        return button.id === id ? {...button, on: true, clicked: true} : {...button, on: false, clicked: false} 
      });
    });
  }

  // Reloads the entire application 
  function resetQuiz(){
    window.location.reload(); 
  }

  return(
    <main className="quiz-question-answer-container">
      <section className="question-container">
        { randomQuestion }
      </section>
      <section className="answers-container">
        { createButtons }
      </section>
      <section>
        <button onClick={() => {
          resetButtons(); 
          checkAnswer(); 
          createRandomQuestionAndAnswers();
          setQuestionNumber(prev => prev + 1); 
        } 
         } className="submit-button">Submit</button>
      </section>
      <section>
        {questionNumber > 10 ? <ResultsScreen handleClick={resetQuiz} score={score} /> : null}
      </section>
    </main>
    
  )
}

export default Quiz; 