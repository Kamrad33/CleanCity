import React, { Component } from "react";
import {Container, Text, Content, Icon, Form, Item, Input,Button, Left, Right } from 'native-base';
import {View, StyleSheet } from "react-native";
import { DrawerNavigator } from 'react-navigation';
export default class Register extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='md-home' stlye={{ color: tintColor}} />
    }
  }
  render() {
    return (<Container>
              <Content>
            //    <Form>
              //    <Item>
              //      <Input placeholder="Username" />
              //    </Item>
              //    <Item last>
            //        <Input placeholder="Password" />
            //      </Item>
              //  </Form>

                <Button block>
                      <Text>log In</Text>
                </Button>
                <Button block onPress={() => this.props.navigate('Register')}>
                    <Text>Register</Text>
                </Button>

              </Content>

    </Container>);
  }
}
const styles = StyleSheet.create ({
  container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
})
