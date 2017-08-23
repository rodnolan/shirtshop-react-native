import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, ToastAndroid } from 'react-native';
import { Container, Content, Header, Left, Button, Icon, Body, Title } from 'native-base';
import ShirtModel from '../Model/ShirtModel';
import Shirt from './Shirt';

export default class CheckoutScreen extends React.Component {

  static propTypes = {
    shirt: React.PropTypes.instanceOf(ShirtModel).isRequired,
  };

  static defaultProps = {
    shirt: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      shirt: this.props.shirt,
    };
  }

  render() {
    return (
      <Image source={require('./../assets/images/editor-bg.jpg')}
             style={styles.backgroundImage}>
        <Container>
          <Header style={{ backgroundColor: '#666' }}>
            <Left>
              <Button transparent onPress={
                () => {
                  this.props.navigator.pop()
                }
              }>
                <Icon name='md-arrow-round-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{ fontSize: 15 }}>Checkout</Title>
            </Body>
          </Header>
          <Content contentContainerStyle={styles.contentContainer}>
            <Shirt
              shirt={this.props.shirt}
            />
            <Button
              info
              block
              rounded
              style={{ margin: 10 }}
              onPress={() => {
                this.logUserPurchase();
              }}
            >
              <Text style={[styles.btnText]}>Buy Now</Text>
            </Button>
          </Content>
        </Container>
      </Image>
    )
  }

  logUserPurchase() {
    ToastAndroid.showWithGravity("Your purchase was successful", ToastAndroid.LONG, ToastAndroid.CENTER);
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
  }
});
