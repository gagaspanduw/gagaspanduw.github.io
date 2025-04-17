import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Logo from './components/Logo';

// Generate a favicon.ico replacement
const generateFavicon = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  
  const ctx = canvas.getContext('2d');
  
  // Draw a red circle background
  ctx.fillStyle = '#F87171';
  ctx.beginPath();
  ctx.arc(16, 16, 16, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw a dark inner square
  ctx.fillStyle = '#1F2937';
  ctx.fillRect(8, 8, 16, 16);
  
  // Draw GPW initials
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  
  // G
  ctx.moveTo(10, 16);
  ctx.arc(12, 13, 3, Math.PI, 0, true);
  ctx.lineTo(15, 16);
  
  // P
  ctx.moveTo(17, 10);
  ctx.lineTo(17, 22);
  ctx.moveTo(17, 12);
  ctx.arc(17, 14, 2, Math.PI * 1.5, Math.PI * 0.5, false);
  
  // W
  ctx.moveTo(21, 10);
  ctx.lineTo(22, 22);
  ctx.lineTo(23, 16);
  ctx.lineTo(24, 22);
  ctx.lineTo(25, 10);
  
  ctx.stroke();
  
  // Replace favicon
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL('image/x-icon');
  document.getElementsByTagName('head')[0].appendChild(link);
};

// Call the function after the app is mounted
const originalReactDOM = ReactDOM.render;
ReactDOM.render = function() {
  const result = originalReactDOM.apply(this, arguments);
  generateFavicon();
  return result;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
