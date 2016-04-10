import React from 'react';
import Editor from './Editor';
import Toolbar from './Toolbar';

const EDITOR_NAME = 'editor';

export default class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      content: ''
    }
  }

  handleSave = () => {
    const content = CKEDITOR.instances[EDITOR_NAME].getData();
    this.setState({content: content});
  };

  render() {
    return (
        <div className="container">
          <Toolbar />
          <Editor name={EDITOR_NAME} content="test"/>
        </div>
    )
  }
}