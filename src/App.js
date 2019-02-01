// @flow

'use strict';

import React, {Component} from 'react';
import { Platform, StyleSheet, Button, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CalendarScreen from './Screens/CalendarScreen';
import AlphabeticScreen from './Screens/AlphabeticScreen';
import { InfoScreen } from './Screens/InfoScreen';
import TraditionScreen from './Screens/TraditionScreen';


class Calendar extends React.Component {
  render() {
    return (
      <View style={baseStyles}>
        <CalendarScreen navigation={this.props.navigation} />
      </View>
    );
  }
}

class Alphabetic extends React.Component {
  render() {
    return (
      <View style={baseStyles}>
        <AlphabeticScreen />
      </View>
    );
  }
}

class Info extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <InfoScreen />
      </View>
    );
  }
}

class Reminders extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <InfoScreen />
      </View>
    );
  }
}

class Tradition extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TraditionScreen navigation={this.props.navigation} />
      </View>
    );
  }
}

const CalendarStack = createStackNavigator({
  Calendar: {
    screen: Calendar,
    navigationOptions: () => ({
      title: 'Calendar',
      headerBackTitle: null
    }),
  },
  Tradition: {
    screen: Tradition,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerBackTitle: 'Tillbaka' // @TODO Doesn't work...
    }),
  }
}, {initialRouteName: 'Calendar'});

const RouteConfigs = {
  Calendar: {
    screen: CalendarStack,
    navigationOptions: () => ({
      title: 'Dagar'
    }),
  },
  Alphabetic: {
    screen: Alphabetic,
    navigationOptions: () => ({
      title: 'Lista A - Ö'
    }),
  },
  Reminders: {
    screen: Reminders,
    navigationOptions: () => ({
      title: 'Påminnelser'
    }),
  },
  Info: {
    screen: Info,
    navigationOptions: () => ({
      title: 'Info'
    }),
  },
};

const TabNavigatorConfig = {
  initialRouteName: 'Calendar',
  swipeEnabled: false,
  lazy: true,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#e26901',
    labelStyle: {
      fontSize: 12,
    },
    allowFontScaling: false,
  },
};

const baseStyles = {
  backgroundColor: '#1d1d1d',
  flex: 1,
}

const TabsView = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default createAppContainer(TabsView);
