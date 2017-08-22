import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, Dimensions } from 'react-native';
import { Container, Content, Header, Left, Button, Icon, Body, Title } from 'native-base';
import ShirtModel from '../Model/ShirtModel';

let { height, width } = Dimensions.get("window");

export default class ConfirmationScreen extends React.Component {

  static propTypes = {
    shirt: React.PropTypes.instanceOf(ShirtModel).isRequired,
  };

  static defaultProps = {
    shirt: null,
  };

  constructor(props) {
    super(props);
    let price = 0;
    switch (this.props.shirt) {
      case 'S' :
        price = 10;
      break;
      case 'M' :
        price = 11;
      break;
      case 'L' :
        price = 12;
      break;
    }
    this.state = {
      shirt: this.props.shirt,
      price: price
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
              <View style={styles.imgWrapper}>
                <Image
                  ref="snapshotForSharing"
                  resizeMode="contain"
                  style={styles.img}
                  source={{ uri: this.state.shirt.thumbnailUri }}
                />
              </View>
              <View style={styles.textWrapper}>
                <View>
                  <Text style={[styles.labels]}>Style:</Text>
                  <Text style={[styles.values]}>{this.state.shirt.isMens ? 'Mens' : 'Womens'}</Text>
                </View>
                <View>
                  <Text style={[styles.labels]}>Size:</Text>
                  <Text style={[styles.values]}>{this.state.shirt.size}</Text>
                </View>
                <View>
                  <Text style={[styles.labels]}>Price:</Text>
                  <Text style={[styles.values]}>${this.state.shirt.price}</Text>
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
                      shirt: this.state.shirt
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
    flex: 1,
    width: width,
    height: height,
    resizeMode: 'cover'
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
