import React from 'react'
import trophy from "./../img/winners.svg"

const Result = ({counter}) => {
  return (
    <div className="box-content box-content__winner">
      <img src={trophy} alt="trophy" />
      <p className="result-title">Results</p>
      <p className="result-text">You got <span className="result-number">{counter}</span> correct answers</p>
      <button className="button__empty">Try again</button>
    </div>
  )
}

export default Result;