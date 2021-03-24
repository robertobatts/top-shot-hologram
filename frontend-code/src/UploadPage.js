import React from 'react';
import './App.css';
import { Input, Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import webHandlers from './utils/webHandlers';


export default class UploadPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = { isUploadDisabled: true}
  }

  render() {
    return (
      <div>
        <Input placeholder="Player Name" onChange={(event) => this.handlePlayerNameChange(event.target.value)} />
        <div>
          <Button variant="contained" color={ this.state.video == null ? "default" : "primary"} component="label">
            Choose Video
            <input type="file" hidden onChange={(e) => this.handleChangeVideo(e)} />
          </Button>
          <Button variant="contained" color={ this.state.photo1 == null ? "default" : "primary"} component="label">
            Choose Photo 1
            <input type="file" hidden onChange={(e) => this.handleChangePhoto1(e)} />
          </Button>
          <Button variant="contained" color={ this.state.photo2 == null ? "default" : "primary"} component="label">
            Choose Photo 2
            <input type="file" hidden onChange={(e) => this.handleChangePhoto2(e)} />
          </Button>
          <Button variant="contained" color={ this.state.photo3 == null ? "default" : "primary"} component="label">
            Choose Photo 3
            <input type="file" hidden onChange={(e) => this.handleChangePhoto3(e)} />
          </Button>
          <Button variant="contained" color={ this.state.photo4 == null ? "default" : "primary"} component="label">
            Choose Photo 4
            <input type="file" hidden onChange={(e) => this.handleChangePhoto4(e)} />
          </Button>
          <Button variant="contained" color={ this.state.photo5 == null ? "default" : "primary"} component="label">
            Choose Photo 5
            <input type="file" hidden onChange={(e) => this.handleChangePhoto5(e)} />
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            disabled={this.state.isUploadDisabled}
            onClick={() => this.upload()}
          >
            Upload
          </Button>
        </div>
        <div>
          {this.state.success && "Files uploaded successfully"}
        </div>
        <div>
          {this.state.success === false && "Files uploading failed"}
        </div>
      </div>
    );
  }

  updateUploadDisabled() {
    var disabled = this.state.photo1 == null || this.state.photo2 == null || this.state.photo3 == null || this.state.photo4 == null ||
      this.state.photo5 == null || this.state.video == null || this.state.playerName == null;
    this.setState({ isUploadDisabled: disabled });
    console.log(this.state)
  }

  upload() {
    var files = [this.state.video, this.state.photo1, this.state.photo2, this.state.photo3, this.state.photo4, this.state.photo5]
    webHandlers.postTopShots(this.state.playerName, files);
    //TODO set success
  }

  handlePlayerNameChange(playerName) {
    this.setState({ "playerName": playerName }, () => this.updateUploadDisabled());
  }
  handleChangeVideo(e) {
    this.setState({ "video": e.target.files[0] }, () => this.updateUploadDisabled());
  }
  handleChangePhoto1(e) {
    this.setState({ "photo1": e.target.files[0] }, () => this.updateUploadDisabled());
  }
  handleChangePhoto2(e) {
    this.setState({ "photo2": e.target.files[0] }, () => this.updateUploadDisabled());
  }
  handleChangePhoto3(e) {
    this.setState({ "photo3": e.target.files[0] }, () => this.updateUploadDisabled());
  }
  handleChangePhoto4(e) {
    this.setState({ "photo4": e.target.files[0] }, () => this.updateUploadDisabled());
  }
  handleChangePhoto5(e) {
    this.setState({ "photo5": e.target.files[0] }, () => this.updateUploadDisabled());
  }
}
