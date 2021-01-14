import { useState, useEffect } from "react"
import './scss/styles.scss'
import adventure from "./img/adventure.svg"

function App() {
  const [data, setData] = useState('');
  const [randomAnswers, setRandomAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  useEffect(() => {
    if (data) {
      // var randomAnswers = [...Array(3)].map(() => Math.floor(Math.random() * (4 - 0)) + 0);
      //var randomAnswers = [1, 1, 3, 4, 3, 2];

      for (var i = 0; randomAnswers.length < 3; i++) {
        var randomNumber = Math.floor(Math.random() * (data.length - 0)) + 0;
        console.log(randomNumber)

        if (randomAnswers.includes(randomNumber)) {
          console.log("nope")
        } else {
          randomAnswers.push(randomNumber);
        }

        if (randomAnswers.length === 3) {
          setCorrectAnswer(randomAnswers[Math.floor(Math.random() * (3 - 0)) + 0])
        }
      }
      setRandomAnswers(randomAnswers);
    }
  }, [data])

  return (
    <main className="App">
      <div className="box">
        <h1 className="title">Country Quizz</h1>
        <div className="box-content">
          <img className="box-content__image-decoration" src={adventure} alt="adventure" />
          {correctAnswer ? <p className="box-content__question">{data[correctAnswer].capital} is the capital of {correctAnswer}</p> : ''}
          {/*<div className="box-content__answer box-content__answer_wrong">A Vietnam</div>
          {randomNumber ? <div className="box-content__answer box-content__answer_good">B {data[randomNumber].name}</div> : ''}
          <div className="box-content__answer">A Vietnam</div> */}
          {correctAnswer ?
            randomAnswers.map((item, index) => (
              <div className="box-content__answer" key={item}>{data[item].name}</div>
            )) : ''
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
