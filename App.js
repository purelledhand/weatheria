import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, StatusBar} from 'react-native';
import {LinearGradient} from "expo";
import Weather from "./Weather";

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null,
    city: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error
        });
      }
    );
  }

  _getWeather = (lat, lon) => {
    const API_KEY= 'e6be6ad793a1c6ac9a2d0de7dacd7ea8';

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature: json.main.temp,
        name: json.weather[0].main,
        city: json.name,
        isLoaded: true
      });
    })
    .catch(error => console.log('error!'));
  };

  render() {
    const {isLoaded, error, temperature, name, city} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        {isLoaded ? (
          <Weather temp={temperature} weatherName={name} city={city}/>
          ) : (
          <View style={styles.loading}>
            <ActivityIndicator/>
            <Text style={styles.loadingText}>Getting the weather</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  errorText: {
    color: 'red',
  },
  loading: {
    flex: 1,
    backgroundColor: '#F6F6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    marginTop: 10,
  }
});
