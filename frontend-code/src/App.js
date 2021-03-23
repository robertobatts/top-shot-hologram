import React from 'react';
import './App.css';
import { Input, Button } from '@material-ui/core';
import Cube from './Cube';
import UploadPage from './UploadPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/upload">
              <UploadPage/>
            </Route>
            <Route path="/">
              <div>
                <div>
                  <Input placeholder="https://nbatopshot.com/moment/hustlewestbrook+73c2eb70-8ff3-4719-99e9-f57edc4196df" onChange={(event) => this.handleLinkInputChange(event.target.value)} />
                  <Button disabled={false} onClick={() => this.triggerProcess()} variant="contained" color="primary">Trigger</Button>
                </div>
                <div className="cube-container">
                  <Cube></Cube>
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

  handleLinkInputChange(newLink) {
    if (newLink !== this.state.link) {
      this.setState({ link: newLink });
    }
  }

  async triggerProcess() {
    console.log(this.state.link);
  }
}

