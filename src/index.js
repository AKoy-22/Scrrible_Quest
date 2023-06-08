import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MathMain from './components/math_garden/MathMain'
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const routes = createBrowserRouter([
  { path: '/', element:<App/>}, // our-domain 
  { path: '/math-garden', element:<MathMain/>}

]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
