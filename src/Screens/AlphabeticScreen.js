// @flow

'use strict';


import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, FlatList  } from 'react-native';

export default class Alphabetic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    }
  }

  componentDidMount() {
    return fetch('http://dev.aretsdagar.se/api/v1/views/traditions_alphabetic')
      .then((response) => response.json())
      .then((responseJson) => {
       // just setState here e.g.
       this.setState({ dataSource: responseJson, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item, separators}) => (
            <TouchableHighlight
              onPress={() => _onPress(item)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={styles.rowStyle}>
                <Text style={styles.rowTextStyle}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex:1,
      alignItems: 'center',
      alignContent:'center',
      flexDirection: 'row',
      flexWrap:'wrap',
      justifyContent:'center',
  },
  rowStyle: {
    height: 50,
    justifyContent: 'center',
    // paddingLeft: 10;
  },
  rowTextStyle: {
    color: '#fff',
  }
})
