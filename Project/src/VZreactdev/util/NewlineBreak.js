import React from "react";
import ReactHtmlParser from "react-html-parser";

const entityToChar = str => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
};
const NewLineBreak = txt => {
  if (Array.isArray(txt) && txt.length > 1) {
    return txt.map((item, key) => {
      return (
        <span key={key}>
          {ReactHtmlParser(entityToChar(item))}
          <br />
        </span>
      );
    });
  }
  if (txt && Array.isArray(txt) && txt.length == 1) {
    return (
      <span>
        {ReactHtmlParser(entityToChar(txt[0]))}
        <br />
      </span>
    );
  }
  return entityToChar(txt);
};

export default NewLineBreak;
