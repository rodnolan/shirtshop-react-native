import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, ToastAndroid } from 'react-native';
import { Container, Content, Header, Left, Button, Icon, Body, Title } from 'native-base';
import ShirtModel from '../Model/ShirtModel';

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
      <Image
        resizeMode="cover"
        source={require('./../assets/images/editor-bg.jpg')}
        style={styles.splashContainer}
      >
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
            <View style={styles.imgWrapper}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={{ uri: this.state.shirt.thumbnailUri }}
              />
            </View>
            <Button
              info
              iconRight
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
  splashContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 10,
  },
  imgWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  img: {
    width: 420,
    height: 420,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

});
