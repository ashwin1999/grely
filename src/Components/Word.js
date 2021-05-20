import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Word = ({ match }) => {
  const [def, setDef] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDefinition = async (word) => {
      const def = await axios.get(
        `https://membean-clone.herokuapp.com/word/${word}`
      );
      // console.log(def.data.word);
      setDef(def.data.word);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    getDefinition(match.params.word);
  }, [match.params.word]);

  if (loading) {
    return (
      <div className="container-sm">
        <h3 className="display-3">Loading word...</h3>
      </div>
    );
  } else {
    return (
      <div className="boxed">
        <div className="container-sm">
          <h1 className="display-1">
            {def.word} <span className="muted">({def.level} word)</span>
          </h1>
          <br />
          <br />
          <i>
            <p className="lead word-def">{def.short}</p>
          </i>
          <br />
          <p className="lead word-def">{def.long}</p>
          <br />
          <br />
          <Link to={`/${def.level.replace(" ", "")}`}>
            <button className="btn btn-dark">Back to List</button>
          </Link>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
};

export default Word;
