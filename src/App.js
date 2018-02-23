import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import WeatherInfo from './sections/WeatherInfo';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <WeatherInfo />
      </div>
    );
  }
}

export default App;
