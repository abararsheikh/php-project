import React from 'react';

export default class MenuItem extends React.Component {

  render() {
    return (
        <div className="panel panel-default" style={{marginBottom: '0px'}}>
          <div className="panel-body">
            <div className="row">
              <div className="col-xs-5">
                <input type="text" name='name'
                       className="form-control" placeholder="name"
                       value={this.props.name} onChange={this.props.onChange}/>
              </div>

              <div className="col-xs-5">
                <input type="text" name='link'
                       className="form-control" placeholder="link"
                       value={this.props.link} onChange={this.props.onChange}/>
              </div>

              <div className="col-xs-2">
                <button className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}