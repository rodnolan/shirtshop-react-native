import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import Modal from 'react-native-modal'
import { Container, Content, ListItem, Right, Radio } from 'native-base';

export default class ModalColorPicker extends Component {

  static propTypes = {
    showColorPicker: React.PropTypes.func.isRequired,
    setColor: React.PropTypes.func.isRequired,
    color: React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    showColorPicker: null,
    setColor: null,
    color: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.color
    }
  }

  onValueChange(value) {
    this.setState({
      selectedValue: value
    });
    this.props.setColor(value);
  }

  render() {
    return (
      <Modal isVisible={this.props.isModalVisible}>
        <Container>
          <Content>
            <View style={{ backgroundColor: '#fff'}}>
              <ListItem onPress={() => this.onValueChange('red')}>
                <Text>red</Text>
                <Right>
                  <Radio selected={this.state.selectedValue == 'red'} />
                </Right>
              </ListItem>
              <ListItem onPress={() => this.onValueChange('blue')}>
                <Text>blue</Text>
                <Right>
                  <Radio selected={this.state.selectedValue == 'blue'} />
                </Right>
              </ListItem>
              <ListItem onPress={() => this.onValueChange('white')}>
                <Text>white</Text>
                <Right>
                  <Radio selected={this.state.selectedValue == 'white'} />
                </Right>
              </ListItem>
              <ListItem onPress={() => this.onValueChange('black')}>
                <Text>black</Text>
                <Right>
                  <Radio selected={this.state.selectedValue == 'black'} />
                </Right>
              </ListItem>
              <Button title="OK" onPress={() => this.props.showColorPicker(false)}></Button>
            </View>
          </Content>
        </Container>
      </Modal>
    );
  }
}
