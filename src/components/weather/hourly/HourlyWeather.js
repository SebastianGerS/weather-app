import React, { Component } from 'react';
import './HourlyWeather.css';

class HourlyWeather extends Component {

  render() {
    return (
      <tr className="hourlyWeather">
        <td>
          {this.props.hour.date}
        </td>
        <td>
          {this.props.hour.time}
        </td>
        <td>
          {this.props.hour.temp}
        </td>
        <td>
          {this.props.hour.windSpeed}
        </td>
        <td>
          {this.props.hour.humidity}
        </td>
      </tr>
    );
  }
  
}

export default HourlyWeather