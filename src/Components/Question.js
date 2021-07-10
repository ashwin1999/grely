import React, { useState } from "react";

const Question = ({ word, options, qindex }) => {
  const [toggleAnswer, setToggleAnswer] = useState(false);
  // eslint-disable-next-line
  const [optionIds, setOptionIds] = useState(["a. ", "b. ", "c. ", "d. "]);
  return (
    <div>
      <h3>
        {qindex + 1}) {word}
      </h3>

      {options.map((item, index) => (
        <React.Fragment key={index}>
          <p className={toggleAnswer && item.correct ? "lead red" : "lead"}>
            {optionIds[index]}
            <span>{item.value}</span>
          </p>
        </React.Fragment>
      ))}
      <button
        className={`ansBtn btn ${toggleAnswer ? "btn-dark" : "btn-light"}`}
        onClick={() => setToggleAnswer(!toggleAnswer)}
      >
        {`${toggleAnswer ? "Hide" : "Show Answer"}`}
      </button>
      <br />
      <br />
    </div>
  );
};

export default Question;
