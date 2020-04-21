import React from "react";
import styles from "../styles.modules.css";
import Note from "./Note.jsx";

const Entries = (props) => {
  return (
    <div>
      <div className={styles.notes}>
        <header>
          <h1>Project Notes</h1>
        </header>
        {props.entries.map((val, index) => {
          return <Note val={val} key={index} />;
        })}

        <footer>
          <form onSubmit={props.addNote}>
            <input
              id="title"
              type="text"
              placeholder="Title of note..."
              onSubmit={props.addNote}
            />
            <textarea
              id="note"
              placeholder="Start writting notes..."
              onSubmit={props.addNote}
            />
            <input type="submit" value="submit" />
          </form>
        </footer>
      </div>
      {/* <div className={styles["create-new-note"]}>
        <div className={styles["new-note"]}>New note</div>
        <svg
          className={styles.plus}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z" />
        </svg>
      </div> */}
      <div onClick={props.returnHome} className={styles['home-button']}>return home</div>
    </div>
  );
};

export default Entries;
