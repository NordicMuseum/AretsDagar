// @flow

'use strict';

import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Reminder extends Component {
  state = {
    nid: null,
    title: null,
    status: 'inactive',
    color: '#fff',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const nid = this.props.nid;
    const title = this.props.title;
    this.setState({
      nid: nid,
      title: title,
    });
    this.setStatus(nid);
  }

  setStatus = async (nid) => {
    try {
      await AsyncStorage.getItem('reminder:' + nid).then((status) => {
        if (status !== null) {
          this.setState({
            status: 'active',
            color: '#f2d49c',
          });
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  setReminder = async () => {
    let status = this.state.status;
    let nid = this.state.nid;
    let title = this.state.title;
    if (status === 'inactive') {
      let reminder = {
        'nid': nid,
        'title': title,
      }
      try {
        await AsyncStorage.setItem('reminder:' + nid, JSON.stringify(reminder)).then(() => {
          this.setState({
            status: 'active',
            color: '#f2d49c',
          });
        });
      } catch (error) {
        alert(error.message);
      }
    }
    else {
      try {
        await AsyncStorage.removeItem('reminder:' + nid).then(() => {
          this.setState({
            status: 'inactive',
            color: '#fff',
          });
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  render() {
    let status = this.state.status;
    return (
      <TouchableOpacity style={styles.tabItem} onPress={this.setReminder}>
        <Icon name="alarm" size={25} style={styles.tabIcon}/>
        <Text style={styles.tabTitle, {color: this.state.color}}>Påminn</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabTitle: {
    fontSize: 11,
    marginTop: 4
  },
  tabIcon: {
    color: '#5f5f5f'
  }
})
