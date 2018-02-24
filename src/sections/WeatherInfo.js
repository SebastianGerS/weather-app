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
      selectedTempScale: `${String.fromCharCode(176)}C`,
      currentDay: {
        temp: undefined,
        windSpeed: undefined,
        humidity: undefined,
        sunrise: undefined,
        sunset: undefined,
        summary: undefined,
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
    if(this.state.lat !== prevState.lat && this.state.lon !== prevState.lon 
       || this.state.selectedTempScale !== prevState.selectedTempScale ) {

      this.getWeatherData();
    }
  }

  render() {
    const content = [];
    let optionalScale;
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
    } else if (this.state.activeTab === 3 ) {
      for(let k = 0; k < 8; k++) {
        let p =  <p>On {this.state.week[k].weekday} the weather will be {this.state.week[k].summary}</p>
        content.push(p);
      }
    }
    if(this.state.selectedTempScale === `${String.fromCharCode(176)}C`) {
      optionalScale = `${String.fromCharCode(176)}F`;
    } else {
      optionalScale = `${String.fromCharCode(176)}C`;
    }
    return (
      <section>
        <nav>
          <ul className="tabs">
            <Tab index={0} name="Home" changeTab={this.changeTab} />
            <Tab index={1} name="Weekly" changeTab={this.changeTab} />
            <Tab index={2} name="Hourly" changeTab={this.changeTab} />
            <Tab index={3} name="Overview" changeTab={this.changeTab} />
          </ul>
        </nav>
        <div>
          <p>Current Temreture Scale is {this.state.selectedTempScale}</p>
          <button onClick={this.changeTempScale.bind(this)}>Change to {optionalScale}</button>
        </div>
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
    const weekdays = ['Sunday','Monday', 'Tusday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 
    fetch(proxyUrl + url
    ).then(res => res.json()
    ).then(data => {
      let temp = this.getTempWithScale(data.currently.temperature);
      console.log(data)
      this.setState({ 
        currentDay: { 
          temp: temp,
          windSpeed: `${data.currently.windSpeed} m/s`,
          humidity: `${data.currently.humidity * 100}%`,
          sunrise: new Date(data.daily.data[0].sunriseTime * 1000).toLocaleTimeString(),
          sunset: new Date(data.daily.data[0].sunsetTime *1000).toLocaleTimeString(),
          summary: data.currently.summary,
        },
      });

      let index = 0;
      
      data.daily.data.forEach(day => {
        const weekday = weekdays[new Date(day.time * 1000).getDay()];
        const tempMax = this.getTempWithScale(day.temperatureMax);
        const tempMin = this.getTempWithScale(day.temperatureMin);
        this.setState({
            week: {
              ...this.state.week,
              [`${index}`]: {
                weekday: weekday,
                tempMin: tempMax,
                tempMax: tempMin,
                windSpeed: `${day.windSpeed} m/s`,
                humidity: `${day.humidity * 100}%`,
                sunrise: new Date(day.sunriseTime * 1000).toLocaleTimeString(),
                sunset: new Date(day.sunsetTime *1000).toLocaleTimeString(),
                summary: day.summary,
              }
            }
        });
        index++;
      });
      let hIndex = 0
      data.hourly.data.forEach(hour => {
        let date = new Date(hour.time * 1000).toLocaleTimeString();
        temp = this.getTempWithScale(hour.temperature);
        this.setState({
          hourly: {
            ...this.state.hourly,
            [`${hIndex}`]: {
              time: date,
              temp: temp,
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

  changeTempScale() {
    if (this.state.selectedTempScale === `${String.fromCharCode(176)}C`) {
      this.setState({
        selectedTempScale: `${String.fromCharCode(176)}F`
      });
    } else {
      this.setState({
        selectedTempScale: `${String.fromCharCode(176)}C`
      });
    }
  }
  getTempWithScale(temp) {
    if( this.state.selectedTempScale === `${String.fromCharCode(176)}C`) {
      temp = `${temp} ${this.state.selectedTempScale}`;
    } else {
      temp = `${(temp * (9/5) + 32).toFixed(2)} ${this.state.selectedTempScale}`;
    }
    return temp;
  }
}

export default WeatherInfo;