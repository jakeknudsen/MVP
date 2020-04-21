import React from "react";


const Note = (props) => {
  return (
    <ul>
      <li>
        {props.val.title} - {props.val.note}
      </li>
    </ul>
  );
};

export default Note;