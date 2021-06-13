import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "./data";

const Dict = () => {
  const [word, setWord] = useState("");
  const [def, setDef] = useState({});
  const [valid, setValid] = useState(false);

  const updateWord = (e) => {
    let temp = e.target.value;
    setWord(temp.toLowerCase());
  };

  useEffect(() => {
    // eslint-disable-next-line
    let final = data().filter((item) => {
      if (word.length > 0) {
        if (item.word.startsWith(word)) {
          return item;
        }
      }
    });
    console.log(final);
    if (final.length > 0) {
      setDef(final[0]);
      setValid(true);
    } else {
      setDef({});
      setValid(false);
    }
  }, [word]);

  return (
    <div>
      <div className="container">
        <span className="inline-content">
          <h1 className="display-1">Dictionary</h1>
          <Link to="/">
            <button className="btn btn-warning">Back to Home</button>
          </Link>
        </span>
        <div className="dict-main">
          <p className="lead large">Search for a word</p>
          <input
            type="text"
            className="word-search"
            onChange={(e) => updateWord(e)}
          />
          <p className="lead small">
            <b>Note:</b> If word exists, it is displayed here. Otherwise it'll
            be empty.
          </p>
          <div className="word-output">
            {valid ? (
              <>
                <p className="lead medium">
                  {def.word} - {def.level} word
                </p>
                <p className="lead">{def.short}</p>
                <br />
                <p className="lead">{def.long}</p>
              </>
            ) : (
              <>
                <p className="lead">
                  Either you haven't typed the full word or the word is invalid
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dict;
