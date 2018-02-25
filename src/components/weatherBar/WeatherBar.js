import React, { Component } from 'react';
import './WeatherBar.css';

class WeatherBar extends Component {

  render() {
    return (
      <section className="weatherBar">
        <h2> Current weather {this.props.location}</h2>
        <p>
            {this.props.current.summary}
        </p>
        <div>
          <p>
            Temperature: {this.props.current.temp}
          </p>
          <p>
           Wind speed: {this.props.current.windSpeed}
          </p>
          <p>
            Relative humidity: {this.props.current.humidity}
          </p>
          <p>
            Sunrise: {this.props.current.sunrise}
          </p>
          <p>
            Sunset: {this.props.current.sunset}
          </p>
        </div>
      </section>
    );
  }
  
}

export default WeatherBar