import { useState, useEffect } from "react"
import './scss/styles.scss'
import adventure from "./img/adventure.svg"

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/name/belgium")
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  return (
    <main className="App">
      <div className="box">
        <h1 className="title">Country Quizz</h1>
        <div className="box-content">
          <img className="box-content__image-decoration" src={adventure} alt="adventure" />
          {data ? <p className="box-content__question">{data[0].capital} is the capital of</p> : ''}
          <div className="box-content__answer box-content__answer_wrong">A Vietnam</div>
          <div className="box-content__answer box-content__answer_good">B {data[0].name}</div>
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
