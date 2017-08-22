import React, { Component, PropTypes } from 'react';
import { View, Image, Text } from 'react-native';
import ShirtModel from '../Model/ShirtModel';

const options = {
  men: {
    placeholder: require('./../assets/images/men/m-placeholder.png'),
    white:       require('./../assets/images/men/m-white.png'),
    black:       require('./../assets/images/men/m-black.png'),
    red:         require('./../assets/images/men/m-red.png'),
    blue:        require('./../assets/images/men/m-blue.png')
  },
  women: {
    placeholder: require('./../assets/images/women/w-placeholder.png'),
    white :      require('./../assets/images/women/w-white.png'),
    black:       require('./../assets/images/women/w-black.png'),
    red:         require('./../assets/images/women/w-red.png'),
    blue:        require('./../assets/images/women/w-blue.png')
  }
};


export default class ConfigScreen extends React.Component {

  static propTypes = {
    shirt: React.PropTypes.instanceOf(ShirtModel).isRequired,
  };

  static defaultProps = {
    shirt: null,
  };

  render() {
    let gender = this.props.shirt.isMens ? 'men' : 'women';
    let color = this.props.shirt.color == '' ? 'placeholder' : this.props.shirt.color;
    let imagePath = options[gender][color];

    return (
      <View
        style={styles.shirtFrame}
        collapsable={false}>
        <Image
          source={imagePath}
          resizeMode="contain"
          >
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{this.props.shirt.caption}</Text>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = {
  shirtFrame: {
    alignSelf: "center",
    padding: 15,
    marginVertical: 15,
    height: 395,
    width: 350,
  },
  captionContainer: {
    marginTop: 120,
    marginHorizontal: 100,
    backgroundColor: "#eee",
    opacity: .6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  caption: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: '#666',
  },
};
