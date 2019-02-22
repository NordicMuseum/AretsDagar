// @flow

'use strict';

import React, { Component } from 'react';
import { Linking, StyleSheet, Text, View  } from 'react-native';

export default class ExternalLinks extends Component {
  state = {
    linkList: [],
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const tradition = this.props.tradition;
    if (tradition.links && tradition.links.length) {
      let links = [];
      let linkData = tradition.links.split(', ');

      for (let i = 0; i < linkData.entries().length; i +=1) {
        let linkText = linkData[i].replace(/<(?:.|\n)*?>/gm, '');
        let splitUrl = linkData[i].split('">');
        let linkUrl = splitUrl[0].replace('<a href="', '');
        let linkItem = {
          key: i,
          url: linkUrl,
          text: linkText,
        };
        links.push(this._buildLink(linkItem));
      }
      this.setState({ linkList: links });
    }
  }

  _buildLink(item) {
    return (
      <View key={item.key}>
        <Text
            style={styles.link}
            onPress={() => {Linking.openURL(item.url)}}
          >
          {item.text}
        </Text>
      </View>
    );
  }

  render() {
    return (
      this.state.linkList
    );
  }
}

const styles = StyleSheet.create({
  link: {
    color: '#fff',
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5
  }
})
