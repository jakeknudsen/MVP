import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Entries from "./Entries.jsx";
import Journals from "./Journals.jsx";
import styles from "../styles.modules.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journals: [],
      entries: [],
      page: "home",
      user: "guest",
      currentJournal: "",
    };
    this.handleJournalClick = this.handleJournalClick.bind(this);
    this.addNote = this.addNote.bind(this);
    this.returnHome = this.returnHome.bind(this);
    this.createNewJournal = this.createNewJournal.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/journals`)
      .then((result) => {
        this.setState((state) => {
          result.data.forEach((title) => {
            this.state.journals.push(title.name);
          });
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  returnHome() {
    this.setState({
      page: "home",
    });
  }

  addNote(e) {
    const title = e.target.title.value;
    const note = e.target.note.value;
    const newItem = {
      title: title,
      note: note,
    };

    axios.post(`/entries:${JSON.stringify(newItem)}`).then((result) => {});

    this.setState((prevState) => {
      return {
        entries: prevState.entries.concat(newItem),
      };
    });

    // axios
    //   .get(`/entries`)
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    // console.log(this.state);

    e.target.title.value = "";
    e.target.note.value = "";

    e.preventDefault();
  }

  createNewJournal(e) {
    e.preventDefault();
    const projectTitle = e.target.project.value;

    axios
      .post(`/journals:${projectTitle}`)
      .then((result) => {})
      .catch((err) => {
        console.error(err);
      });

    this.setState((prevState) => {
      return {
        journals: prevState.journals.concat(projectTitle),
      };
    });
  }

  handleJournalClick(e) {
    axios
      .get(`/entries`)
      .then((result) => {
        result.data.forEach((notes) => {
          const title = notes.title;
          const note = notes.note;
          const savedNote = {
            title: title,
            note: note,
          };
          this.setState((prevState) => {
            return {
              entries: prevState.entries.concat(savedNote),
            };
          });
        });
      })
      .catch(function (error) {
        console.error(error);
      });

    this.setState({
      page: "entries",
    });
  }

  renderPage() {
    if (this.state.page === "home") {
      return (
        <div className={styles.home}>
          <div className={styles["home-title"]}>
            Please Select a Journal to view
          </div>
          <div className={styles.journals}>
            {this.state.journals.map((journal, index) => {
              return (
                <Journals
                  journal={journal}
                  key={index}
                  onClick={this.handleJournalClick}
                />
              );
            })}
          </div>
          <div onClick={this.createNewJournal}>Create new project</div>
          <form onSubmit={this.createNewJournal}>
            <input id="project" type="text" />
            <input type="submit" value="create" />
          </form>
        </div>
      );
    }
    if (this.state.page === "entries") {
      return (
        <div>
          <Entries
            entries={this.state.entries}
            addNote={this.addNote}
            returnHome={this.returnHome}
          />
        </div>
      );
    }
  }

  render() {
    return <div className="main">{this.renderPage()}</div>;
  }
}

export default App;
