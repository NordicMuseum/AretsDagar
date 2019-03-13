// @flow


import React, { Component } from 'react';
import {
  Linking, StyleSheet, Text, View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ExternalLinks extends Component {
  state = {
    linkList: [],
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { tradition } = this.props;
    if (tradition.links && tradition.links.length) {
      const links = [];
      const linkData = tradition.links.split(', ');

      for (let i = 0; i < linkData.length; i += 1) {
        const linkText = linkData[i].replace(/<(?:.|\n)*?>/gm, '');
        const splitUrl = linkData[i].split('">');
        const linkUrl = splitUrl[0].replace('<a href="', '');
        const linkItem = {
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
        {item.key === 0 && <Text style={styles.label}>Läs mer</Text>}
        <Text
          style={styles.link}
          onPress={() => { Linking.openURL(item.url); }}
        >
          {this.props.tradition.title}
          {' '}
på
          {item.text}
          <Icon name="launch" size={14} style={styles.linkicon} />
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
  label: {
    backgroundColor: '#111',
    color: '#7f7f7f',
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  link: {
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  linkicon: {
    paddingLeft: 10
  }
});
