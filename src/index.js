import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MathMainAdv from './components/math_garden/MathMainAdv';
import MathLevels from './components/math_garden/MathLevels';
import WordsMain from './components/words_river/WordsMain';
import Welcome from './components/MainMenu';


import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WordLevels from './components/words_river/WordLevels';
import TicTacToe from './components/games/TicTacToe';
import FishJumpGame from './components/games/FishJumpGame';

const routes = createBrowserRouter([
  { path: '/', element:<App/>}, // our-domain 
  { path: '/home-page', element:<Welcome/>},
  { path: '/math-garden-advanced', element:<MathMainAdv/>},
  { path: '/math-garden-levels', element:<MathLevels/>},
  { path: '/words-river', element:<WordsMain/>},
  { path: '/words-river-levels', element:<WordLevels/>},
  { path: '/tic-tac-toe', element:<TicTacToe/>},
  { path: '/fish-game', element:<FishJumpGame/>},

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
//reportWebVitals();
