// @flow

'use strict';

import React, { Component } from 'react';
import { Alert, ActivityIndicator, Image, Text, View, StyleSheet, TouchableOpacity, FlatList  } from 'react-native';
import { FormatDate, FormatIntro } from '../Utils/helpers';

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
              onPress={() => this.loadTradition(item)}
              style={styles.rowWrapper}>
              <View style={styles.row}>
                <Image
                  source={{ uri: imageDir + item.bild }}
                  style={styles.thumbnail}
                  defaultSource={require('AretsDagar/assets/default_thumb.jpg')}
                />
                <View style={styles.rowContent}>
                  <Text style={styles.rowText}>{item.title}</Text>
                  <Text style={styles.date}>{FormatDate(item.dates, item.multiple_dates)}</Text>
                  <Text style={styles.intro}>{FormatIntro(item.intro)}</Text>
                </View>
              </View>
              <Text style={styles.celebrations}><Text style={{color: '#fff'}}>{item.celebrations}</Text> FIRANDEN</Text>
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
  rowWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowContent: {
    paddingHorizontal: 10
  },
  rowText: {
    color: '#fff',
    fontSize: 15,
  },
  date: {
    color: '#5f5f5f',
    fontSize: 12,
    fontWeight: 'bold'
  },
  intro: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    width: 170
  },
  thumbnail: {
    height: 85,
    width: 105
  },
  celebrations: {
    color: '#5f5f5f',
    fontSize: 13,
    marginTop: 5
  }
})
