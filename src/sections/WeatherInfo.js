import React, { Component } from 'react';
import WeatherBar from '../components/weatherBar/WeatherBar';
import DARKSKYKEY from './APIKeys';

class WeatherInfo extends Component {
  constructor() {
    super();
    this.state = {
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
        {
          date: undefined,
          tempMin: undefined,
          tempMax: undefined,
          windSpeed: undefined,
          humidity: undefined,
          sunrise: undefined,
          sunset: undefined,
        },
        {
          date: undefined,
          tempMin: undefined,
          tempMax: undefined,
          windSpeed: undefined,
          humidity: undefined,
          sunrise: undefined,
          sunset: undefined,
        },
        {
          date: undefined,
          tempMin: undefined,
          tempMax: undefined,
          windSpeed: undefined,
          humidity: undefined,
          sunrise: undefined,
          sunset: undefined,
        },
        {
          date: undefined,
          tempMin: undefined,
          tempMax: undefined,
          windSpeed: undefined,
          humidity: undefined,
          sunrise: undefined,
          sunset: undefined,
        },
        {
          date: undefined,
          tempMin: undefined,
          tempMax: undefined,
          windSpeed: undefined,
          humidity: undefined,
          sunrise: undefined,
          sunset: undefined,
        },
        {
          date: undefined,
          tempMin: undefined,
          tempMax: undefined,
          windSpeed: undefined,
          humidity: undefined,
          sunrise: undefined,
          sunset: undefined,
        },
        {
          date: undefined,
          tempMin: undefined,
          tempMax: undefined,
          windSpeed: undefined,
          humidity: undefined,
          sunrise: undefined,
          sunset: undefined,
        },
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
    const week = [];
    for(let i = 0; i < 7; i++) {
      let bar = <WeatherBar current= {this.state.week[i]} />
      week.push(bar);
    }
    

    return (
      <section className="weatherInfo">
       <WeatherBar current={this.state.currentDay} />
       {week}
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
      data.daily.data.forEach(day => {
        let weekDay = new Date(day.time * 1000).getDay();
        this.setState({
            week: {
              ...this.state.week,
              [`${weekDay}`]: {
                date: day.time,
                tempMin: `${day.temperatureMin} ${this.state.selectedTempUnit}`,
                tempMax: `${day.temperatureMax} ${this.state.selectedTempUnit}`,
                windSpeed: `${day.windSpeed} m/s`,
                humidity: `${day.humidity * 100}%`,
                sunrise: new Date(day.sunriseTime * 1000).toLocaleTimeString(),
                sunset: new Date(day.sunsetTime *1000).toLocaleTimeString(),
              }
            }
        });
      });
      console.log(this.state.week);
    }).catch(error => {
      console.log(error);
    });
  }
}

export default WeatherInfo;