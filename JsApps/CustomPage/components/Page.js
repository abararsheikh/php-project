import React from 'react';
import Editor from './Editor';
import Toolbar from './Toolbar';
import * as API from '../api';
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
    API.get(this.state.id).then(data => this.setState(data));
  }

  handleSave = () => {
    const id = this.state.id;
    const content = CKEDITOR.instances[EDITOR_NAME].getData();
    this.setState({content: content});
    if (id) {
      API.update(id, content).then(data => console.log(data));
    } else {
      API.add(content).then(data => console.log(data));
    }
  };

  render() {
    return (
        <div className="container">
          <Toolbar onSave={this.handleSave}/>
          <Editor name={EDITOR_NAME} content={this.state.content}/>
        </div>
    )
  }
}