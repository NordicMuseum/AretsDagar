// @flow


import React, { Component } from 'react';
import {
  Image, Text, TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HeaderTitle extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Image
          source={require('AretsDagar/assets/logo.png')}
          style={{ width: 100, height: 35, paddingBottom: 3 }}
        />
      </View>
    )
  }
}
