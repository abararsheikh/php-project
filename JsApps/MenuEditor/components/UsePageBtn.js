import React from 'react';
import _ from 'lodash';

export default class UsePageBtn extends React.Component {
  static propTypes = {
    pageList: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    const usePage = 'Custom Page';
    this.state = {
      usePage
    };
  }
  componentWillReceiveProps(nextProps) {
    const link = nextProps.link;
    if (/page\/.+/.test(link)) {
      const pageId = link.slice(link.lastIndexOf('/') + 1);
      const pageItem = _.find(nextProps.pageList, {id: pageId});
      this.setState({usePage: pageItem.name});
    }
  }

  handlePageChange = (item) => () => {
    this.setState({usePage: item.name});
    this.props.onPageChange(item.id);

  };

  render() {
    if (!this.props.pageList) return;
    return (
        <div className="btn-group">
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
            {this.state.usePage} <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {this.props.pageList.map((item, index) => {
              return (
                  <li key={index} data-pageid={item.id} onClick={this.handlePageChange(item)}><a
                      href="#">{item.name}</a></li>
              )
            })}
          </ul>
        </div>
    )
  }
}