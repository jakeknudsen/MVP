import React from "react";

const Journals = (props) => {
  return <div onClick={props.onClick}>{props.journal}</div>;
};

export default Journals;
