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
      <View style={styles.wrapper}>
        <Text style={styles.info}>Lägg till en Instagrambild för den här dagen
        med hashtaggen <Text style={styles.link} onPress={() => {Linking.openURL(url)}}
        >{hashtag}</Text></Text>
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
})
