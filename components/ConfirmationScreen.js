import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, Dimensions } from 'react-native';
import { Container, Content, Header, Left, Button, Icon, Body, Title } from 'native-base';
import ShirtModel from '../Model/ShirtModel';
import Shirt from './Shirt';

let { height, width } = Dimensions.get("window");

export default class ConfirmationScreen extends React.Component {

  static propTypes = {
    shirt: React.PropTypes.instanceOf(ShirtModel).isRequired,
  };

  static defaultProps = {
    shirt: null,
  };

  render() {
    return (
      <Image source={require('./../assets/images/editor-bg.jpg')}
             style={styles.backgroundImage}>
        <Container>
          <Header style={{ backgroundColor: '#666' }}>
            <Left>
              <Button transparent onPress={
                () => {
                  this.props.navigator.pop();
                }
              }>
                <Icon name='md-arrow-round-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{ fontSize: 15 }}>Order Confirmation</Title>
            </Body>
          </Header>
          <Content contentContainerStyle={styles.contentContainer}>
              <Shirt
                shirt={this.props.shirt}
              />
              <View style={styles.textWrapper}>
                <View>
                  <Text style={[styles.labels]}>Style:</Text>
                  <Text style={[styles.values]}>{this.props.shirt.isMens ? 'Mens' : 'Womens'}</Text>
                </View>
                <View>
                  <Text style={[styles.labels]}>Size:</Text>
                  <Text style={[styles.values]}>{this.props.shirt.size}</Text>
                </View>
                <View>
                  <Text style={[styles.labels]}>Price:</Text>
                  <Text style={[styles.values]}>${this.props.shirt.price}</Text>
                </View>
              </View>
              <Button
                info
                iconRight
                block
                rounded
                style={{ margin: 10 }}
                onPress={() => {
                  this.props.navigator.push({
                    name: 'Checkout',
                    passProps: {
                      shirt: this.props.shirt
                    }
                  })
                }}
              >
                <Text style={[styles.btnText]}>Proceed to Checkout</Text>
                <Icon name="md-cart" />
              </Button>
            </Content>
        </Container>
      </Image>
    )
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
  textWrapper: {
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
  },
  labels: {
    fontWeight: 'bold',
    color: '#eee',
    fontSize: 14,
  },
  values: {
    fontWeight: 'bold',
    color: '#999',
    fontSize: 20,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
  }
});
