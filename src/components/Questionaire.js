import React, { useState, useEffect } from 'react'
import adventure from "./../img/adventure.svg"
import { motion, AnimatePresence } from "framer-motion"

const API_URL = 'https://restcountries.eu/rest/v2/all'
const letters = ['A', 'B', 'C', 'D'];

const Questionaire = ({ seeResult, onRightAnswer }) => {
  const [data, setData] = useState(null);
  const [choices, setChoices] = useState([]);
  const [correctAnswerId, setCorrectAnswerId] = useState(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [nextStep, setNextStep] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  useEffect(() => {
    if (data) {
      for (let i = 0; choices.length < 4; i++) {
        let randomNumber = Math.floor(Math.random() * (data.length - 0)) + 0;

        if (choices.includes(randomNumber)) {
        } else {
          choices.push(randomNumber);
        }

        if (choices.length === 4) {
          setCorrectAnswerId(choices[Math.floor(Math.random() * (4 - 0)) + 0])
        }
      }
      setChoices(choices);
    }
  }, [data, choices])

  const checkAnswer = (answeredRight, index) => {
    setSelectedAnswerIndex(index);
    setNextStep(answeredRight);
    setIsDisabled(true);

    if (answeredRight) {
      onRightAnswer()
    }
  }

  const newQuestion = () => {
    setChoices([]);
    setCorrectAnswerId(null);
    setSelectedAnswerIndex(null);
    setNextStep(null);
    setIsDisabled(false);
  }

  const alreadyAnswered = selectedAnswerIndex !== null;



  return (
    <div className="box-content">
      <img className="box-content__image-decoration" src={adventure} alt="adventure" />
      {correctAnswerId ? <p className="box-content__question">{data[correctAnswerId].capital} is the capital of</p> : ''}
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {
            choices.map((answerId, index) => {
              const isSelected =
                selectedAnswerIndex !== null && index === selectedAnswerIndex;

              const answeredRight = answerId === correctAnswerId;

              if (alreadyAnswered && answeredRight) {
                return (
                  <button
                    className={`box-content__answer box-content__answer_good`} key={index} disabled={isDisabled}
                  >
                    <p><span>{letters[index]}</span> {data[answerId].name}</p>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </button>
                );
              }

              if (isSelected) {
                return (
                  <button
                    className={`box-content__answer ${answeredRight ? "box-content__answer_good" : "box-content__answer_wrong"}`} key={index} disabled={isDisabled}
                  >
                    <p><span>{letters[index]}</span> {data[answerId].name}</p>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </button>
                );
              }

              return (
                <motion.button initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="box-content__answer" key={index} onClick={() => checkAnswer(answeredRight, index)}
                  disabled={isDisabled}
                >
                  <p><span>{letters[index]}</span> {data[answerId].name}</p>
                </motion.button>
              );
            })
          }
        </motion.div>

        {nextStep ? <motion.div initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} className="validation"><button className="button__full" onClick={newQuestion}>Next</button></motion.div> : ''}
        {nextStep === false ? <motion.div initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} className="validation"><button className="button__full" onClick={seeResult}>Sorry</button></motion.div> : ''}

      </AnimatePresence>
    </div>
  );
};

export default Questionaire;