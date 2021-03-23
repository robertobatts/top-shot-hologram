import React from 'react';
import './App.css';
import { Input, Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';


export default class UploadPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div>
        <div>
          <Button variant="contained" color="primary" component="label">
            Choose Photo 1
            <input type="file" hidden onChange={(e) => this.handleChangePhoto1(e)} />
          </Button>
          <Button variant="contained" color="primary" component="label">
            Choose Photo 2
            <input type="file" hidden onChange={(e) => this.handleChangePhoto2(e)} />
          </Button>
          <Button variant="contained" color="primary" component="label">
            Choose Photo 3
            <input type="file" hidden onChange={(e) => this.handleChangePhoto3(e)} />
          </Button>
          <Button variant="contained" color="primary" component="label">
            Choose Photo 4
            <input type="file" hidden onChange={(e) => this.handleChangePhoto4(e)} />
          </Button>
          <Button variant="contained" color="primary" component="label">
            Choose Photo 5
            <input type="file" hidden onChange={(e) => this.handleChangePhoto5(e)} />
          </Button>
          <Button variant="contained" color="primary" component="label">
            Choose Video
            <input type="file" hidden onChange={(e) => this.handleChangeVideo(e)} />
          </Button>
          <Button
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
            disabled={this.isUploadDisabled}
            onClick={this.upload}
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

  isUploadDisabled() {
    return this.state.photo1 == null || this.state.photo2 == null || this.state.photo3 == null || this.state.photo4 == null ||
      this.state.photo5 == null || this.state.video == null;
  }

  upload() {
    axios
      .post("http://localhost:8080/api/upload-top-shot", { audioId: audioId, wordNumber: wordNumber, user: user, comment: comment })
      .then(res => {
        this.setState({"success": true});
      })
      .catch(err => {
        console.log(err);
        this.setState({"success": false});
      });
  }

  handleChangePhoto1(e) {
    this.setState({ "photo1": e.target.files[0] })
  }
  handleChangePhoto2(e) {
    this.setState({ "photo2": e.target.files[0] })
  }
  handleChangePhoto3(e) {
    this.setState({ "photo3": e.target.files[0] })
  }
  handleChangePhoto4(e) {
    this.setState({ "photo4": e.target.files[0] })
  }
  handleChangePhoto5(e) {
    this.setState({ "photo5": e.target.files[0] })
  }
  handleChangeVideo(e) {
    this.setState({ "video": e.target.files[0] })
  }
}

