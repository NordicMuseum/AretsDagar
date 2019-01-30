// @flow

'use strict';


import React, { Component } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet, TouchableWithoutFeedback, FlatList  } from 'react-native';

export default class Calendar extends Component {
  state = {
    data: []
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch('http://dev.aretsdagar.se/api/v1/views/traditions');
    const json = await response.json();
    this.setState({ data: json, isLoading: false });
  };

  render() {
    const { navigate } = this.props.navigation;
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
          data={this.state.data}
          renderItem={({item, index}) => (
            <TouchableWithoutFeedback onPress={() => navigate.navigate('Tradition', { id: item }}>
              <View style={styles.rowStyle}>
                <Text style={styles.rowTextStyle}>{item.title}</Text>
              </View>
            </TouchableWithoutFeedback>
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
  },
  rowTextStyle: {
    color: '#fff',
  }
})
