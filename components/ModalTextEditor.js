import React, { Component } from 'react'
import { View, Button } from 'react-native'
import Modal from 'react-native-modal'
import { InputGroup, Input } from 'native-base';

export default class ModalTextEditor extends Component {

  static propTypes = {
    showCaptionEditor: React.PropTypes.func.isRequired,
    setCaption: React.PropTypes.func.isRequired,
    caption: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    showCaptionEditor: null,
    setCaption: null,
    caption: null
  };

  onTextChanged(value) {
    this.props.setCaption(value);
  }

  render() {
    return (
      <Modal isVisible={this.props.isModalVisible}>
        <View style={styles.textBackground}>
          <InputGroup regular>
            <Input
              autoFocus={true}
              onChangeText={(text) => this.onTextChanged(text)}
              value={this.props.caption}
            />
          </InputGroup>
          <Button title="OK" onPress={() => this.props.showCaptionEditor(false)}></Button>
        </View>
      </Modal>
    )
  }
}

const styles = {
  textBackground: {
    backgroundColor: '#eee',
    padding: 15,
  },
};
