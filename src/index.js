import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
	<div className="page">
	  <h1>HackerNews</h1>
  </div>,
  document.getElementById('header')
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);