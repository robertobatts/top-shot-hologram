import React from 'react';
import './App.css';
import { Input, Button, Checkbox } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import webHandlers from './utils/webHandlers';
import './UploadPage.css';


export default class UploadPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = { isUploadDisabled: true, colorChecked: true }
  }

  render() {
    return (
      <div className="upload-page-container">
        <div>
          <div>
            <Input placeholder="Player Name" onChange={(event) => this.handlePlayerNameChange(event.target.value)} />
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                margin="normal"
                id="date-picker"
                label="Date"
                format="MM/dd/yyyy"
                value={this.state.date}
                onChange={(event) => this.handleDateChange(event)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <Input placeholder="Type of play" onChange={(event) => this.handleTypeChange(event.target.value)} />
          </div>
          <div>
            Color
            <Checkbox
              defaultChecked
              color="primary"
              onChange={(e) => this.setState({ "colorChecked": e.target.checked })}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            {this.state.colorChecked &&
              <input type="color" value={this.state.borderColor} onChange={(e) => this.setBorderColor(e.target.value)} />
            }
          </div>
          <div>
            <div>
              <Button variant="contained" color={this.state.video == null ? "default" : "primary"} component="label">
                Choose Video
            <input type="file" hidden onChange={(e) => this.handleChangeVideo(e)} />
              </Button>
              <Button variant="contained" color={this.state.photo1 == null ? "default" : "primary"} component="label">
                Choose Photo 1
            <input type="file" hidden onChange={(e) => this.handleChangePhoto1(e)} />
              </Button>
              <Button variant="contained" color={this.state.photo2 == null ? "default" : "primary"} component="label">
                Choose Photo 2
            <input type="file" hidden onChange={(e) => this.handleChangePhoto2(e)} />
              </Button>
            </div>
            <div>
              <Button variant="contained" color={this.state.photo3 == null ? "default" : "primary"} component="label">
                Choose Photo 3
            <input type="file" hidden onChange={(e) => this.handleChangePhoto3(e)} />
              </Button>
              <Button variant="contained" color={this.state.photo4 == null ? "default" : "primary"} component="label">
                Choose Photo 4
            <input type="file" hidden onChange={(e) => this.handleChangePhoto4(e)} />
              </Button>
              <Button variant="contained" color={this.state.photo5 == null ? "default" : "primary"} component="label">
                Choose Photo 5
            <input type="file" hidden onChange={(e) => this.handleChangePhoto5(e)} />
              </Button>
            </div>
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
      </div>
    );
  }

  updateUploadDisabled() {
    var disabled = this.state.photo1 == null || this.state.photo2 == null || this.state.photo3 == null || this.state.photo4 == null ||
      this.state.photo5 == null || this.state.video == null || this.state.playerName == null || this.state.date == null || this.state.type == null;
    this.setState({ isUploadDisabled: disabled });
    console.log(this.state);
  }

  upload() {
    var files = [this.state.video, this.state.photo1, this.state.photo2, this.state.photo3, this.state.photo4, this.state.photo5]
    webHandlers.postTopShots(this.state.playerName, files, this.state.date, this.state.type, this.state.borderColor)
      .then(data => this.setState({ "success": true }))
      .catch(err => {
        console.log(err);
        this.setState({ "success": false })
      });
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
  handleDateChange(date) {
    var month = date.getMonth() + 1;
    var day = date.getDay();
    var year = date.getFullYear();
    this.setState({ "date": month + "/" + day + "/" + year }, () => this.updateUploadDisabled());
  }
  handleTypeChange(type) {
    this.setState({ "type": type }, () => this.updateUploadDisabled());
  }

  setBorderColor(color) {
    this.setState({ "borderColor": color });
  }
}
