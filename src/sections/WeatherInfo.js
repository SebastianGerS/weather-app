import React, { Component } from 'react';
import WeatherBar from '../components/weatherBar/WeatherBar';
import DARKSKYKEY from './APIKeys';

class WeatherInfo extends Component {
  constructor() {
    super();
    this.state = {
      lat: undefined, 
      lon: undefined,
      currentDay: {
        temp: undefined,
        windSpeed: undefined,
        humidity: undefined,
        sunrise: undefined,
        sunset: undefined,
        selectedTempUnit: `${String.fromCharCode(176)}C`,
      },
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
    return (
      <section className="weatherInfo">
       <WeatherBar current={this.state.currentDay} />
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
      console.log(data);
      this.setState({ 
        currentDay: { 
          temp: `${data.currently.temperature} ${this.state.currentDay.selectedTempUnit}`,
          windSpeed: `${data.currently.windSpeed} m/s`,
          humidity: `${data.currently.humidity * 100}%`,
          sunrise: new Date(data.daily.data[0].sunriseTime * 1000).toLocaleTimeString(),
          sunset: new Date(data.daily.data[0].sunsetTime *1000).toLocaleTimeString(),
        },
      })
      
    }).catch(error => {
      console.log(error);
    });
  }
}

export default WeatherInfo;