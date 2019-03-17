// @flow


import React, { Component } from 'react';
import {
  Text, TextInput, View, StyleSheet, TouchableHighlight, FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from 'react-native-config';
import { FormatDate } from '../Utils/helpers';
import Gs from '../Utils/styles';
import Loader from '../Components/Loader';

export default class Alphabetic extends Component {
  state = {
    data: [],
    searchInput: '',
    searchData: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.arrayholder = [];
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch(`${Config.NM_API_URL}views/traditions_alphabetic`);
    const json = await response.json();
    this.setState({ data: json, searchData: json, isLoading: false });
    this.arrayholder = json;
  };

  loadTradition(item) {
    this.props.navigation.navigate(
      'Tradition',
      {
        id: item.nid,
        title: item.title
      }
    );
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter((item) => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      searchData: newData,
      searchInput: text
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loader />
      );
    }

    let data = [];
    if (this.state.searchInput) {
      data = this.state.searchData.filter(item => item.title.includes(this.state.searchInput));
    } else {
      data = this.state.data;
    }
    return (
      <View>
        <View style={styles.searchWrapper}>
          <Icon name="search" style={styles.searchIcon} size={18} />
          <TextInput
            style={styles.input}
            placeholder="Sök efter dag"
            placeholderTextColor="#7f7f7f"
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.searchInput}
          />
        </View>
        <View>
          <FlatList
            data={data}
            renderItem={({ item, separators }) => (
              <TouchableHighlight
                onPress={() => this.loadTradition(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
              >
                <View style={Gs.row}>
                  <View style={styles.rowStyle}>
                    <Text style={styles.rowTextStyle}>{item.title}</Text>
                    <View style={Gs.celebRow}>
                        <Icon name="favorite" style={Gs.celebIcon} size={16} />
                        <Text style={Gs.date}>{FormatDate(item.dates, item.multiple_days)}</Text>
                      </View>
                  </View>
                  <View style={Gs.nextWrapper}>
                    <Icon name="navigate-next" size={30} style={Gs.next} />
                  </View>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.nid}
            ItemSeparatorComponent={() => <View style={Gs.listSeparator} />}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listWrapper: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  searchWrapper: {
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: '#5f5f5f',
    borderRadius: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  searchIcon: {
    color: '#7f7f7f',
    padding: 10
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0
  },
  rowStyle: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  rowTextStyle: {
    color: '#fff',
    fontSize: 16,
  }
});
