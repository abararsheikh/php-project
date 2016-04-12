import React from 'react';
import Page from './Page';
import PageList from './PageList';
import PageStore from '../stores/PageStore';
import PageActions from '../actions/PageActions';

export default class Container extends React.Component {

  constructor() {
    super();
    this.state = {
      list: PageStore.getList()
    }
  }

  componentDidMount() {
    PageStore.addChangeListener(this._onChange);
    PageActions.getList();
  }

  componentWillUnmount() {
    PageStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(MenuStore.getList());
    console.log('change');
  };

  render() {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <PageList list={PageStore.getList()} />
            </div>
            <div className="col-sm-9">
              <Page />
            </div>
          </div>
        </div>
    )
  }
}