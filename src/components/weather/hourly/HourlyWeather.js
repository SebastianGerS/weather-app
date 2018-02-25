import React, { Component } from 'react';
import './HourlyWeather.css';

class HourlyWeather extends Component {

  render() {
    return (
      <section className="hourlyWeather">
        <p>
          time: {this.props.hour.time}
        </p>
        <p>
          tempreture: {this.props.hour.temp}
        </p>
        <p>
          wind speed: {this.props.hour.windSpeed}
        </p>
        <p>
          relative humitity: {this.props.hour.humidity}
        </p>
        
      </section>
    );
  }
  
}

export default HourlyWeather