import { useState, useEffect } from "react"
import './scss/styles.scss'
import Questionaire from './components/Questionaire';
import Result from "./components/Result"
import { motion, AnimatePresence } from "framer-motion"


function App() {
  const [counter, setCounter] = useState(0);
  const [myResult, setMyResult] = useState(false);

  const seeResult = () => {
    setMyResult(true);
  }

  const incrementCounter = () => setCounter(counter + 1)

  const restart = () => {
    setCounter(0);
    setMyResult(false);
  }

  return (
    <main className="App">
      <div className="box">
        <AnimatePresence key={myResult} exitBeforeEnter>
          {/* TODO handle loading answer `` */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="title">Country Quizz</h1>

            {!myResult && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Questionaire seeResult={seeResult}
                  onRightAnswer={incrementCounter}
                />
              </motion.div>
            )}

            {myResult && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Result counter={counter} restart={restart} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>


      </div>
    </main>
  );
}

export default App;