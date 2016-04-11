import React from 'react';

export default class Toolbar extends React.Component {

  render() {
    return (
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="page-header">
              <h1>Page Preview</h1>
              <p>Click to edit</p>
            </div>
            <div className="pull-right">
              <button className="btn btn-primary" onClick={this.props.onSave}>Save</button>
              <button className="btn btn-danger">Cancel</button>
            </div>
          </div>
        </div>
    )
  }
}