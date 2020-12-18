import './scss/styles.scss';
import adventure from "./img/adventure.svg"

function App() {
  return (
    <main className="App">
      <div className="box">
        <h1 className="title">Country Quizz</h1>
        <div className="box-content">
          <img className="box-content__image-decoration" src={adventure} alt="adventure" />
          <p className="box-content__question">Kuala Lumpur is the capital of</p>
          <article className="box-content__answer box-content__answer_wrong">A Vietnam</article>
          <article className="box-content__answer box-content__answer_good">A Vietnam</article>
          <article className="box-content__answer">A Vietnam</article>
          <div className="validation">
            <button className="button__full">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
