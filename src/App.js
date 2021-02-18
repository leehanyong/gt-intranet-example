import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Employee from './components/Employee'

const employees = [
  {
    'name' : '이한용',
    'sex' : '남',
    'age' : '29',
    'rank' : '대리',
    'career' : '3년'
  },
  {
    'name' : '김한용',
    'sex' : '남',
    'age' : '31',
    'rank' : '과장',
    'career': '8년'
  }
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>GT innovision Intranet</h2>
        <div>
          {employees.map(c => {
            return <Employee name={c.name} sex={c.sex} age={c.age} rank={c.rank} career={c.career} />
          })}

        </div>
        </header>
    </div>
  );
}

export default App;
