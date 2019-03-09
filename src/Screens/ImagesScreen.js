// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ImageScreen extends Component {
  state = {
    image: null,
    text: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      status: true,
    }
  }

  componentWillMount() {
    const dir = 'http://aretsdagar.nordiskamuseet.se/sites/default/files/styles/full_image/public/';
    const image = this.props.navigation.getParam('image');
    const imageText = this.props.navigation.getParam('imageText');
    this.setState({ image: dir + image, text: imageText, isLoading: false });
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
          <Image
            style={styles.image}
            source={{ uri: this.state.image }}
          />
          {this.state.status ? <View style={styles.textWrapper}>
            <TouchableOpacity style={styles.closeWrapper} onPress={() => this.setState({status: false})}>
              <Icon name="highlight-off" size={30} style={styles.close}/>
            </TouchableOpacity>
            <ScrollView style={styles.scroll}>
              <Text style={styles.text}>{this.state.text}</Text>
            </ScrollView>
          </View> : null}
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
  closeWrapper: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'absolute',
    right: 5,
    top: -30
  },
  close: {
    color: '#fff'
  },
  image: {
    flex: 1,
  },
  textWrapper: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    bottom: 0,
    height: 200,
    left: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 100
  },
  scroll: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    color: '#fff'
  }
})
