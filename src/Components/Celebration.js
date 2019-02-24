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
      await AsyncStorage.getItem('celebration:' + nid).then((status) => {
        if (status !== null) {
          this.setState({
            status: 'active',
            textColor: '#f2d49c',
            iconColor: '#f2d49c'
          });
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
    // Dialog for FB share.
    Alert.alert(
      '',
      'Visa att du firar på Facebook?',
      [
        {
          text: 'Ja!',
          onPress: () => console.log('Ja.')
        },
        {
          text: 'Nej',
          onPress: () => console.log('Nej.'),
        },
      ],
      {cancelable: false},
    );

    // var shareImage = 'http://aretsdagar.nordiskamuseet.se/sites/default/files/styles/list_image/public/' + tradition[0].bild;
    // var celebrateTitle = 'Jag firar ' + tradition[0].title + '!';
    // var share = require('lib/share');
    // share.createShare(celebrateTitle, tradition[0].url, shareImage);

    // if (status === 'inactive') {
    //   let celebration = {
    //     'nid': nid,
    //     'title': title,
    //   }
    //   try {
    //     await AsyncStorage.setItem('celebration:' + nid, JSON.stringify(celebration)).then(() => {
    //       this.setState({
    //         status: 'active',
    //         textColor: '#f2d49c',
    //         iconColor: '#f2d49c'
    //       });
    //     });
    //   } catch (error) {
    //     alert(error.message);
    //   }
    // }
    // else {
    //   try {
    //     await AsyncStorage.removeItem('celebration:' + nid).then(() => {
    //       this.setState({
    //         status: 'inactive',
    //         textColor: '#fff',
    //         iconColor: '#5f5f5f'
    //       });
    //     });
    //   } catch (error) {
    //     alert(error.message);
    //   }
    // }
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


// Works on both iOS and Android
// Alert.alert(
//   'Alert Title',
//   'My Alert Msg',
//   [
//     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
//     {
//       text: 'Cancel',
//       onPress: () => console.log('Cancel Pressed'),
//       style: 'cancel',
//     },
//     {text: 'OK', onPress: () => console.log('OK Pressed')},
//   ],
//   {cancelable: false},
// );
