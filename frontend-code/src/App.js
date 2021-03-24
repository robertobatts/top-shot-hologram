import React from 'react';
import './App.css';
import { Input, Button } from '@material-ui/core';
import Cube from './Cube';
import UploadPage from './UploadPage';
import webHandlers from './utils/webHandlers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Engine, Scene } from 'react-babylonjs'
import { ArcRotateCamera, MeshBuilder, HemisphericLight, Vector3, Mesh, StandardMaterial, Color3, VideoTexture, Texture } from '@babylonjs/core';



export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mediaIdsPerCube: [["", "", "", "", "", ""]],
      cubeIdx: 0
    }
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
                  <Input placeholder="Player Name" onChange={(e) => this.handlePlayerNameChange(e.target.value)} />
                  <Button disabled={!this.state.playerName} onClick={() => this.triggerProcess()} variant="contained" color="primary">Trigger</Button>
                </div>
                <div className="cube-container">
                  <Cube mediaIds={this.state.mediaIdsPerCube[this.state.cubeIdx]}/>
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
      this.setState({"mediaIdsPerCube": mediaIdsPerCube });
    });
  }
}

