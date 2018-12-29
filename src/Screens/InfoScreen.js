// @flow

'use strict';

import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export const InfoScreen = () => {

  return (
    <ImageBackground source={require('./../../assets/info_bg.png')} style={{width: '100%', height: '100%'}}>
      <View>
        <Text style={styles.headerTextStyle}>
          Högtider och märkesdagar
        </Text>
        <Text style={styles.textBody}>Lorem ipsum dolor sit amet.</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerTextStyle: {
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  textBody: {
    justifyContent: 'center',
  }
});
