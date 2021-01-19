import React from 'react'

const NextButton = ({ onPress }) => {
  return (
    <div className="validation">
      <button className="button__full" onClick={onPress}>Next</button>
    </div>
  );
};

export default NextButton