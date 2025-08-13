import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SessionWebSocket from './websocket/Websocket';

const rootElement = document.getElementById('root') || document.body;

// Used for styling and sizing
function updateRootUnits() {
  const rect = rootElement.getBoundingClientRect();
  rootElement.style.setProperty('--rw', `${rect.width / 100}px`);
  rootElement.style.setProperty('--rh', `${rect.height / 100}px`);
}

// Observe root size changes
const resizeObserver = new ResizeObserver(updateRootUnits);
resizeObserver.observe(rootElement);
updateRootUnits();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionWebSocket />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();