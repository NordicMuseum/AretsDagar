// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class UserScreen extends Component {
  state = {
    reload: null
  };

  _emptyText = (text) => {
    return(
      <View style={styles.empty}>
          <Text style={styles.emptyText}>Inga {text}</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      reminders: [],
      celebrations: []
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
            // Seperate celebrations from reminders and exclude cache.
            let item = store[i][0].split(':');
            if (item[1].length) {
              let type = item[0];
              if (type === 'reminder') {
                let reminder = JSON.parse(store[i][1]);
                reminders.push(reminder);
              }
              else if (type === 'celebration') {
                let celebration = JSON.parse(store[i][1]);
                celebrations.push(celebration);
              }
            }
          });
          reminders.push({nid: '0'});
          celebrations.push({nid: '0'});
        });
      });
    } catch (error) {
      alert(error.message);
    }
    this.setState({ celebrations: celebrations, reminders: reminders, isLoading: false });
  };

  deleteReminder = async (nid) => {
    try {
      await AsyncStorage.removeItem('reminder:' + nid).then(() => {
        // @TODO Give user feedback?
        const filteredData = this.state.reminders.filter(item => item.nid !== nid);
        this.setState({ reminders: filteredData });
      });
    } catch (error) {
      alert(error.message);
    }
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>Påminnelser</Text>
          </View>
          <FlatList
            data={this.state.reminders}
            renderItem={({item, index}) => (
              <View style={styles.row}>
                <Text style={styles.rowText}>{item.title}</Text>
                <TouchableOpacity style={styles.tabItem} onPress={() => this.deleteReminder(item.nid)}>
                  <Icon name="clear" size={25} style={styles.remove}/>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item)=>item.nid}
            ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'#333333'}}/>}
            extraData={this.state}
            ListEmptyComponent={this._emptyText('påminnelser')}
          />
          <View style={styles.section}>
            <Text style={styles.sectionText}>Firanden</Text>
          </View>
          <FlatList
            data={this.state.celebrations}
            renderItem={({item, index}) => (
              <View style={styles.row}>
                <Text style={styles.rowText}>{item.title}</Text>
              </View>
            )}
            keyExtractor={(item)=>item.nid}
            ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'#333333'}}/>}
            extraData={this.state}
            ListEmptyComponent={this._emptyText('firanden')}
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
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  rowText: {
    color: '#fff'
  },
  section: {
    backgroundColor: '#222',
    borderBottomColor: '#5f5f5f',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  sectionText: {
    color: '#fff',
    fontSize: 18
  },
  remove: {
    color: '#5f5f5f'
  },
  empty: {
    alignItems: 'center',
    paddingTop: 10
  },
  emptyText: {
    color: '#5f5f5f'
  }
});
