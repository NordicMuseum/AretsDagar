// @flow

'use strict';

import React, { Component } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View  } from 'react-native';

export default class Instagram extends Component {
  state = {
    hashtag: null,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const insta_tag = this.props.insta_tag;
    if (insta_tag && insta_tag.length) {
      this.setState({ hashtag: insta_tag });
    }
  }

  render() {
    let hashtag = this.state.hashtag;
    let url = 'https://instagram.com/explore/tags/' + hashtag.substring(1);
    return (
      <View>
        <Text
          style={styles.labelWrapper}
          onPress={() => {Linking.openURL(url)}}
        >
          Instagram{' '}
          <Text style={styles.link}>{hashtag}</Text>
        </Text>
        <Text style={styles.info}>Lägg till en Instagrambild för den här dagen med hashtaggen {hashtag}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelWrapper: {
    backgroundColor: '#111',
    color: '#5f5f5f',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5
  },
  link: {
    color: '#fff'
  },
  info: {
    color: '#5f5f5f',
    paddingTop: 5,
    paddingRight: '20%',
    paddingBottom: 5,
    paddingLeft: '20%',
    textAlign: 'center'
  }
})
