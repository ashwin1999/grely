import React, { useState, useEffect } from "react";

const Questions = ({ allWords, nquestions }) => {
  const [questions, setQuestions] = useState([]);
  const [showAns, setShowAns] = useState([]);

  useEffect(() => {
    // get (nquestions x 4) random index values ranging from 0 to (max-1)
    const generateRandomIndices = (total, maxLength) => {
      let arr = [];
      while (arr.length < total) {
        let r = Math.floor(Math.random() * maxLength) + 1;
        arr.push(r);
      }
      return arr;
    };

    // shuffle the options
    const shuffleArray = (arr) => {
      for (var i = arr.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
      }
      return arr;
    };

    let randomIndices = generateRandomIndices(nquestions * 4, allWords.length);
    let questionArr = [];
    let showAnswer = [];

    for (let i = 0; i < nquestions * 4; i += 4) {
      showAnswer.push(false);
      let temp = allWords[randomIndices[i]];
      let options = [
        { value: allWords[randomIndices[i]].sub, correct: true },
        { value: allWords[randomIndices[i + 1]].sub, correct: false },
        { value: allWords[randomIndices[i + 2]].sub, correct: false },
        { value: allWords[randomIndices[i + 3]].sub, correct: false },
      ];
      questionArr.push({
        word: temp.word,
        meaning: temp.sub,
        options: shuffleArray(options),
      });
    }

    setShowAns(showAnswer);
    setQuestions(questionArr);
    console.log("useEffect-2 just ran");
  }, [allWords, nquestions]);

  const toggleAnswer = (index) => {
    let temp = [];
    for (let i = 0; i < nquestions; i++) {
      temp.push(showAns[i]);
    }
    if (temp[index]) {
      temp[index] = false;
      setShowAns(temp);
    } else {
      temp[index] = true;
      setShowAns(temp);
    }
    console.log(`button ${index + 1} clicked. new Ans: ${showAns}`);
  };

  return (
    <React.Fragment>
      <h4 className="display-4">Questions</h4>
      <br />
      {questions.map((item, index) => (
        <React.Fragment key={index}>
          <h3>
            {index + 1}) {item.word}
          </h3>
          <p
            className={
              showAns[index] && item.options[0].correct ? "lead red" : "lead"
            }
          >
            a. <span>{item.options[0].value}</span>
          </p>
          <p
            className={
              showAns[index] && item.options[1].correct ? "lead red" : "lead"
            }
          >
            b. <span>{item.options[1].value}</span>
          </p>
          <p
            className={
              showAns[index] && item.options[2].correct ? "lead red" : "lead"
            }
          >
            c. <span>{item.options[2].value}</span>
          </p>
          <p
            className={
              showAns[index] && item.options[3].correct ? "lead red" : "lead"
            }
          >
            d. <span>{item.options[3].value}</span>
          </p>
          <button
            className={`ansBtn btn ${
              showAns[index] ? "btn-warning" : "btn-primary"
            }`}
            onClick={() => toggleAnswer(index)}
          >
            {`${showAns[index] ? "Hide" : "Show Answer"}`}
          </button>
          <br />
          <br />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default Questions;
