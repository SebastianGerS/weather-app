import React, { Component } from 'react';
import WeatherBar from '../components/weatherBar/WeatherBar';
import DailyWeather from '../components/weather/daily/DailyWeather';
import HourlyWeather from '../components/weather/hourly/HourlyWeather';
import {DARKSKYKEY, GEOLOCATIONKEY }from './APIKeys';
import Tab from '../components/tab/Tab';
import './WeatherInfo.css';
import { clearInterval } from 'timers';
import uuidv4 from 'uuid/v4';


class WeatherInfo extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.state = {
      activeTab: 0,   
      location: '',   
      lat: undefined, 
      lon: undefined,
      interval: undefined,
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
 
  componentWillMount() {
    this.getCurrentLocation();
    
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    if( (this.state.lat !== prevState.lat && this.state.lon !== prevState.lon )
    || (this.state.selectedTempScale !== prevState.selectedTempScale )) {
      this.getWeatherData();
      if(!this.state.interval) {
        let interval = setInterval(this.getWeatherData.bind(this), 1000*60*10);
        this.setState( {
          interval: interval
        });
      } 
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.interval._id);
  }

  render() {
    const dailys = [];
    const hourlys = [];
    const overviews = [];

    let content;
    let optionalScale;
    if(this.state.activeTab === 1) {
      for(let i = 0; i < 8; i++) {
        let key = uuidv4();
        let bar = <DailyWeather key={key} day={this.state.week[i]} />
        dailys.push(bar);
      }
      content = dailys;
    } else if (this.state.activeTab === 2 ) {
      for(let j = 0; j < 49; j++) {
        let key = uuidv4();
        let bar = <HourlyWeather key={key} hour={this.state.hourly[j]} />
        hourlys.push(bar);
      }
      content = 
        <section className="hours">
          <table>
            <thead>
              <tr>
                <th>date</th>
                <th>time</th>
                <th>temperature</th>
                <th>wind speed</th>
                <th>relative humitity</th>
              </tr>
            </thead>
            <tbody>
              {hourlys}
            </tbody>
            <tfoot>
            </tfoot>
          </table>
        </section>;
    } else if (this.state.activeTab === 3 ) {
      for(let k = 0; k < 8; k++) {
        let key = uuidv4();
        let p =  <div key={key} className="overview"> 
                    <h3>{this.state.week[k].weekday}</h3>
                    <p>({this.state.week[k].date})</p>
                    <p>{this.state.week[k].summary}</p>
                  </div>;
        overviews.push(p);
      }
      content = <section className="overviews">{overviews}</section>;
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
        <article className="weatherInfo">
          <WeatherBar current={this.state.currentDay} location={this.state.location}/>
          <div>
            <button onClick={this.changeTempScale.bind(this)}>Change to {optionalScale}</button>
            <form onSubmit={this.getLocation}>
              <input value={this.state.location} type="text" onChange={this.updateValue} placeholder="location"/>
              <button type="submit"> Go!</button>
            </form>
            <button onClick={this.getCurrentLocation.bind(this)}>Get current location</button>
          </div>
          {content}
        </article>
      </section>
    );
  }
  getCurrentLocationSuccess(position) {
    this.setState({ 
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      location: '',
    }, function() {
      this.getLocation();
    });
  }
  getCurrentLocationError() {
    window.alert('Geolocation is not availible'); 
    this.setState({ 
      location: "London, King's Cross Station Platform 9¾"
    }, function() {
      this.getLocation();
    });
  }
  getCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.getCurrentLocationSuccess.bind(this), this.getCurrentLocationError.bind(this));
      
    } else {
      window.alert('Geolocation is not availible');      
    }
  }

  getWeatherData() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://api.darksky.net/forecast/${DARKSKYKEY}/${this.state.lat},${this.state.lon}?units=si`;
    const weekdays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 
    fetch(proxyUrl + url
    ).then(res => res.json()
    ).then(data => {
      let temp = this.getTempWithScale(data.currently.temperature);
      this.setState({ 
        currentDay: { 
          temp: temp,
          windSpeed: `${data.currently.windSpeed} m/s`,
          humidity: `${Math.round(data.currently.humidity * 100)}%`,
          sunrise: new Date(data.daily.data[0].sunriseTime * 1000).toLocaleTimeString(),
          sunset: new Date(data.daily.data[0].sunsetTime *1000).toLocaleTimeString(),
          summary: data.currently.summary,
        },
      });

      let index = 0;
      
      data.daily.data.forEach(day => {
        const d = new Date(day.time * 1000);
        const date = d.toDateString().substr(4, d.toDateString().length);
        const weekday = weekdays[d.getDay()];
        const tempMax = this.getTempWithScale(day.temperatureMax);
        const tempMin = this.getTempWithScale(day.temperatureMin);
        this.setState({
            week: {
              ...this.state.week,
              [`${index}`]: {
                id: new Date().getTime(),
                weekday: weekday,
                date: date,
                tempMin: tempMin,
                tempMax: tempMax,
                windSpeed: `${day.windSpeed} m/s`,
                humidity: `${Math.round(day.humidity * 100)}%`,
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
        const d =  new Date(hour.time * 1000)
        const date = d.toDateString();
        const time = d.toLocaleTimeString();
        temp = this.getTempWithScale(hour.temperature);
        this.setState({
          hourly: {
            ...this.state.hourly,
            [`${hIndex}`]: {
              id: new Date().getTime(),
              date: date,
              time: time,
              temp: temp,
              windSpeed: `${hour.windSpeed} m/s`,
              humidity: `${Math.round(hour.humidity * 100)}%`,
            }
          }
        });
        hIndex++;
      });
    }).catch(error => {
      window.alert('could not fetch data');
    });
  }

  getLocation(e) {
 
    if (e) {
      e.preventDefault();
    }
 
    let q = this.state.location;
    let param;
    if(q ===  ''){
      param = 'latlng';
      q = `${this.state.lat},${this.state.lon}`;
      
    } else {
      param = 'address';
    }
  
    const url = `https://maps.googleapis.com/maps/api/geocode/json?${param}=${q}&key=`
    fetch(`${url}${GEOLOCATIONKEY}`
      ).then(res => res.json()).then(res => {
        if(param === 'address') {
          const location = res.results[0].geometry.location;
          this.setState({
            lat: location.lat,
            lon: location.lng,
          });
        } else {
          const address =res.results[0]['formatted_address'];
          this.setState({
            location: address,
          });
        }
       
      }).catch(error => {
        window.alert('could not fetch location');
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

  updateValue(event) {
    this.setState({
      location: event.target.value
    })
  }
}

export default WeatherInfo;