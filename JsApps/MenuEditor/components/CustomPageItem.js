import React from 'react';
import Page from '../../CustomPage/components/Page';

export default class CustomPageItem extends React.Component {
  static propTypes = {
    nameValueLink: React.PropTypes.object.isRequired,
    id: React.PropTypes.string
  };

  render() {
    return (
        <div className="panel panel-default" style={{marginBottom: '0px', cursor: 'move'}}>
          {this.props.collapseButton}
          <div className="panel-body" style={{padding: '2px'}}>
            <div className="row">
              <div className="col-xs-8">
                <div className="input-group">
                  <span className="input-group-addon">Name</span>
                  <input type="text" className="form-control"
                         value={this.props.nameValueLink.name}
                         onChange={this.props.nameValueLink.onChange}
                  />
                </div>
              </div>
              <div className="col-xs-4">
                <button className="btn btn-info" type="button" onClick={this.props.onEdit}>Edit Page</button>
                <button className="btn btn-danger" type="button" onClick={this.props.onDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>

    )
  }
}