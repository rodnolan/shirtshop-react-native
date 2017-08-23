import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';
import { Content, Header, Left, Right, Button, Icon, Body, Title } from 'native-base';
import { takeSnapshot, dirs } from 'react-native-view-shot';
import ConfigButtonBar from './ConfigButtonBar.js';
import Shirt from './Shirt.js';
import ConfigFooter from './ConfigFooter.js';
import ModalColorPicker from './ModalColorPicker';
import ModalTextEditor from './ModalTextEditor';
import ModalSizePicker from './ModalSizePicker';
import ShirtModel from '../Model/ShirtModel';
import storage from '../Model/ShirtStorage';

const { DownloadDir } = dirs;

export default class ConfigScreen extends React.Component {

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
      isColorPickerVisible: false,
      isCaptionEditorVisible: false,
      isSizePickerVisible: false,
    };
  }

  updateShirt = (newShirt) => {
    this.setState({shirt: newShirt});
  }

  toggleStyle = (isMens) => {
    this.updateShirt(Object.assign(this.state.shirt, { isMens: isMens }));
  }
  setCaption = (requestedText) => {
    this.updateShirt(Object.assign(this.state.shirt, { caption: requestedText }));
  }
  setColor = (requestedColor) => {
    this.updateShirt(Object.assign(this.state.shirt, { color: requestedColor }));
  }
  setSize = (requestedSize, price) => {
    this.updateShirt(Object.assign(this.state.shirt, { size: requestedSize, price: price }));
  }


  showColorPicker = (isVisible = true) => {
    this.setState({ isColorPickerVisible: isVisible });
  }
  showCaptionEditor = (isVisible = true) => {
    this.setState({ isCaptionEditorVisible: isVisible });
  }
  showSizePicker = (isVisible = true) => {
    this.setState({ isSizePickerVisible: isVisible });
  }


  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  pressHandler = (btn) => {

    let path = '';
    let shirtId = '';

    if (this.props.shirt.id === "-1") {
      path = DownloadDir + "/ShirtShop" + Math.random().toString().split('.')[1] + ".jpg";
      shirtId = this.guid();
    } else {
      path = this.props.shirt.thumbnailUri;
      shirtId = this.props.shirt.id;
    }

    console.log('saving the shirt');
    takeSnapshot(this.refs['snapshot'], {
      path: path,
      format: 'jpeg',
      quality: 0.8,
      result: 'base64'
    }).then(
      (base64data) => {
        let shirt = Object.assign(this.state.shirt, {id: shirtId, thumbnailUri: 'data:image/png;base64,' + base64data});

        storage.load({
          key: 'shirts'
        }).then(shirts => {

          let foundIndex = shirts.findIndex(shirt => shirt.id === shirtId);
          if (foundIndex === -1) {
            shirts.push(shirt);
          } else {
            shirts[foundIndex] = shirt;
          }
          storage.save({
            key: 'shirts',
            rawData: shirts
          });

          switch(btn) {
            case 'save' :
              this.redirectOnSave();
            break;
            case 'buy' :
              this.navigateToConfirmation();
            break;
          }

        }).catch(err => {
          //console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
            case 'ExpiredError':
              storage.save({
                key: 'shirts',
                rawData: [shirt]
              });
              this.redirectOnSave();
              break;
          }
        });
      },
      error => console.error("Snapshot failed", error)
      );


  }

  navigateToConfirmation = () => {
    this.props.navigator.push({
      name: 'Confirmation',
      passProps: {
        shirt: this.state.shirt
      }
    })
  }

  redirectOnSave = () => {
    this.props.navigator.push({
      name: 'List'
    })
  }

  render() {
    return (
        <Image source={require('./../assets/images/editor-bg.jpg')}
          style={styles.backgroundImage}>
          <Header style={{ backgroundColor: '#666' }}>
            <Left>
              <Button transparent>
                <Icon
                  onPress={() => {
                    this.props.navigator.pop();
                  }}
                  name='md-arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{ fontSize: 15 }}>Design Your Shirt</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <ConfigButtonBar
              isMens={this.state.shirt.isMens}
              styleToggler={this.toggleStyle}
              showColorPicker={this.showColorPicker}
              showCaptionEditor={this.showCaptionEditor}
              showSizePicker={this.showSizePicker}
            />

            <Shirt
              ref="snapshot"
              shirt={this.state.shirt}
            />

            <ModalColorPicker
              isModalVisible={this.state.isColorPickerVisible}
              showColorPicker={this.showColorPicker}
              setColor={this.setColor}
              color={this.state.shirt.color}
            />

            <ModalTextEditor
              isModalVisible={this.state.isCaptionEditorVisible}
              showCaptionEditor={this.showCaptionEditor}
              setCaption={this.setCaption}
              caption={this.state.shirt.caption}
            />

            <ModalSizePicker
              isModalVisible={this.state.isSizePickerVisible}
              showSizePicker={this.showSizePicker}
              setSize={this.setSize}
              size={this.state.shirt.size}
              price={this.state.shirt.price}
            />

          </Content>
          <ConfigFooter
            pressHandler={this.pressHandler}
          />

        </Image>

    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
};
