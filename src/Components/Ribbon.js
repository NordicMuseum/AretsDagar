// @flow


import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Ribbon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doRender: false,
      day: null,
    };
  }

  _checkDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    // Calculate if we have a day for today or tomorrow.
    if (date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()) {
      return 'Idag';
    }
    if (date.getDate() == tomorrow.getDate() &&
      date.getMonth() == tomorrow.getMonth() &&
      date.getFullYear() == tomorrow.getFullYear()) {
      return 'Imorgon';
    }

    return false;
  }

  componentWillMount() {
    const dates = this.props.date.split(', ');
    for (let i = 0; i < dates.length; i += 1) {
      const day = this._checkDay(dates[i]);
      if (day) {
        // Since future days are also stored we break out to not override.
        this.setState({ doRender: true, day });
        break;
      }
    }
  }

  render() {
    const { doRender } = this.state;
    if (doRender) {
      return (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{this.state.day}</Text>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    backgroundColor: '#1d1d1d',
    transform: [{ rotate: '-40deg' }],
    top: 5,
    left: -25,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    width: 100
  },
  bannerText: {
    color: '#f2d49c',
    textAlign: 'center'
  }
});
