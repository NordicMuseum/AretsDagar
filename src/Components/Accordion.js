// @flow


import React, { Component } from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      collection: null
    };
  }

  componentWillMount() {
    const { collection } = this.props;
    this.setState({ collection });
  }

  openImage = (image, imageText) => {
    const { navigation } = this.props;
    navigation.navigate('Images', {
      image,
      imageText,
    });
  }

  render() {
    const imageDir = 'http://aretsdagar.nordiskamuseet.se/sites/default/files/styles/content_image/public/';
    const { collection } = this.state;
    const { key } = collection;
    const { collapsed } = this.state;
    const name = collapsed ? 'expand-less' : 'expand-more';
    return (
      <Collapse
        key={key}
        isCollapsed={collapsed}
        onToggle={(isCollapsed) => {
          if (isCollapsed) {
            this.setState({ collapsed: true });
          } else {
            this.setState({ collapsed: false });
          }
        }}
      >
        <CollapseHeader style={styles.header}>
          <View style={styles.colHeader}>
            <Text style={styles.title}>{collection.title}</Text>
            <Icon style={styles.colIcon} size={20} name={name} />
          </View>
        </CollapseHeader>
        <CollapseBody>
          {collection.image.length ?
            <TouchableWithoutFeedback onPress={() => this.openImage(
              collection.image, collection.imageText
            )}
            >
              <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{ uri: imageDir + collection.image }} />
                <TouchableOpacity
                  style={styles.enlarge}
                  onPress={() => this.openImage(collection.image, collection.imageText)}
                >
                  <Icon name="zoom-in" size={30} style={styles.enlargeIcon} />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
            : null}
          <Text style={styles.text}>{collection.text}</Text>
        </CollapseBody>
      </Collapse>
    );
  }
}

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [],
    };
  }

  componentWillMount() {
    const { tradition } = this.props;
    const collapses = [];

    // Structure our data.
    if (tradition.collection1_title && tradition.collection1_title.length) {
      const collapse = {
        key: 1,
        title: tradition.collection1_title,
        text: tradition.collection1_text,
        image: tradition.collection1_image,
        imageText: tradition.field_collection1_image_text,
      };
      collapses.push(collapse);
    }
    if (tradition.collection2_title && tradition.collection2_title.length) {
      const collapse = {
        key: 2,
        title: tradition.collection2_title,
        text: tradition.collection2_text,
        image: tradition.collection2_image,
        imageText: tradition.field_collection2_image_text,
      };
      collapses.push(collapse);
    }
    if (tradition.collection3_title && tradition.collection3_title.length) {
      const collapse = {
        key: 3,
        title: tradition.collection3_title,
        text: tradition.collection3_text,
        image: tradition.collection3_image,
        imageText: tradition.field_collection3_image_text,
      };
      collapses.push(collapse);
    }
    if (tradition.collection4_title && tradition.collection4_title.length) {
      const collapse = {
        key: 4,
        title: tradition.collection4_title,
        text: tradition.collection4_text,
        image: tradition.collection4_image,
        imageText: tradition.field_collection4_image_text,
      };
      collapses.push(collapse);
    }
    this.setState({ accordion: collapses });
  }

  render() {
    const { accordion } = this.state;
    const { navigation } = this.props;
    return (
      <View>
        {accordion.map(collection => (
          <Collection key={collection.key} navigation={navigation} collection={collection} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#111',
    borderBottomColor: '#5f5f5f',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  colHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  colIcon: {
    color: '#5f5f5f'
  },
  title: {
    color: '#7f7f7f',
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
  enlarge: {
    backgroundColor: '#111',
    borderRadius: 3,
    bottom: 12,
    height: 35,
    position: 'absolute',
    right: 40,
    width: 35
  },
  enlargeIcon: {
    color: '#fff',
  },
  text: {
    color: '#fff',
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5
  }
});
