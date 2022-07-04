import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import data from "./data";

function Lev({ match }) {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true); // should be true by default
  // eslint-disable-next-line
  const [level, setLevel] = useState(match.params.id);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    let temp = [];
    // eslint-disable-next-line
    let words = data().filter((item) => {
      if (item.level === level) {
        return item;
      }
    });
    if (words.length > 0) {
      setWords(words);
      for (let i = 0; i < words.length; i++) {
        temp.push(true);
      }
      setClosed(temp);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [level]);

  const changeVisibility = (e) => {
    let ind = e.target.parentElement.id;

    let temp = [];
    for (let i = 0; i < closed.length; i++) {
      temp.push(true);
    }

    if (closed[ind]) {
      temp[ind] = false;
      setClosed(temp);
    } else {
      temp[ind] = true;
      setClosed(temp);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="container-sm">
        <span className="inline-content">
          <h2 className="display-2">Level {level}</h2>
          <a href="/#word-list">
            <button className="btn btn-warning">Change Level</button>
          </a>
        </span>
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Word</th>
              <th scope="col" className="sub">
                Overview
              </th>
              {/* <th scope="col">Go to definition</th> */}
            </tr>
          </thead>
          <tbody>
            {words.map((word, index) => (
              <React.Fragment key={word.word}>
                <tr
                  id={index}
                  onClick={(e) => changeVisibility(e)}
                  className={
                    closed[index] ? "table-row" : "table-row clicked-word"
                  }
                >
                  <th scope="row">{index + 1}</th>
                  <td>
                    {/* <a href={`#${index}`} class="black"> */}
                    {word.word}
                    {/* </a> */}
                  </td>
                  <td className="sub">{word.sub}</td>
                </tr>
                <tr
                  id={`def-${index}`}
                  className={closed[index] ? "hide" : "show"}
                >
                  <td colSpan="4">
                    <div className="container-fluid">
                      <i>
                        <p className="lead word-def">{word.short}</p>
                      </i>
                      <p className="lead word-def">{word.long}</p>
                      <span>
                        <a
                          href={`https://www.dictionary.com/browse/${word.word}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success"
                        >
                          More Info
                        </a>{" "}
                        <a
                          href={`https://thesaurus.yourdictionary.com/${word.word}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-warning"
                        >
                          Synonyms
                        </a>
                        <a
                          href={`https://sentence.yourdictionary.com/${word.word}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-danger"
                        >
                          Sentence Usage
                        </a>
                      </span>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <br />
        <br />
      </div>
    );
  }
}

export default Lev;
