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

    if (answeredRight) {
      onRightAnswer()
    }
  }

  const newQuestion = () => {
    setChoices([]);
    setCorrectAnswerId(null);
    setSelectedAnswerIndex(null);
    setNextStep(null);
  }

  const alreadyAnswered = selectedAnswerIndex !== null;



  return (
    <div className="box-content">
      <img className="box-content__image-decoration" src={adventure} alt="adventure" />
      {correctAnswerId ? <p className="box-content__question">{data[correctAnswerId].capital} is the capital of</p> : ''}
      <AnimatePresence>
        {
          choices.map((answerId, index) => {
            const isSelected =
              selectedAnswerIndex !== null && index === selectedAnswerIndex;

            const answeredRight = answerId === correctAnswerId;

            if (alreadyAnswered && answeredRight) {
              return (
                <div
                  className={`box-content__answer box-content__answer_good`} key={index}
                >
                  {letters[index]} {data[answerId].name}
                </div>
              );
            }

            if (isSelected) {
              return (
                <div
                  className={`box-content__answer ${answeredRight ? "box-content__answer_good" : "box-content__answer_wrong"}`} key={index}
                >
                  {letters[index]} {data[answerId].name}
                </div>
              );
            }

            return (
              <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="box-content__answer" key={index} onClick={() => checkAnswer(answeredRight, index)}>
                {letters[index]} {data[answerId].name}
              </motion.div>
            );
          })
        }

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