// @flow

'use strict';


import React, { Component } from 'react';
import { Alert, ActivityIndicator, Image, Text, View, StyleSheet, TouchableOpacity, FlatList  } from 'react-native';
import { FormatDate } from '../Utils/helpers';

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
    const response = await fetch('http://aretsdagar.nordiskamuseet.se/api/v1/views/traditions');
    const json = await response.json();
    this.setState({ data: json, isLoading: false });
  };

  render() {
    const imageDir = 'http://aretsdagar.nordiskamuseet.se/sites/default/files/styles/list_image/public/';

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => this.loadTradition(item)}>
              <View style={styles.row}>
                <Image
                  source={{ uri: imageDir + item.bild }}
                  style={styles.thumbnail}
                  defaultSource={require('AretsDagar/assets/default_thumb.jpg')}
                />
                <View style={styles.rowContent}>
                  <Text style={styles.rowText}>{item.title}</Text>
                  <Text style={styles.rowText}>{FormatDate(item.dates, item.multiple_dates)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item)=>item.nid}
          ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'#333333'}}/>}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      alignContent:'center',
      flexDirection: 'row',
      flexWrap:'wrap',
      justifyContent:'center'
  },
  row: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  rowContent: {
    paddingHorizontal: 10
  },
  rowText: {
    color: '#fff'
  },
  thumbnail: {
    height: 85,
    width: 105
  }
})
