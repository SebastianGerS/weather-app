import React, { Component } from 'react';
import WeatherBar from '../components/weatherBar/WeatherBar';
import DailyWeather from '../components/weather/daily/DailyWeather';
import HourlyWeather from '../components/weather/hourly/HourlyWeather';
import DARKSKYKEY from './APIKeys';
import Tab from '../components/tab/Tab';
import './WeatherInfo.css';


class WeatherInfo extends Component {
  constructor() {
    super();
    this.changeTab = this.changeTab.bind(this);
    this.state = {
      activeTab: 0,      
      lat: undefined, 
      lon: undefined,
      selectedTempUnit: `${String.fromCharCode(176)}C`,
      currentDay: {
        temp: undefined,
        windSpeed: undefined,
        humidity: undefined,
        sunrise: undefined,
        sunset: undefined,
      },
      week: [
        
      ],
      hourly: [

      ],
    }
  }
    
  componentDidMount() {
    this.getCurrentLocation();
    
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.lat !== prevState.lat && this.state.lon !== prevState.lon) {
      this.getWeatherData();
    }
  }

  render() {
    const content = [];
    if(this.state.activeTab === 1) {
      for(let i = 0; i < 8; i++) {
        let bar = <DailyWeather day={this.state.week[i]} />
        content.push(bar);
      }
    } else if (this.state.activeTab === 2 ) {
      for(let j = 0; j < 49; j++) {
        let bar = <HourlyWeather hour={this.state.hourly[j]} />
        content.push(bar);
      }
    }
    return (
      <section>
          <nav>
            <ul className="tabs">
              <Tab index={0} name="Home" changeTab={this.changeTab} />
              <Tab index={1} name="Weekly" changeTab={this.changeTab} />
              <Tab index={2}name="Hourly" changeTab={this.changeTab} />
              <Tab index={3} name="Sumary" changeTab={this.changeTab} />
            </ul>
          </nav>
        <article className="weatherInfo">
        <WeatherBar current={this.state.currentDay} />
        {content}
        </article>
      </section>
    );
  }

  getCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({ 
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      });
    } else {

    }
  }

  getWeatherData() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://api.darksky.net/forecast/${DARKSKYKEY}/${this.state.lat},${this.state.lon}?units=si`;

    fetch(proxyUrl + url
    ).then(res => res.json()
    ).then(data => {
      console.log(data)
      this.setState({ 
        currentDay: { 
          temp: `${data.currently.temperature} ${this.state.selectedTempUnit}`,
          windSpeed: `${data.currently.windSpeed} m/s`,
          humidity: `${data.currently.humidity * 100}%`,
          sunrise: new Date(data.daily.data[0].sunriseTime * 1000).toLocaleTimeString(),
          sunset: new Date(data.daily.data[0].sunsetTime *1000).toLocaleTimeString(),
        },
      });

      let index = 0;
      let weekdays = ['Sunday','Monday', 'Tusday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      data.daily.data.forEach(day => {
        let weekday = weekdays[new Date(day.time * 1000).getDay()];
        this.setState({
            week: {
              ...this.state.week,
              [`${index}`]: {
                weekday: weekday,
                tempMin: `${day.temperatureMin} ${this.state.selectedTempUnit}`,
                tempMax: `${day.temperatureMax} ${this.state.selectedTempUnit}`,
                windSpeed: `${day.windSpeed} m/s`,
                humidity: `${day.humidity * 100}%`,
                sunrise: new Date(day.sunriseTime * 1000).toLocaleTimeString(),
                sunset: new Date(day.sunsetTime *1000).toLocaleTimeString(),
              }
            }
        });
        index++;
      });
      let hIndex = 0
      data.hourly.data.forEach(hour => {
        let date = new Date(hour.time * 1000).toLocaleTimeString();
        this.setState({
          hourly: {
            ...this.state.hourly,
            [`${hIndex}`]: {
              time: date,
              temp: `${hour.temperature} ${this.state.selectedTempUnit}`,
              windSpeed: `${hour.windSpeed} m/s`,
              humidity: `${hour.humidity * 100}%`,
            }
          }
        });
        hIndex++;
      });
    }).catch(error => {
      console.log(error);
    });
  }

  changeTab(index) {
    return this.setState({
      activeTab: index
    });
  }
}

export default WeatherInfo;