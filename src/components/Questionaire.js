import React from 'react'
import adventure from "./../img/adventure.svg"
import { motion, AnimatePresence } from "framer-motion"

const Questionaire = ({ data, randomAnswers, correctAnswerId, selectedAnswerIndex, checkAnswer, nextStep, newQuestion, seeResult }) => {
  const alreadyAnswered = selectedAnswerIndex !== null;

  const letters = ['A', 'B', 'C', 'D'];
  return (
    <div className="box-content">
      <img className="box-content__image-decoration" src={adventure} alt="adventure" />
      {correctAnswerId ? <p className="box-content__question">{data[correctAnswerId].capital} is the capital of</p> : ''}
      <AnimatePresence>
        {
          randomAnswers.map((answerId, index) => {
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