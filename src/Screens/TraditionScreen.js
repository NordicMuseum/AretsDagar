// @flow

'use strict';

import React, { Component } from 'react';
import { Alert, ActivityIndicator, Text, View, Image, StyleSheet  } from 'react-native';

export default class Tradition extends Component {
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
    const id = this.props.navigation.getParam('id');

    this.fetchData(id);
  }

  fetchData = async (id) => {
    const response = await fetch('http://dev.aretsdagar.se/api/v1/views/tradition?nid='+id);
    const json = await response.json();
    this.setState({ data: json, isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    else {
      const tradition = this.state.data[0];
      const formattedDate = formatDate(tradition.dates, null);

      return (
        <View style={styles.container}>
          <View style={styles.wrapper}>
          <Image
            style={{flex: 1, resizeMode: "cover", height: 250, width: null}}
            source={{uri: 'http://aretsdagar.nordiskamuseet.se/sites/default/files/styles/top_image/public/' + tradition.bild}}
          />
          </View>
          <Text style={[{flex: 2}, styles.text]}>{formattedDate}</Text>
          <Text style={[{flex: 3}, styles.text]}>{tradition.title}</Text>
          <View style={{flex: 2}}>
            <Text style={styles.text}>ASDF</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent:'center',
    backgroundColor: '#1d1d1d',
    flex:1,
    flexDirection: 'column',
  },
  wrapper: {
    flex:1,
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
  }
})

const formatDate = function(dates_string, multiple) {
  const month_str = {
    0 : "januari",
    1 : "februari",
    2 : "mars",
    3 : "april",
    4 : "maj",
    5 : "juni",
    6 : "juli",
    7 : "augusti",
    8 : "september",
    9 : "oktober",
    10 : "november",
    11 : "december"
  };

  // Fetching all dates from Drupal but we just set next as date.
  const dates = dates_string.split(', ');
  let day = null;
  let formatted = null;
  for (let d of dates) {
    const date = new Date();
    const unix_now = Math.round(+date.setHours(0, 0, 0, 0) / 1000);

    if (d < unix_now)
      continue;
    const date_stamp = parseInt(d) * 1000;
    // if (isAndroid) {
    //   date_stamp = date_stamp + (1000 * 60 * 60 * 4);
    // }
    const date_obj = new Date(date_stamp);
    let day = null;
    if (multiple) {
      day = multiple;
    } else {
      day = date_obj.getDate();
    }
    const month = month_str[date_obj.getMonth()];
    formatted = day + ' ' + month;
    break;
  }
  return formatted;
};
