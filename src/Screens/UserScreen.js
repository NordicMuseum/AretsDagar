// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class UserScreen extends Component {
  state = {
    reminders: [],
    celebrations: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchData();
      },
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  fetchData = async () => {
    let reminders = [];
    let celebrations = [];
    try {
      await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            // @TODO Seperate celebrations from reminders and exclude cache.
            let item = store[i][0].split(':');
            if (item[1].length) {
              let type = item[0];
              console.log(type);
              if (type === 'reminder') {
                let reminder = JSON.parse(store[i][1]);
                console.log(reminder);
                reminders.push(reminder);
              }
            }
          });
        });
      });
    } catch (error) {
      alert(error.message);
    }
    this.setState({ reminders: reminders, isLoading: false });
  };

  render () {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    }
    else {
      console.log(this.state.reminders);
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.reminders}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => alert('test')}>
                <View style={styles.row}>
                  <Text style={styles.rowText}>{item.title}</Text>
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1d1d',
    flex: 1
  },
  loader: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#1d1d1d'
  },
  row: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  rowText: {
    color: '#fff'
  },
});
