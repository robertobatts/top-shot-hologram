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
      players: [],
      selectedPlayers: [],
      isDisabled: true
    }
  }

  componentDidMount() {
    webHandlers.getAllPlayers().then(players => this.setState({ players: players }));
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
                      {this.state.players.map((player, i) => <option key={i} value={player.playerName}>{player.playerName}</option>)}
                    </Select>
                  </FormControl>
                  <FormControl variant="filled" className="form-control">
                    <InputLabel htmlFor="filled-datetype-native-simple">Select Date and Type</InputLabel>
                    <Select
                      native
                      value={JSON.stringify(this.state.selectedPlayer)}
                      onChange={(e) => this.handleDateTypeChange(e.target.value)}
                      inputProps={{
                        name: 'datetype',
                        id: 'filled-datetype-native-simple',
                      }}
                    >
                      <option aria-label="None" value="" />
                      {this.state.selectedPlayers.map((selectedPlayer, i) => <option key={i} value={JSON.stringify(selectedPlayer)}>{selectedPlayer.date + " " + selectedPlayer.type}</option>)}
                    </Select>
                  </FormControl>
                  <Button disabled={this.state.isDisabled} onClick={() => this.triggerProcess()} variant="contained" color="primary" style={{ height: "100%" }}>Select</Button>
                </div>
                <div className="cube-container">
                  <Cube selectedCube={this.state.selectedCube} />
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

  handlePlayerNameChange(playerName) {
    var selectedPlayers = [];
    this.state.players.forEach(player => {
      if (playerName === player.playerName) {
        selectedPlayers.push(player);
      }
    })
    this.setState({ selectedPlayers: selectedPlayers });
  }

  handleDateTypeChange(selectedPlayer) {
    if (selectedPlayer) {
      this.setState({ selectedPlayer: JSON.parse(selectedPlayer), isDisabled: false });
    }
  }

  triggerProcess() {
    webHandlers.getTopshotCubeMetadata(this.state.selectedPlayer.playerName, this.state.selectedPlayer.date, this.state.selectedPlayer.type)
      .then(selectedCube => {
        this.setState({ selectedCube: selectedCube, isDisabled: true });
      });
  }
}