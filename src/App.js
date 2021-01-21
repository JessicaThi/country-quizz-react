import { useState, useEffect } from "react"
import './scss/styles.scss'
import Questionaire from './components/Questionaire';
import Result from "./components/Result"

const API_URL = 'https://restcountries.eu/rest/v2/all'

function App() {
  const [data, setData] = useState('');
  const [randomAnswers, setRandomAnswers] = useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [nextStep, setNextStep] = useState('');
  const [counter, setCounter] = useState(0);
  const [myResult, setMyResult] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  useEffect(() => {
    if (data) {
      for (var i = 0; randomAnswers.length < 4; i++) {
        var randomNumber = Math.floor(Math.random() * (data.length - 0)) + 0;

        if (randomAnswers.includes(randomNumber)) {
        } else {
          randomAnswers.push(randomNumber);
        }

        if (randomAnswers.length === 4) {
          setCorrectAnswerIndex(randomAnswers[Math.floor(Math.random() * (4 - 0)) + 0])
        }
      }
      setRandomAnswers(randomAnswers);
    }
  }, [data, randomAnswers])

  const chooseAnswer = (index) => {
    setSelectedAnswerIndex(index)
  }

  const checkAnswer = (answeredRight, index) => {
    setSelectedAnswerIndex(index);
    setNextStep(answeredRight);

    if (answeredRight) {
      setCounter(counter + 1);
    }
  }

  const newQuestion = () => {
    setRandomAnswers([]);
    setCorrectAnswerIndex(null);
    setSelectedAnswerIndex(null);
    setNextStep('');
  }

  const seeResult = () => {
    setMyResult(true);
  }

  const restart = () => {
    setRandomAnswers([]);
    setCorrectAnswerIndex(null);
    setSelectedAnswerIndex(null);
    setNextStep('');
    setCounter(0);
    setMyResult(false);
  }

  return (
    <main className="App">
      <div className="box">
        <h1 className="title">Country Quizz</h1>
        {(function () {
          if (!myResult) {
            return <Questionaire 
                    data={data} 
                    randomAnswers={randomAnswers} 
                    correctAnswerIndex={correctAnswerIndex} 
                    selectedAnswerIndex={selectedAnswerIndex}
                    chooseAnswer={chooseAnswer} 
                    checkAnswer={checkAnswer} 
                    nextStep={nextStep}
                    seeResult={seeResult}
                    newQuestion={newQuestion} 
                  />
          } else {
            return <Result counter={counter} restart={restart} />
          }
        })()}
      </div>
    </main>
  );
}

export default App;