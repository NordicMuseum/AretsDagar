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
      };
      collapses.push(this._buildCollapse(collapse));
    }
    if (tradition.collection2_title && tradition.collection2_title.length) {
      let collapse = {
        key: 2,
        title: tradition.collection2_title,
        text: tradition.collection2_text,
      };
      collapses.push(this._buildCollapse(collapse));
    }
    if (tradition.collection3_title && tradition.collection3_title.length) {
      let collapse = {
        key: 3,
        title: tradition.collection3_title,
        text: tradition.collection3_text,
      };
      collapses.push(this._buildCollapse(collapse));
    }
    if (tradition.collection4_title && tradition.collection4_title.length) {
      let collapse = {
        key: 4,
        title: tradition.collection4_title,
        text: tradition.collection4_text,
      };
      collapses.push(this._buildCollapse(collapse));
    }
    this.setState({ accordion: collapses });
  }

  _buildCollapse(item) {
    return (
      <Collapse key={item.key}>
        <CollapseHeader>
          <View>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
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
  title: {
    backgroundColor: '#111111',
    color: '#5f5f5f',
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5
  },
  text: {
    color: '#fff',
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5
  }
})
