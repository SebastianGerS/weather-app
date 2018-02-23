import React, { Component } from 'react';
import './WeatherBar.css';

class WeatherBar extends Component {
  constructor() {
    super();
    this.state = {
    lat: undefined, 
    lon: undefined,
    currentTemp: undefined,
    currentWindSpeed: undefined,
    currentHumidity: undefined,
                        
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
    return(
      <section className="weatherBar">
        <p>
          The current tempreture is: {this.state.currentTemp}
        </p>
        <p>
          The current windspeed is: {this.state.currentWindSpeed}
        </p>
        <p>
          The current relative humidity is: {this.state.currentHumidity}
        </p>
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
    const url = `https://api.darksky.net/forecast/44744bcd283bd3b55dd7f9b7911f028d/${this.state.lat},${this.state.lon}?units=si`;

    fetch(proxyUrl + url
    ).then(res => res.json()
    ).then(data => {
      console.log(data);
      this.setState({ 
        currentTemp: data.currently.temperature,
        currentWindSpeed: data.currently.windSpeed,
        currentHumidity: data.currently.humidity,
      })
      
    }).catch(error => {
      console.log(error);
    });
  }
 
}

export default WeatherBar