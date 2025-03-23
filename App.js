import './styles.css';
import React, { useState } from 'react';
import './App.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to My Website</h1>
        <RegisterForm />
        <LoginForm />
      </header>
    </div>
  );
}

export default App;