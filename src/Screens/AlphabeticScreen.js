// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, FlatList  } from 'react-native';
import { FormatDate } from '../Utils/helpers';

export default class Alphabetic extends Component {
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

  loadTradition(item) {
    this.props.navigation.navigate(
      'Tradition',
      {
        id: item.nid,
        title: item.title
      }
    );
  }

  fetchData = async () => {
    const response = await fetch('http://aretsdagar.nordiskamuseet.se/api/v1/views/traditions_alphabetic');
    const json = await response.json();
    this.setState({ data: json, isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, marginTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item, separators}) => (
            <TouchableHighlight
              onPress={() => this.loadTradition(item)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={styles.rowStyle}>
                <Text style={styles.rowTextStyle}>{item.title}</Text>
                <Text style={styles.rowText}>{FormatDate(item.dates, item.multiple_dates)}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item)=>item.nid}
          ItemSeparatorComponent={()=><View style={{ height: 0.5, backgroundColor: '#333333' }}/>}
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
    justifyContent:'center'
  },
  rowStyle: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  rowTextStyle: {
    color: '#fff',
    fontSize: 16,
  },
  rowText: {
    color: '#5f5f5f',
    fontSize: 12,
    fontWeight: 'bold'
  }
})
