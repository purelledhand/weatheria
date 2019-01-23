import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import PropTypes from "prop-types";

const MusicCase = {
  Rain: {
    relatedToVideoId: 'hhXDFl6tmVY',
    topicId: 'rain'
  },
  Haze: {
    relatedToVideoId: 'hhXDFl6tmVY',
    topicId: 'haze'
  },
  Mist: {
    relatedToVideoId: 'hhXDFl6tmVY',
    topicId: 'mist'
  },
  Clear: {
    relatedToVideoId: 'hhXDFl6tmVY',
    topicId: 'sunny'
  },

};

export default class Music extends Component {

  state = {
    isLoaded: false,
    musics: null
  };

  componentDidMount() {
    this._getMusics(this.props.weatherName);
  }

  _getMusics = (weatherName) => {
    const API_KEY = 'AIzaSyCTYqvSwZpqBhjroE4Xt91X7NBmp2syioc';

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${MusicCase.Haze.relatedToVideoId}&topicId=${weatherName}&type=video&videoType=any&key=${API_KEY}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          musics: json.items,
          isLoaded: true
        });
      })
      .catch(error => console.log('error!'));
  };

  _getLists = (musics) => {
    musics.map((music) => {
      console.log(music.snippet.title);

      return (
        <View style={styles.musicContent}>
          <Text style={styles.musicText}>{music.snippet.title}</Text>
          <Ionicons style={styles.arrowIcon} color="white" size={20} name="ios-arrow-forward"/>
        </View>
      );
    });
  };

  render() {
    const {isLoaded, musics} = this.state;

    return (
      <View style={styles.container}>
        { isLoaded ? this._getLists(musics) : <Text/> }
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    flexWrap: 'wrap',
    marginTop: 15,
    marginBottom: 45,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 15
  },
  errorText: {
    color: 'red',
  },
  musicContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  musicText: {
    color: '#FFF',
    fontSize: 15,
    marginTop: 15,
    marginLeft: 15
  },
  arrowIcon: {
    color: '#FFF',
    marginTop: 15,
    marginRight: 15
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


