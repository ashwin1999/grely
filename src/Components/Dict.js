import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dict = () => {
  const [word, setWord] = useState("");
  const [def, setDef] = useState({});
  const [valid, setValid] = useState(false);

  const updateWord = (e) => {
    let temp = e.target.value;
    setWord(temp.toLowerCase());
  };

  useEffect(() => {
    const getMeaning = async (word) => {
      if (word !== "") {
        const def = await axios.get(
          `https://membean-clone.herokuapp.com/word/${word}`
        );
        const syn = def.data;
        if (syn.message !== undefined) {
          setValid(false);
          setDef({});
        } else {
          setValid(true);
          setDef(syn.word);
        }
      }
    };

    getMeaning(word);
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
