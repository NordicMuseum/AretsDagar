// @flow

'use strict';

import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Celebration extends Component {
  state = {
    nid: null,
    title: null,
    status: 'inactive',
    textColor: '#fff',
    iconColor: '#5f5f5f'
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const nid = this.props.tradition.nid;
    this.setState({
      nid: nid,
      title: this.props.tradition.title,
    });
    this.setStatus(nid);
  }

  setStatus = async (nid) => {
    try {
      await AsyncStorage.getItem('celebration:' + nid).then((status) => {
        if (status !== null) {
          if (Object.keys(status).length === 0 && status.constructor === Object) {
            this.setState({
              status: 'active',
              textColor: '#f2d49c',
              iconColor: '#f2d49c'
            });
          }
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  setCelebration = async () => {
    let status = this.state.status;
    let nid = this.state.nid;
    let title = this.state.title;

    if (status === 'inactive') {
      let celebration = {
        nid: nid,
        title: title,
      }
      try {
        await AsyncStorage.setItem('celebration:' + nid, JSON.stringify(celebration)).then(() => {
          this.setState({
            status: 'active',
            textColor: '#f2d49c',
            iconColor: '#f2d49c'
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
      <TouchableOpacity style={styles.tabItem} onPress={this.setCelebration}>
        <Icon name="favorite" size={25} style={{color: this.state.iconColor}}/>
        <Text style={{
          color: this.state.textColor,
          fontSize: 11,
          marginTop: 4
        }}>Fira</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
