import React from 'react';
import ReactDOM from 'react-dom';
import AuthApp from './components/AuthApp';

ReactDOM.render(<AuthApp />, document.querySelector('#login'));

(function () {
  window.login.show = () => $('#loginBtn').click();
  window.login.hide = () => $('#authModal').modal('hide');
})();