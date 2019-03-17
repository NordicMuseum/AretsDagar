// @flow


import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class BackButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="chevron-left" color={'#fff'} size={30} />
        <Text style={styles.backButtonText}>Tillbaka</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  backButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  backButtonText: {
    color: '#fff'
  }
});
