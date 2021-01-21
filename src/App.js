import { useState, useEffect } from "react"
import './scss/styles.scss'
import Quizz from "./components/Quizz";
import Result from "./components/Result"

function App() {
  const [data, setData] = useState('');
  const [randomAnswers, setRandomAnswers] = useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [nextStep, setNextStep] = useState('');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  useEffect(() => {
    if (data) {
      for (var i = 0; randomAnswers.length < 3; i++) {
        var randomNumber = Math.floor(Math.random() * (data.length - 0)) + 0;

        if (randomAnswers.includes(randomNumber)) {
        } else {
          randomAnswers.push(randomNumber);
        }

        if (randomAnswers.length === 3) {
          setCorrectAnswerIndex(randomAnswers[Math.floor(Math.random() * (3 - 0)) + 0])
        }
      }
      setRandomAnswers(randomAnswers);
    }
  }, [data, randomAnswers])

  const checkAnswer = (answeredRight, index) => {
    setSelectedAnswerIndex(index);
    setNextStep(answeredRight);

    if (answeredRight) {
      setCounter(counter + 1);
    } else {
      setCounter(0);
    }
  }

  const newQuestion = () => {
    setRandomAnswers([]);
    setCorrectAnswerIndex(null);
    setSelectedAnswerIndex(null);
    setNextStep('');
  }

  return (
    <main className="App">
      <div className="box">
        <h1 className="title">Country Quizz</h1>
        {(function () {
          if (nextStep === '' || nextStep === 1) {
            return <Quizz />
          } else {
            return <Result />
          }
        })}
      </div>
    </main>
  );
}

export default App;