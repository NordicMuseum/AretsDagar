// @flow

'use strict';

import React, {Component} from 'react';
import { Button, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CalendarScreen from './Screens/CalendarScreen';
import AlphabeticScreen from './Screens/AlphabeticScreen';
import InfoScreen from './Screens/InfoScreen';
import UserScreen from './Screens/UserScreen';
import TraditionScreen from './Screens/TraditionScreen';
import MapScreen from './Screens/MapScreen';
import ImagesScreen from './Screens/ImagesScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Calendar extends React.Component {
  render() {
    return (
      <SafeAreaView style={baseStyles}>
        <StatusBar
          barStyle="light-content"
        />
        <CalendarScreen navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

class Alphabetic extends React.Component {
  render() {
    return (
      <SafeAreaView style={baseStyles}>
        <AlphabeticScreen navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

class Info extends React.Component {
  render() {
    return (
      <SafeAreaView style={baseStyles}>
        <InfoScreen />
      </SafeAreaView>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <SafeAreaView style={baseStyles}>
        <UserScreen navigation={this.props.navigation}/>
      </SafeAreaView>
    );
  }
}

class Tradition extends React.Component {
  render() {
    return (
      <SafeAreaView style={baseStyles}>
        <TraditionScreen navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

class Map extends React.Component {
  render() {
    return (
      <SafeAreaView style={baseStyles}>
        <MapScreen navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

class Images extends React.Component {
  render() {
    return (
      <SafeAreaView style={baseStyles}>
        <ImagesScreen navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const TraditionStack = createStackNavigator({
  Tradition: {
    screen: Tradition,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <View style={{flex:1, flexDirection:'row', justifyContent:'center', zIndex: 100}}>
          <Image
            source={require('AretsDagar/assets/logo.png')}
            style={{ width:100, height: 35, paddingBottom: 3 }}
          />
        </View>
      ),
      headerLeft: <TouchableOpacity
        onPress = {() => navigation.goBack(null)} >
        <Text style={backButtonStyles}>Tillbaka</Text>
        </TouchableOpacity>
    }),
  },
  Map: {
    screen: Map,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Image
            source={require('AretsDagar/assets/logo.png')}
            style={{ width:100, height: 35, paddingBottom: 3 }}
          />
        </View>
      ),
      headerLeft: <TouchableOpacity
        onPress = {() => navigation.navigate('Tradition')} >
        <Text style={backButtonStyles}>Tillbaka</Text>
        </TouchableOpacity>
    }),
  },
  Images: {
    screen: Images,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Image
            source={require('AretsDagar/assets/logo.png')}
            style={{ width:100, height: 35, paddingBottom: 3 }}
          />
        </View>
      ),
      headerLeft: <TouchableOpacity
        onPress = {() => navigation.navigate('Tradition')} >
        <Text style={backButtonStyles}>Tillbaka</Text>
        </TouchableOpacity>
    }),
  }
}, {initialRouteName: 'Tradition'});

const UserStack = createStackNavigator({
  User: {
    screen: User,
    navigationOptions: ({navigation}) => ({
      title: 'User',
      headerBackTitle: 'Tillbaka',
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Image
            source={require('AretsDagar/assets/logo.png')}
            style={{ width:100, height: 35, paddingBottom: 3 }}
          />
        </View>
      ),
      headerRight:
        <View>
        {navigation.getParam('update') ?
        <TouchableOpacity
        onPress = {() => navigation.setParams({update: false})} >
        <Text style={changeButtonStyles}>Avbryt</Text>
        </TouchableOpacity>
        : <TouchableOpacity
        onPress = {() => navigation.setParams({update: true})} >
        <Text style={changeButtonStyles}>Ändra</Text>
        </TouchableOpacity>}
        </View>
    }),
  },
  Tradition: {
    screen: TraditionStack,
    navigationOptions: ({ navigation }) => ({
      header: null,
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
    }),
  }
}, {initialRouteName: 'User'});

const InfoStack = createStackNavigator({
  Info: {
    screen: Info,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Image
            source={require('AretsDagar/assets/logo.png')}
            style={{ width:100, height: 35, paddingBottom: 3 }}
          />
        </View>
      ),
    }),
  },
});

const CalendarStack = createStackNavigator({
  Calendar: {
    screen: Calendar,
    navigationOptions: ({ navigation }) => ({
      title: 'Calendar',
      headerBackTitle: 'Tillbaka',
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Image
            source={require('AretsDagar/assets/logo.png')}
            style={{ width:100, height: 35, paddingBottom: 3 }}
          />
        </View>
      ),
    }),
  },
  Tradition: {
    screen: TraditionStack,
    navigationOptions: ({ navigation }) => ({
      header: null,
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
    }),
  }
}, {initialRouteName: 'Calendar'});

const AlphabeticStack = createStackNavigator({
  Alphabetic: {
    screen: Alphabetic,
    navigationOptions: ({ navigation }) => ({
      title: 'Alphabetic',
      headerBackTitle: 'Tillbaka',
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Image
            source={require('AretsDagar/assets/logo.png')}
            style={{ width:100, height: 35, paddingBottom: 3 }}
          />
        </View>
      ),
    }),
  },
  Tradition: {
    screen: TraditionStack,
    navigationOptions: ({ navigation }) => ({
      header: null,
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
    }),
  }
}, {initialRouteName: 'Alphabetic'});

const RouteConfigs = {
  Calendar: {
    screen: CalendarStack,
    navigationOptions: () => ({
      tabBarLabel: 'Dagar',
      tabBarIcon: ({tintColor}) => (
        <Icon name="date-range" color={tintColor} size={24} />
      )
    }),
  },
  Alphabetic: {
    screen: AlphabeticStack,
    navigationOptions: () => ({
      tabBarLabel: 'Lista A - Ö',
      tabBarIcon: ({tintColor}) => (
        <Icon name="view-list" color={tintColor} size={24} />
      )
    }),
  },
  User: {
    screen: UserStack,
    navigationOptions: () => ({
      tabBarLabel: 'Mina dagar',
      tabBarIcon: ({tintColor}) => (
        <Icon name="person" color={tintColor} size={24} />
      )
    }),
  },
  Info: {
    screen: InfoStack,
    navigationOptions: () => ({
      tabBarLabel: 'Info',
      tabBarIcon: ({tintColor}) => (
        <Icon name="info" color={tintColor} size={24} />
      )
    }),
  },
};

const TabNavigatorConfig = {
  initialRouteName: 'Calendar',
  swipeEnabled: false,
  lazy: true,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#f2d49c',
    labelStyle: {
      fontSize: 12,
    },
    allowFontScaling: false,
    style: {
      backgroundColor: '#111',
    }
  },
};

const baseStyles = {
  backgroundColor: '#1d1d1d',
  flex: 1
}

const backButtonStyles = {
  color: '#fff',
  marginLeft: 20
}

const changeButtonStyles = {
  color: '#fff',
  marginRight: 20
}

const TabsView = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default createAppContainer(TabsView);
