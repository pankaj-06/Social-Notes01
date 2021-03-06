import React, { Component } from 'react';
import {
  Stickies
} from './stkr';


const mock = require('./mock');

export default class extends Component {

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      showTape: false,
      showOutput: false,
      showTitle: true,
      showFooter: true,
      output: '',
      colors: ['#FFFFFF'],
      showCustomColors: false,
      showMock: false
    };
    this.toggleValue = this.toggleValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fetchMock = this.fetchMock.bind(this);
  }

  toggleValue(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  onChange(notes) {
    this.setState({
      output: JSON.stringify(notes, null, 2),
      notes
    });
  }

  fetchMock() {
    this.setState({
      showMock: true
    }, () => {
      this.setState({
        notes: mock.default
      });
    });
  }

  render() {
    let wrapperStyle = {};
    if (this.state.showBound) {
      wrapperStyle = {
        height: '700px',
        width: '700px',
        background: 'rgba(0, 0, 0, 0.2)',
        border: '2px solid #fff',
        overflow: 'auto',
        padding: '10px'
      };
    }
    return (
      <div>
        <div className="header">
          Create Notes
        </div>
        <Stickies
          notes={this.state.notes}
          tape={this.state.showTape}
          style={{ float: 'left' }}
          colors={this.state.showCustomColors ? this.state.colors : undefined}
          title={this.state.showTitle}
          footer={this.state.showFooter}
          onChange={this.onChange}
          wrapperStyle={wrapperStyle}
        />
        <div className="config">
          <form>
            <input type="radio" name="showCustomColors" value="show_custom_colors" checked={this.state.showCustomColors} onClick={this.toggleValue} />Custom Colors
            <input type="radio" name="showMock" value="show_mock" checked={this.state.showMock} onClick={this.fetchMock} /> Mock Data
          </form>
          {/* <div className="output" style={{ display: this.state.showOutput ? 'block' : 'none' }}>
            <label className="note-header">Output JSON</label>
            <div>
              <pre>
                {this.state.output}
              </pre>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}