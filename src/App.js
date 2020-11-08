import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import History from "./components/history/history";
import AudioRecorder from "./components/audioRecorder/audioRecorder";
import Transcription from "./components/transcription/transcription";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Call-Центр</h1>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <br />
              <li>
                <Link to={"/history"}> История звонков Kcell </Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path="/history" component={History} />
            <Route path="/AudioRecorder" component={AudioRecorder} />
            <Route path="/Transcription" component={Transcription} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
