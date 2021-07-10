import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import data from "./data";
import Questions from "./Questions";

const WordGym = () => {
  // const [questions, setQuestions] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState("1");

  useEffect(() => {
    // eslint-disable-next-line
    let temp = data().filter((item) => {
      if (item.level === level) {
        return item;
      }
    });
    setAllWords(temp);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log("useEffect-1 just ran");
  }, [level]);

  return (
    <div className="container-sm">
      <span className="inline-content">
        <h2 className="display-2">Word Gym</h2>
        <a href="/#word-list">
          <button className="btn btn-warning">Back to Home</button>
        </a>
      </span>
      <br />
      <br />
      <h4 className="display-4">Select level</h4>
      <br />
      <select
        name="level"
        onChange={(e) => {
          setLevel(e.target.value);
        }}
        value={level}
        id="level"
        class="form-select form-select-sm"
      >
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
        <option value="4">Level 4</option>
        <option value="5">Level 5</option>
      </select>
      <br />
      {loading ? <Loader /> : <Questions allWords={allWords} nquestions={15} />}
      <br />
    </div>
  );
};

export default WordGym;
