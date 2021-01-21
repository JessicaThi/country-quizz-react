import React from 'react'
import trophy from "./../img/winners.svg"

const Result = ({counter, restart}) => {
  return (
    <div className="box-content box-content__winner">
      <img src={trophy} alt="trophy" />
      <p className="result-title">Results</p>
      <p className="result-text">You got <span className="result-number">{counter}</span> correct answers</p>
      <button className="button__empty" onClick={restart}>Try again</button>
    </div>
  )
}

export default Result;