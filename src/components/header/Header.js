import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title">Welcome to The Weather App</h1>
        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
      </header> 
    );
  }
}

export default Header;
