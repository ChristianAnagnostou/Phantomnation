import React from "react";
import { Link } from "react-router-dom";

function Wordlist({ words }) {
  return (
    <ul className="words">
      {words.map((word) => {
        return (
          <Link to={`/${word.wordId}`} key={word.wordId}>
            <li className="word-item">
              <span className="word-text">{word.word.toUpperCase()}</span> -{" "}
              <span className="word-def">{word.def}</span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}

export default Wordlist;
