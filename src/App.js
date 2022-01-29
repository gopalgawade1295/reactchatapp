import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Chat from './components/Chat';
import Login from './components/Login';

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <div>
      <Router>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
        <div className="App">
          <Route exact path='/'><Chat isAuth={isAuth} /></Route>
          <Route path='/login'><Login setIsAuth={setIsAuth} /></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
