import React from 'react';
import ReactDOM from 'react-dom';
import LoginApp from './components/login/LoginApp.jsx!'
import RegisterApp from './components/register/RegisterApp.jsx!'

ReactDOM.render(
    <RegisterApp />,
    document.querySelector('#login')
);