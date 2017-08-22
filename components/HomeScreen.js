import React, { Component } from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import storage from '../Model/ShirtStorage';

let { height, width } = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image
        resizeMode="cover"
        source={require('./../assets/images/splash-tilt-soft.png')}
        style={styles.splashContainer}
      >
      <Text style={styles.mainTitle}>Shirt Shop</Text>
        <Text style={styles.subTitle}>Shirt design, made easy.</Text>
        <TouchableOpacity
          onPress={
            () => {
              this.props.navigator.push({
                name: 'List'
              });
            }
          }
        >
          <View style={ styles.buttonWrapper }>
            <Text style={ styles.btn }>Get Started</Text>
          </View>
        </TouchableOpacity>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width
  },
  mainTitle: {
    fontSize: 72,
    color: '#333'
  },
  subTitle: {
    fontSize: 28,
    color: '#000',
    marginBottom: 200
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
    backgroundColor: '#666',
    borderRadius: 7
  },
  btn: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white'
  }
});
