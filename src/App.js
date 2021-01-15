import { useState, useEffect } from "react"
import './scss/styles.scss'
import adventure from "./img/adventure.svg"

function App() {
  const [data, setData] = useState('');
  const [randomAnswers, setRandomAnswers] = useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  useEffect(() => {
    if (data) {
      for (var i = 0; randomAnswers.length < 3; i++) {
        var randomNumber = Math.floor(Math.random() * (data.length - 0)) + 0;
        console.log(randomNumber)

        if (randomAnswers.includes(randomNumber)) {
          console.log("nope")
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


  return (
    <main className="App">
      <div className="box">
        <h1 className="title">Country Quizz</h1>
        <div className="box-content">
          <img className="box-content__image-decoration" src={adventure} alt="adventure" />
          {correctAnswerIndex ? <p className="box-content__question">{data[correctAnswerIndex].capital} is the capital of</p> : ''}
          {
            randomAnswers.map((answer, index) => {

              console.log(correctAnswerIndex + " answer " + selectedAnswerIndex)
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
                <div className="box-content__answer" key={index} onClick={() => setSelectedAnswerIndex(index)}>
                  {data[answer].name}
                </div>
              );
            })
          }
          <div className="validation">
            <button className="button__full">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
