import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';

export default class ConfigScreen extends React.Component {

  static defaultProps = {
    isMens: false,
    shirtStyleToggler: null,
    showColorPicker: null,
    showCaptionEditor: null,
    showSizePicker: null
  };

  static propTypes = {
    isMens: React.PropTypes.bool.isRequired,
    styleToggler: React.PropTypes.func.isRequired,
    showColorPicker: React.PropTypes.func.isRequired,
    showCaptionEditor: React.PropTypes.func.isRequired,
    showSizePicker: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={() => this.props.styleToggler(!this.props.isMens)}>
          <Image source={this.props.isMens ? require('./../assets/images/icon-women.png') : require('./../assets/images/icon-men.png')}  />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this.props.showCaptionEditor()}}>
          <View style={styles.buttonWrapper}>
            <Image source={require('./../assets/images/icon-caption.png')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this.props.showSizePicker()}}>
          <View style={styles.buttonWrapper}>
            <Image source={require('./../assets/images/icon-size.png')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this.props.showColorPicker()}}>
          <View style={styles.buttonWrapper}>
            <Image source={require('./../assets/images/icon-color-palette.png')} />
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    backgroundColor: '#eee',
    opacity: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    height: 80,
  },
  buttonWrapper: {
    backgroundColor: '#eee',
    opacity: 0.8,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 2,
  },
};
