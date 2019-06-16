import React, { Component } from "react";
import { Container, Text, Content, Icon, Form, Item, Input,Button, Left, Right, Header, Toast, Root } from 'native-base';
import {View, StyleSheet } from "react-native";
import { DrawerNavigator } from 'react-navigation';
import AuthService from "../../auth/AuthService";
import update from 'immutability-helper';

import RegisterPage from "ProjectOne/src/components/register/RegisterPage";
export default class LogInPage extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Icon name='md-home' stlye={{color: tintColor}}/>
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            showToast: false
        };

        this.Auth = new AuthService();
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount(){
        const {navigate} = this.props.navigation;
        if(this.Auth.loggedIn()) {
            navigate('HomeScreen');
        }
    }

    handleFormChange(value, field){
        this.setState(
            update(this.state, {
                    [field]: { $set: value }
            })
        );
    }

    handleFormSubmit(){
        const {navigate} = this.props.navigation;
        console.log(this.props.navigation);
        console.log("onSubmit");
        this.Auth.login(this.state.login,this.state.password)
            .then(res =>{
                console.log("Success!");
                navigate('Домашняя страница', {res});
            })
            .catch(err =>{
                alert("Не правильный логин или пароль!" + err);
            })
    }

  render() {
     const {navigate} = this.props.navigation;
    return (<Container >
              <Content style = {styles.container}>
              <Header style = {styles.header}>
              <Left style={{flex:1}}>
              <Icon name="menu" style = {styles.icon} onPress={() => this.props.navigation.openDrawer()}/>
              </Left>
              </Header>
                <Form >
                  <Item>
                    <Input placeholder="Логин..." field="login" name="login" value={this.state.login} onChangeText={(text) => this.handleFormChange(text, "login")}/>
                  </Item>
                  <Item last>
                    <Input placeholder="Пароль..." field="password" name="password" value={this.state.password} onChangeText={(text) => this.handleFormChange(text, "password")}/>
                  </Item>
                </Form>
                  <View style={styles.buttons}>
                  <Right>
                <Button style={styles.logB} block onPress= {this.handleFormSubmit}>
                      <Text>Войти</Text>
                </Button>
                </Right>
                <Text> ИЛИ </Text>
                  <Right>
                <Button  style={styles.regB} onPress={() => navigate('Регистрация')}>
                    <Text>Зарегистрироваться</Text>
                </Button>
                  </Right>
                    </View>
              </Content>

    </Container>);
  }

}
const styles = StyleSheet.create ({
  container: {
     flex: 1,

   },
   buttons: {
     flex:1,
     margin: 0,
     alignItems: 'center',
     justifyContent: 'center',
   },
   icon: {

       color: '#F8F8F8'
    },
   header:{
     backgroundColor: '#4682B4'
   },
   logB:{
     flex: 1,

     backgroundColor:'#4682B4',
     alignItems:'center'
   },
   regB:{
     flex: 1,
     backgroundColor:'#32CD32',
     alignItems:'center'

   }
});
