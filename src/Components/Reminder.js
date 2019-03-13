// @flow


import React, { Component } from 'react';
import {
  AsyncStorage, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Reminder extends Component {
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
    const { nid } = this.props;
    const { title } = this.props;
    this.setState({
      nid,
      title,
    });
    this.setStatus(nid);
  }

  setStatus = async (nid) => {
    try {
      await AsyncStorage.getItem(`reminder:${nid}`).then((status) => {
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

  setReminder = async () => {
    const { status } = this.state;
    const { nid } = this.state;
    const { title } = this.state;
    if (status === 'inactive') {
      const reminder = {
        nid,
        title,
      };
      try {
        await AsyncStorage.setItem(`reminder:${nid}`, JSON.stringify(reminder)).then(() => {
          this.setState({
            status: 'active',
            textColor: '#f2d49c',
            iconColor: '#f2d49c'
          });
        });
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await AsyncStorage.removeItem(`reminder:${nid}`).then(() => {
          this.setState({
            status: 'inactive',
            textColor: '#fff',
            iconColor: '#5f5f5f'
          });
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  render() {
    const { status } = this.state;
    return (
      <TouchableOpacity style={styles.tabItem} onPress={this.setReminder}>
        <Icon name="alarm" size={25} style={{ color: this.state.iconColor }} />
        <Text style={{
          color: this.state.textColor,
          fontSize: 11,
          marginTop: 4
        }}
        >
Påminn
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
