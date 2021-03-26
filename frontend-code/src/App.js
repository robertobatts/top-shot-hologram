import React from 'react';
import './App.css';
import { Input, Button, FormControl, InputLabel, Select } from '@material-ui/core';
import Cube from './Cube';
import UploadPage from './UploadPage';
import webHandlers from './utils/webHandlers';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mediaIdsPerCube: [["", "", "", "", "", ""]],
      cubeIdx: 0,
      playerNames: []
    }
  }

  componentDidMount() {
    webHandlers.getAllPlayerNames().then(playerNames => this.setState({playerNames: playerNames}));
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/upload">
              <UploadPage />
            </Route>
            <Route path="/">
              <div>
                <div className="select-player-container">
                  <FormControl variant="filled" className="form-control">
                    <InputLabel htmlFor="filled-player-native-simple">Select Player</InputLabel>
                    <Select
                      native
                      value={this.state.playerName}
                      onChange={(e) => this.handlePlayerNameChange(e.target.value)}
                      inputProps={{
                        name: 'playerName',
                        id: 'filled-player-native-simple',
                      }}
                    >
                      <option aria-label="None" value="" />
                      {this.state.playerNames.map((playerName, i) => <option key={i} value={playerName}>{playerName}</option>)}
                    </Select>
                  </FormControl>
                  <Button disabled={!this.state.playerName} onClick={() => this.triggerProcess()} variant="contained" color="primary" style={{height: "100%"}}>Select</Button>
                </div>
                <div className="cube-container">
                  <Cube mediaIds={this.state.mediaIdsPerCube[this.state.cubeIdx]} />
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

  handlePlayerNameChange(playerName) {
    if (playerName !== this.state.playerName) {
      this.setState({ "playerName": playerName });
    }
  }

  triggerProcess() {
    webHandlers.getCubeMediaIds(this.state.playerName).then(mediaIdsPerCube => {
      this.setState({ "mediaIdsPerCube": mediaIdsPerCube });
    });
  }
}

