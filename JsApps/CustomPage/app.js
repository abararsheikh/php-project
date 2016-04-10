import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page';
import 'AlloyEditor/dist/alloy-editor/alloy-editor-no-react';
import 'AlloyEditor/dist/alloy-editor/assets/alloy-editor-ocean-min.css!';

ReactDOM.render(<Page />, document.querySelector('#customPage'));