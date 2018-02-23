import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import WeatherBar from './components/weatherBar/WeatherBar';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <WeatherBar />
      </div>
    );
  }
}

export default App;
