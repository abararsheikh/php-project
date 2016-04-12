import React from 'react';

export default class UsePageBtn extends React.Component {
  static propTypes = {
    pageList: React.PropTypes.array.isRequired
  };

  render() {
    if (!this.props.pageList) return;

    return(
        <div className="btn-group">
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
            Use Custom Page <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {this.props.pageList.map( (item, index ) => {
              return (
                  <li key={index}><a href="#">{item.name}</a></li>
              )
            })}
          </ul>
        </div>
    )
  }
}