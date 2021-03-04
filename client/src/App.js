import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Employee from './components/Employee'
import { DataGrid } from '@material-ui/data-grid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>GT innovision Intranet</h2>
          <Employee />
      </header>
    </div>
  );
}

export default App;
