import React from 'react';
import Editor from './Editor';
import Toolbar from './Toolbar';
import * as API from '../api';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css!';

const EDITOR_NAME = 'editor';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      content: 'Loading...'
    };
  }

  componentDidMount() {
    API.get(this.state.id).then(data => this.setState({content: data.content}));
  }

  handleSave = () => {
    const id = this.state.id;
    const content = CKEDITOR.instances[EDITOR_NAME].getData();
    this.setState({content: content});
    if (id) {
      API.update(id, content).then(data => {
        if (data.success) toastr.success('Page Saved');
        if (!data.success) toastr.warn('Failed to save');
      });
    } else {
      API.add(content).then(data => {
        if (data.success) {
          this.setState({id: data.id});
          toastr.success('Page Saved');
        }
        if (!data.success) toastr.warn('Failed to save');
      });
    }
  };

  render() {
    return (
        <div>
          <Toolbar onSave={this.handleSave}/>
          <Editor name={EDITOR_NAME} content={this.state.content}/>
        </div>
    )
  }
}