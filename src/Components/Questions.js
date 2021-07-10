import React, { useState, useEffect } from "react";
import Question from "./Question";

const Questions = ({ allWords, nquestions }) => {
  const [questions, setQuestions] = useState([]);

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

    for (let i = 0; i < nquestions * 4; i += 4) {
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
    setQuestions(questionArr);
    console.log("useEffect-2 just ran");
  }, [allWords, nquestions]);

  return (
    <React.Fragment>
      <br />
      <hr />
      <h4 className="display-4">Questions</h4>
      <br />
      {questions.map((item, index) => (
        <React.Fragment key={index}>
          <Question word={item.word} options={item.options} qindex={index} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default Questions;
