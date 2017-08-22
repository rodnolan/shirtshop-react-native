import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import Modal from 'react-native-modal'

export default class ModalColorPicker extends Component {

  static propTypes = {
    showSizePicker: React.PropTypes.func.isRequired,
    setSize: React.PropTypes.func.isRequired,
    size: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired
  };

  static defaultProps = {
    showSizePicker: null,
    setSize: null,
    size: '',
    price: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedSize: props.size,
      price: props.price
    }
  }

  onValueChange(size) {
    let shirtPrice = 0;
    switch (size) {
      case 'S':
        shirtPrice = 10;
      break;
      case 'M':
        shirtPrice = 11;
      break;
      case 'L':
        shirtPrice = 12;
      break;
    }
    this.setState({
      selectedSize: this.props.size,
      price: shirtPrice
    });
    this.props.setSize(size, shirtPrice);
  }

  render() {
    return (
      <Modal isVisible={this.props.isModalVisible} style={{ flex: 1 }}>
        <View style={styles.modalWrapper}>
          <Button
            title="small"
            onPress={() => this.onValueChange('S')}
            color={ this.props.size == 'S' ? 'green' : 'gray' }
            />
          <Button
            title="medium"
            onPress={() => this.onValueChange('M')}
            color={ this.props.size == 'M' ? 'green' : 'gray' }
            />
          <Button
            title="large"
            onPress={() => this.onValueChange('L')}
            color={ this.props.size == 'L' ? 'green' : 'gray' }
            />
          <Text style={{width: 75, fontSize: 24, marginLeft: 10}}>${this.state.price}</Text>
          <Button title="OK" onPress={() => this.props.showSizePicker(false)}></Button>
        </View>
      </Modal>
    )
  }
}

const styles = {
  modalWrapper: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 15,
    flexDirection: 'row',
  }
};
