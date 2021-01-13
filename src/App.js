import { useState, useEffect } from "react"
import './scss/styles.scss'
import adventure from "./img/adventure.svg"

function App() {
  const [data, setData] = useState('');
  const [randomNumber, setRandomNumber] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  useEffect(() => {
    if (data) {
      setRandomNumber(Math.floor(Math.random() * (data.length - 0)) + 0);

      var randomAnswers = [...Array(3)].map(() => Math.floor(Math.random() * (data.length - 0)) + 0);
      setItems(randomAnswers);

      setCorrectAnswer(randomAnswers[Math.floor(Math.random() * 3)]);
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
          { items ?
            items.map(item => (
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
