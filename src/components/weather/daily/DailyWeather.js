import React, { Component } from 'react';
import './DailyWeather.css';

class DailyWeather extends Component {

  render() {
    return (
      <section className="dailyWeather">
        <div>
          <h3>{this.props.day.weekday}</h3>
          <p> {this.props.day.summary} </p>
        </div>
        <div>
          <h4>Temperature</h4>
          <p>Max: {this.props.day.tempMax}</p>
          <p> Min: {this.props.day.tempMin}</p>
        </div>
        <div>
          <p>
            wind speed: {this.props.day.windSpeed}
          </p>
          <p>
            relative humitity: {this.props.day.humidity}
          </p>
        </div>
        <div>
          <p>
            sunrise: {this.props.day.sunrise}
          </p>
          <p>
            sunset: {this.props.day.sunset}
          </p>
        </div>
      </section>
    );
  }
  
}

export default DailyWeather