import React, { Component, PropTypes } from 'react';
import { Button, Text, Icon, View } from 'native-base';

export default class ConfigFooter extends React.Component {

  static propTypes = {
    pressHandler: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    pressHandler: null,
  };

  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          info
          iconLeft
          block
          rounded
          style={{ margin: 10 }}
          onPress={
            () => this.props.pressHandler('save')
          }
        >
          <Icon name="md-star" />
          <Text>Save</Text>
        </Button>

        <Button
          info
          iconLeft
          block
          rounded
          style={{ margin: 10 }}
          onPress={
            () => this.props.pressHandler('buy')
          }
        >
          <Icon name="md-cart" />
          <Text>Buy</Text>
        </Button>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    height: 90,
  },
};
