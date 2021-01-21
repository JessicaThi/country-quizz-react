import React from 'react'
import adventure from "./../img/adventure.svg"

const Questionaire = ({ data, randomAnswers, correctAnswerIndex, selectedAnswerIndex, chooseAnswer, checkAnswer, nextStep, newQuestion, seeResult }) => {
  return (
    <div className="box-content">
      <img className="box-content__image-decoration" src={adventure} alt="adventure" />
      {correctAnswerIndex ? <p className="box-content__question">{data[correctAnswerIndex].capital} is the capital of</p> : ''}
      {
        randomAnswers.map((answer, index) => {
          const isSelected =
            selectedAnswerIndex !== null && index === selectedAnswerIndex;

          const answeredRight = answer === correctAnswerIndex;

          if (isSelected) {
            return (
              <div
                className={`box-content__answer ${answeredRight ? "box-content__answer_good" : "box-content__answer_wrong"}`} key={index}
                onClick={chooseAnswer(index)}
              >
                {data[answer].name}
              </div>
            );
          }

          return (
            <div className="box-content__answer" key={index} onClick={() => checkAnswer(answeredRight, index)}>
              {data[answer].name}
            </div>
          );
        })
      }
      {nextStep ? <div className="validation"><button className="button__full" onClick={newQuestion}>Next</button></div> : ''}
      {nextStep === false ? <div className="validation"><button className="button__full" onClick={seeResult}>Sorry</button></div> : ''}
    </div>
  );
};

export default Questionaire;