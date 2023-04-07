import { render } from 'preact';
import { App } from './App';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import './styles/tailwind.css';

axios.defaults.baseURL = 'http://localhost:8080/api/v1/';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
