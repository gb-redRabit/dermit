import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './components/App';
import {HashRouter} from 'react-router-dom';

import reportWebVitals from './script/reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <HashRouter>
            <App/>
        </HashRouter> 
  </React.StrictMode>
);

reportWebVitals();
