import React, { Component } from 'react';
import './DailyWeather.css';

class DailyWeather extends Component {

  render() {
    return (
      <section className="dailyWeather">
        <div>
          <div>
            <h3>{this.props.day.weekday}</h3>
            <p> {this.props.day.summary} </p>
          </div>
          <div>
            <h4>Temperature</h4>
            <p>Max:&nbsp;&nbsp;{this.props.day.tempMax}</p>
            <p> Min:&nbsp;&nbsp;{this.props.day.tempMin}</p>
          </div>
        </div>
        <div>
          <div>
            <p>
              wind speed:&nbsp;&nbsp;{this.props.day.windSpeed}
            </p>
            <p>
              relative humitity:&nbsp;&nbsp;{this.props.day.humidity}
            </p>
          </div>
          <div>
            <p>
              sunrise:&nbsp;&nbsp;{this.props.day.sunrise}
            </p>
            <p>
              sunset:&nbsp;&nbsp;{this.props.day.sunset}
            </p>
          </div>
        </div>
      </section>
    );
  }
  
}

export default DailyWeather