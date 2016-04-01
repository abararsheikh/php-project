import React from 'react';
import ReactDOM from 'react-dom';
import MenuDisplay from './components/MenuDisplay';

const target = document.querySelector('#menuDisplay');
ReactDOM.render(<MenuDisplay menuName={target.getAttribute('data-menuName')} />, target);