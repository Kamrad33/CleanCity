import React, { Component } from "react";
//import {Container, Text, Content, Icon } from 'native-base';
//import { View, Text, StyleSheet } from "react-native";
import { DrawerNavigator } from 'react-navigation';
import { Icon, Text, Button, Container, Header, Content, Left, Drawer } from 'native-base'
import App from "./App"
export default class SideBar extends Component {

  render() {
  // const {navigator} = this.props.navigation;
    return (
        <Container>

          <Content>
            <Text>Map</Text>
            <Button block onPress={() => navigate('Main')}>
                  <Text>log In</Text>
            </Button>
            <Button block onPress={() => navigate('Register')}>
                <Text>Register</Text>
            </Button>
          </Content>
        </Container>);
  }
}
