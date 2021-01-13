import { useState, useEffect } from "react"
import './scss/styles.scss'
import adventure from "./img/adventure.svg"

function App() {
  const [data, setData] = useState('');
  const [randomNumber, setRandomNumber] = useState('');

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  useEffect(() => {
    if (data) {
      setRandomNumber(Math.floor(Math.random() * (data.length - 0)) + 0);
    }
  }, [data])

  console.log(randomNumber)

  return (
    <main className="App">
      <div className="box">
        <h1 className="title">Country Quizz</h1>
        <div className="box-content">
          <img className="box-content__image-decoration" src={adventure} alt="adventure" />
          {randomNumber ? <p className="box-content__question">{data[randomNumber].capital} is the capital of {randomNumber}</p> : ''}
          <div className="box-content__answer box-content__answer_wrong">A Vietnam</div>
          {randomNumber ? <div className="box-content__answer box-content__answer_good">B {data[randomNumber].name}</div> : ''}
          <div className="box-content__answer">A Vietnam</div>
          <div className="validation">
            <button className="button__full">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
