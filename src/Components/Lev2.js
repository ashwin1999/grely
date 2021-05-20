import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Lev1({ match }) {
  // eslint-disable-next-line
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWords = async () => {
      const def = await axios.get(
        `https://membean-clone.herokuapp.com/level/2`
      );
      // console.log(def.data.words);
      setWords(def.data.words);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    };
    getWords();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h2 className="display-2">Loading Word List...</h2>
      </div>
    );
  } else {
    return (
      <div className="container-sm">
        <span className="inline-content">
          <h2 className="display-2">Level 2</h2>
          <a href="/#word-list">
            <button className="btn btn-success">Change Level</button>
          </a>
        </span>
        <br />
        <br />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Word</th>
              <th scope="col">Overview</th>
              <th scope="col">Go to definition</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{word.word}</td>
                <td>{word.sub}</td>
                <td>
                  <Link className="btn btn-primary" to={`/word/${word.word}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Lev1;
