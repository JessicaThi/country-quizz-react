import { useState, useEffect } from "react"
import './scss/styles.scss'
import adventure from "./img/adventure.svg"

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
        <div className="box-content">
          <img className="box-content__image-decoration" src={adventure} alt="adventure" />
          {correctAnswerIndex ? <p className="box-content__question">{data[correctAnswerIndex].capital} is the capital of</p> : ''}
          {
            randomAnswers.map((answer, index) => {
              const isSelected =
                selectedAnswerIndex !== null && index === selectedAnswerIndex;

              const answeredRight = answer === correctAnswerIndex;

              if (isSelected) {
                return (
                  <div
                    className={`box-content__answer ${answeredRight ? "box-content__answer_good" : "box-content__answer_wrong"}`} key={index}
                    onClick={() => setSelectedAnswerIndex(index)}
                  >
                    {data[answer].name}
                  </div>
                );
              }

              return (
                <div className="box-content__answer" key={index} onClick={() => checkAnswer(answeredRight, index)}>
                  {data[answer].name}
                </div>
              );
            })
          }
          { nextStep ? <div className="validation"><button className="button__full" onClick={() =>   newQuestion()}>Next</button></div> : ''}
        </div>
      </div>
    </main>
  );
}

export default App;
