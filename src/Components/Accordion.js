// @flow

'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View  } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

export default class Accordion extends Component {
  state = {
    accordion: [],
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const tradition = this.props.tradition;
    let collapses = [];

    // @TODO
    if (tradition.collection1_title && tradition.collection1_title.length) {
      let collapse = {
        key: 1,
        title: tradition.collection1_title,
        text: tradition.collection1_text,
        image: tradition.collection1_image,
      };
      collapses.push(this._buildCollapse(collapse));
    }
    if (tradition.collection2_title && tradition.collection2_title.length) {
      let collapse = {
        key: 2,
        title: tradition.collection2_title,
        text: tradition.collection2_text,
        image: tradition.collection2_image,
      };
      collapses.push(this._buildCollapse(collapse));
    }
    if (tradition.collection3_title && tradition.collection3_title.length) {
      let collapse = {
        key: 3,
        title: tradition.collection3_title,
        text: tradition.collection3_text,
        image: tradition.collection3_image,
      };
      collapses.push(this._buildCollapse(collapse));
    }
    if (tradition.collection4_title && tradition.collection4_title.length) {
      let collapse = {
        key: 4,
        title: tradition.collection4_title,
        text: tradition.collection4_text,
        image: tradition.collection4_image,
      };
      collapses.push(this._buildCollapse(collapse));
    }
    this.setState({ accordion: collapses });
  }

  _buildCollapse(item) {
    const imageDir = 'http://aretsdagar.nordiskamuseet.se/sites/default/files/styles/content_image/public/';
    return (
      <Collapse key={item.key}>
        <CollapseHeader style={styles.header}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={{ uri: imageDir + item.image }}
            />
          </View>
          <Text style={styles.text}>{item.text}</Text>
        </CollapseBody>
      </Collapse>
    );
  }

  render() {
    return (
      this.state.accordion
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#111',
    borderBottomColor: '#5f5f5f',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  title: {
    color: '#5f5f5f',
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  image: {
    height: 300,
    width: 300
  },
  text: {
    color: '#fff',
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5
  }
})
