import { useState, useEffect } from "react"
import './scss/styles.scss'
import Questionaire from './components/Questionaire';
import Result from "./components/Result"
import { motion, AnimatePresence } from "framer-motion"

const API_URL = 'https://restcountries.eu/rest/v2/all'

function App() {
  const [data, setData] = useState('');
  const [randomAnswers, setRandomAnswers] = useState([]);
  const [correctAnswerId, setCorrectAnswerId] = useState(null);
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
          setCorrectAnswerId(randomAnswers[Math.floor(Math.random() * (4 - 0)) + 0])
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
    }
  }

  const newQuestion = () => {
    setRandomAnswers([]);
    setCorrectAnswerId(null);
    setSelectedAnswerIndex(null);
    setNextStep('');
  }

  const seeResult = () => {
    setMyResult(true);
  }

  const restart = () => {
    setRandomAnswers([]);
    setCorrectAnswerId(null);
    setSelectedAnswerIndex(null);
    setNextStep('');
    setCounter(0);
    setMyResult(false);
  }

  return (
    <main className="App">
      <div className="box">
        <AnimatePresence key={myResult} exitBeforeEnter>
          {!!randomAnswers.length && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="title">Country Quizz</h1>

            {!myResult && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Questionaire
                  data={data}
                  randomAnswers={randomAnswers}
                  correctAnswerId={correctAnswerId}
                  selectedAnswerIndex={selectedAnswerIndex}
                  checkAnswer={checkAnswer}
                  nextStep={nextStep}
                  seeResult={seeResult}
                  newQuestion={newQuestion}
                />
              </motion.div>
            )}

            {myResult && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Result counter={counter} restart={restart} />
              </motion.div>
            )}
          </motion.div>
          }
        </AnimatePresence>


      </div>
    </main>
  );
}

export default App;