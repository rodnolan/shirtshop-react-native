import React, { Component } from 'react';
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import PhotoGrid from 'react-native-photo-grid';
import { Container, Content, Header, Left, Right, Button, Text, Icon, Body, Title, Fab, View, List, ListItem, Thumbnail } from 'native-base';
import storage from '../Model/ShirtStorage';
import ShirtModel from '../Model/ShirtModel';

let { height } = Dimensions.get("window");

export default class ListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listMode: false,
      shirts: [],
    };
  }

  componentWillMount = () => {
    let tmpThis = this;

    // load saved shirts from storage
    storage.load({
      key: 'shirts'
    }).then(shirts => {
      tmpThis.setState({ shirts: shirts });
    }).catch(err => {
      console.log("no shirts found: " + err.message);
    });
  };

  navigateToConfig = (shirt) => {
    this.props.navigator.push({
      name: 'Config',
      passProps: {
        shirt: shirt
      }
    })
  }

  navigateToConfirmation = (shirt) => {
    this.props.navigator.push({
      name: 'Confirmation',
      passProps: {
        shirt: shirt
      }
    })
  }

  removeFromStorage = (shirtToRemove) => {
    let tmpThis = this;
    let shirts = this.state.shirts;
    let indexOfPosterToRemove = shirts.findIndex(shirt => shirt.id === shirtToRemove.id);
    if (indexOfPosterToRemove !== -1) {
      shirts.splice(indexOfPosterToRemove, 1);
    } else {
      console.log("something is broken, can't delete");
    }
    storage.save({
      key: 'shirts',
      rawData: shirts
    }).then(() => {
      tmpThis.setState({ shirts: shirts});
    });
  }

  render() {
    return (
      <Container>
        <Header
          style={{
            backgroundColor: '#666',
          }}
        >
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigator.pop();
              }}
            >
              <Icon name='md-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 15 }}>Your Saved Shirts</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.setState({ listMode: !this.state.listMode });
              }}
            >
              <Icon name={this.state.listMode ? 'md-grid' : 'md-list'} />
            </Button>
          </Right>
        </Header>
        <Content>
          {this.state.shirts.length === 0 ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ paddingTop: height / 3, fontSize: 24 }}>
                Click the button below to get started.
              </Text>
            </View>
            :
            this.renderShirts()
          }
        </Content>
        <Fab
          style={{ backgroundColor: '#666' }}
          position="bottomRight"
          onPress={() => {
            this.navigateToConfig(new ShirtModel("-1", 'S', false, 'Caption', '', ''))
          }}
        >
          <Icon name="md-add" />
        </Fab>
      </Container>
    );
  }

  renderShirts = () => {
    return (
      this.state.listMode ? this.renderPhotoList() : this.renderPhotoGrid()
    )
  }

  renderPhotoGrid = () => {
    return (
      <PhotoGrid
        data={this.state.shirts}
        itemsPerRow={2}
        itemMargin={2}
        renderItem={this.renderGridItem}
      />
    )
  }

  renderGridItem = (item, itemSize) => {
    let shirt = new ShirtModel(item.id, item.size, item.isMens, item.caption, item.color, item.thumbnailUri)
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={shirt.id}
        style={{ width: itemSize, height: itemSize }}
        onPress={() => {
          this.navigateToConfig(shirt);
        }}
      >
        <Image
          resizeMode="contain"
          style={{ flex: 1, margin: 3 }}
          source={{ uri: item.thumbnailUri }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            small
            info
            rounded
            style={{ margin: 10 }}
            onPress={() => {
              this.removeFromStorage(shirt);
            }}
          >
            <Icon name="md-trash" />
          </Button>
          <Button
            small
            info
            rounded
            style={{ marginTop: 10, marginBottom: 10 }}
            onPress={() => {
              this.navigateToConfirmation(shirt);
            }}
          >
            <Icon name="md-cart" />
          </Button>
        </View>
      </TouchableOpacity>
    )
  }

  renderPhotoList = () => {
    return (
      <List
        dataArray={this.state.shirts}
        renderRow={this.renderListRow}
      />
    )
  }

  renderListRow = (data) => {
    let shirt = new ShirtModel(data.id, data.size, data.isMens, data.caption, data.color, data.thumbnailUri)
    return (
      <ListItem
        thumbnail
        onPress={() => {
          this.navigateToConfig(shirt);
        }}
      >
        <Left>
          <Thumbnail source={{ uri: shirt.thumbnailUri }} />
        </Left>
        <Body>
          <Text style={{ margin: 8 }}>{shirt.caption}</Text>
        </Body>
        <Right>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              small
              info
              rounded
              style={{ margin: 4 }}
              onPress={
                () => this.removeFromStorage(shirt)
              }
            >
              <Icon name="md-trash" />
            </Button>
            <Button
              small
              info
              rounded
              style={{ margin: 4 }}
              onPress={
                () => this.navigateToConfirmation(shirt)
              }
            >
              <Icon name="md-cart" />
            </Button>
          </View>
        </Right>
      </ListItem>
    )
  }

}
