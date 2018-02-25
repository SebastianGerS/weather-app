import React, { Component } from 'react';
import './WeatherBar.css';

class WeatherBar extends Component {

  render() {
    return (
      <section className="weatherBar">
        <h2>{this.props.location}</h2>
        <p>
          {this.props.current.summary}
        </p>
        <p>
          The current tempreture is: {this.props.current.temp}
        </p>
        <p>
          The current wind speed is: {this.props.current.windSpeed}
        </p>
        <p>
          The current relative humitity is: {this.props.current.humidity}
        </p>
        <p>
          sunrise: {this.props.current.sunrise}
        </p>
        <p>
          sunset: {this.props.current.sunset}
        </p>
      </section>
    );
  }
  
}

export default WeatherBar