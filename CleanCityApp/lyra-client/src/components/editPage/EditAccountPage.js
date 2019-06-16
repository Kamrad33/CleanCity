import React, { Component } from "react";
import {Container, Text, Content, Icon, Form, Item, Input,Button, Left, Right } from 'native-base';
import {View, StyleSheet } from "react-native";
import { DrawerNavigator } from 'react-navigation';
import ValidationComponent from 'react-native-form-validator';
import FormTest from "ProjectOne/FormTest";
//import { Icon, Button, Container, Header, Content, Left } from 'native-base'
//import Register from "./register/Register";
export default class EditAccountPage extends ValidationComponent {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='md-home' stlye={{ color: tintColor}} />
    }
  }
  constructor(props) {
    super(props);

  this.state = {login : "", password : "", name : "", surname : "", patronymic : "", email: ""} // сюда должны передаваться данные об акаунте с бд

  }
  _onPressButton = () => {
    // Call ValidationComponent validate method
    this.validate({
      login: {minlength:3, maxlength:64, required: true},
      password: {minlength:5, maxlength:64, required: true},
      name: {required: true},
      surname: {required: true},
      patronymic: {required: false},
      email: { required: false}
    });
  }
  render() {
     const {navigate} = this.props.navigation;
    return (<Container>
              <Content>
                <Form>
                  <Item>
                    <Input placeholder="Login*" onChangeText={(login) => this.setState({login})} value={this.state.login}/>
                  </Item>
                  <Text>{(this.isFieldInError('login') && this.getErrorsInField('login'))?this.getErrorsInField('login'):''}</Text>
                  <Item>
                    <Input placeholder="Password*" onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                  </Item>
                    <Text>{(this.isFieldInError('password') && this.getErrorsInField('password'))?this.getErrorsInField('password'):''}</Text>
                  <Item>
                    <Input placeholder="Name*" onChangeText={(name) => this.setState({name})} value={this.state.name}/>
                  </Item>
                    <Text>{(this.isFieldInError('name') && this.getErrorsInField('name'))?this.getErrorsInField('name'):''}</Text>
                  <Item>
                    <Input placeholder="Surname*" onChangeText={(surname) => this.setState({surname})} value={this.state.surname}/>
                  </Item>
                    <Text>{(this.isFieldInError('surname') && this.getErrorsInField('surname'))?this.getErrorsInField('surname'):''}</Text>
                  <Item>
                    <Input placeholder="Patronymic" onChangeText={(patronymic) => this.setState({patronymic})} value={this.state.patronymic}/>
                  </Item>
                  <Item>
                    <Input placeholder="eMail" onChangeText={(email) => this.setState({email})} value={this.state.email}/>
                  </Item>
                    <Text>{(this.isFieldInError('email') && this.getErrorsInField('email'))?this.getErrorsInField('email'):''}</Text>
                </Form>

                <Button block
                disabled={!this.state.isFormValid}
                onPress={this._onPressButton}>
                    <Text>Подтвердить</Text>
                </Button>
                <View>
                <Text>
                  {this.getErrorMessages()}
                </Text>
                  </View>
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
