import React from 'react';

export default class Editor extends React.Component {
  _editor;

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired
  };

  componentDidMount() {
    this._editor = AlloyEditor.editable( this.props.name, {
      toolbars: {
        add: {
          buttons: ['image', 'table', 'link', 'hline']
        },
        styles: {
          selections: [
            {
              name: 'text',
              buttons: ['italic', 'bold', 'underline', 'ul',
                'paragraphLeft', 'paragraphCenter', 'paragraphRight',
                {
                  name: 'styles',
                  cfg: {
                    styles: [
                      { name: 'Head 1', style: {element: 'h1'} },
                      { name: 'Head 2', style: {element: 'h2'} },
                      { name: 'Big', style: {element: 'big'} },
                      { name: 'Small', style: {element: 'small'} },
                      { name: 'Code', style: {element: 'code'} }
                    ]
                  }
                }],
              test: AlloyEditor.SelectionTest.text
            }, {
              name: 'image',
              buttons: ['imageLeft', 'imageCenter', 'imageRight'],
              test: AlloyEditor.SelectionTest.image
            }

          ]
        }
      }
    })
  }

  componentWillUnmount() {
    this._editor.destroy();
  }

  render() {
    return (
        <div id={this.props.name} style={{padding: '20px'}}>
          {this.props.content}
        </div>
    );
  }
}