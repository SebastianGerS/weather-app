import React, { Component } from 'react';
import './DailyWeather.css';

class DailyWeather extends Component {
  constructor(props) {
    super(props);
   
  }

  render() {
    return (
      <section className="dailyWeather">
        <p>
          day: {this.props.day.weekday}
        </p>
        <p>
          tempreture Max: {this.props.day.tempMax}
        </p>
        <p>
          tempreture Min: {this.props.day.tempMin}
        </p>
        <p>
          wind speed: {this.props.day.windSpeed}
        </p>
        <p>
          relative humitity: {this.props.day.humidity}
        </p>
        <p>
          sunrise: {this.props.day.sunrise}
        </p>
        <p>
          sunset: {this.props.day.sunset}
        </p>
      </section>
    );
  }
  
}

export default DailyWeather