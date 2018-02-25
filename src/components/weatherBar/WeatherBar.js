import React, { Component } from 'react';
import './WeatherBar.css';

class WeatherBar extends Component {

  render() {
    return (
      <section className="weatherBar">
        <h2>{this.props.location}</h2>
        <p>Today:&nbsp;&nbsp;{this.props.current.summary}</p>
        <div>
          <p>Temperature:&nbsp;&nbsp;{this.props.current.temp}</p>
          <p>Wind speed:&nbsp;&nbsp;{this.props.current.windSpeed}</p>
          <p>Relative humidity:&nbsp;&nbsp;{this.props.current.humidity}</p>
          <p>Sunrise:&nbsp;&nbsp;{this.props.current.sunrise}</p>
          <p>Sunset:&nbsp;&nbsp;{this.props.current.sunset}</p>
        </div>
      </section>
    );
  }
  
}

export default WeatherBar