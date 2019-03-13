// @flow


import React, { Component } from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator
} from 'react-native';

export default class Loader extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={styles.loader}>
        <Text style={styles.loaderText}>
          Laddar innehåll…
        </Text>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    backgroundColor: '#1d1d1d',
    flex: 1,
    paddingTop: 30,
    color: '#fff'
  },
  loaderText: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 30,
    color: '#fff'
  }
});
