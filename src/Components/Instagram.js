// @flow


import React, { Component } from 'react';
import {
  Linking, StyleSheet, Text, View
} from 'react-native';

export default class Instagram extends Component {
  state = {
    hashtag: null,
  };

  componentWillMount() {
    const { instaTag } = this.props;
    if (instaTag && instaTag.length) {
      this.setState({ hashtag: instaTag });
    }
  }

  render() {
    const { hashtag } = this.state;
    const url = `https://instagram.com/explore/tags/${hashtag.substring(1)}`;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.info}>
          Lägg till en Instagrambild för den här dagen med hashtaggen
          <Text
            style={styles.link}
            onPress={() => { Linking.openURL(url); }}
          > {hashtag}
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 15
  },
  link: {
    color: '#fff'
  },
  info: {
    color: '#7f7f7f',
    paddingTop: 5,
    paddingRight: '20%',
    paddingBottom: 5,
    paddingLeft: '20%',
    textAlign: 'center'
  }
});
