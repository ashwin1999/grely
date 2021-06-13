import React from "react";
// import Loader from "./Loader";
import endpoints from "./endpoints";

const Test = () => {
  return (
    <div>
      <button
        onClick={() => {
          console.log(endpoints());
        }}
      >
        YO YO YO!
      </button>
    </div>
  );
};

export default Test;
