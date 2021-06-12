import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

function Lev({ match }) {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [level, setLevel] = useState(match.params.id);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const getWords = async () => {
      const def = await axios.get(
        `https://membean-clone.herokuapp.com/level/${level}`
      );

      setWords(def.data.words);

      let temp = [];
      for (let i = 0; i < def.data.length; i++) {
        temp.push(true);
      }
      setClosed(temp);

      setTimeout(() => {
        setLoading(false);
      }, 100);
    };
    getWords();
  }, [level]);

  const changeVisibility = (e) => {
    let ind = e.target.parentElement.id;
    console.log(`tr pressed: ${ind}`);

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
                  <td>{word.word}</td>
                  <td className="sub">{word.sub}</td>
                  {/* <td>
                    <button
                      onClick={(e) => changeVisibility(e)}
                      className={
                        closed[index] ? "btn btn-success" : "btn btn-dark big"
                      }
                      id={index}
                    >
                      View
                    </button>
                  </td> */}
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
