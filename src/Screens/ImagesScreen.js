// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ImageScreen extends Component {
  state = {
    image: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentWillMount() {
    const dir = 'http://aretsdagar.nordiskamuseet.se/sites/default/files/styles/full_image/public/';
    const image = this.props.navigation.getParam('image');
    this.setState({ image: dir + image, isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="highlight-off" size={30} style={styles.close}/>
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={{ uri: this.state.image }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1d1d',
    flex: 1
  },
  loader: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#1d1d1d'
  },
  close: {
    alignSelf: 'flex-end',
    color: '#fff'
  },
  image: {
    flex: 1,
  }
})
