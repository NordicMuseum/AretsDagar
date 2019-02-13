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

      for (let [index, value] of linkData.entries()) {
        let linkText = value.replace(/<(?:.|\n)*?>/gm, '');
        let splitUrl = value.split('">');
        let linkUrl = splitUrl[0].replace('<a href="', '');
        let linkItem = {
          key: index,
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
    paddingBottom: 20,
    paddingLeft: 20,
    paddingBottom: 5
  }
})
