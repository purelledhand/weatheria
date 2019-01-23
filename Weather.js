import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from "expo";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Music from "./Music";

const weatherCases = {
  Rain: {
    colors: ["#00C6F8", "#005BEA"],
    subtitle: "비오는 날의 음악",
    icon: 'ios-rainy'
  },
  Clear: {
    colors: ["#FEF253", "#FF7300"],
    subtitle: "맑은 날의 음악",
    icon: 'ios-sunny'
  },
  Thunderstorm: {
    colors: ["#77A0BC", "#777ADF"],
    subtitle: "천둥치는 날의 음악",
    icon: 'ios-thunderstorm'
  },
  Clouds: {
    colors: ["#E7E2EC", "#888"],
    subtitle: "구름 낀 날의 음악",
    icon: 'ios-cloudy'
  },
  Snow: {
    colors: ["#FDF2FC", "#89B6E5"],
    subtitle: "눈 오는 날의 음악",
    icon: 'ios-snow'
  },
  Drizzle: {
    colors: ["#89F7FE", "#66A6FF"],
    subtitle: "꿉꿉한 날의 음악",
    icon: 'md-rainy'
  },
  Haze: {
    colors: ["#FDF2FC", "#89B6E5"],
    subtitle: "안개 낀 날의 음악",
    icon: 'ios-menu'
  },
  Mist: {
    colors: ["#FDF2FC", "#89B6E5"],
    subtitle: "안개 낀 날의 음악",
    icon: 'ios-menu'
  }
};

function Weather({temp, city, weatherName}){
  return(
    <LinearGradient
      colors={weatherCases[weatherName].colors}
      style={styles.container}
    >
      <View style={styles.upper}>
        <Ionicons color="white" size={120} name={weatherCases[weatherName].icon}/>
        <Text style={styles.temp}>{temp}˚C</Text>
        <Text style={styles.city}>{city}</Text>
      </View>

      <View style={styles.lower}>
        <Text style={styles.title}>{weatherName}</Text>
        <Text style={styles.subtitle}>{weatherCases[weatherName].subtitle}</Text>
      </View>

      <View style={styles.musicContainer}>
        <Music weatherName={weatherName}/>
      </View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  weatherName: PropTypes.string.isRequired
}

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upper : {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temp : {
    fontSize: 40,
    color: '#fff',
  },
  city : {
    fontSize: 20,
    color: '#FFF',
    height: 50,
  },
  lower : {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
  title: {
    fontSize: 38,
    color: '#FFF'
  },
  subtitle : {
    fontSize: 24,
    color: '#FFF'
  },
  musicContainer : {
    flex: 3
  }

});