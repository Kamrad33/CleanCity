import React, { Component } from "react";
import { Container, Text, Content, Icon, Form, Item, Input,Button, Left, Right, Header, Toast, Root,TouchableOpacity } from 'native-base';
import {View, StyleSheet } from "react-native";
import { DrawerNavigator } from 'react-navigation';
import * as firebase from 'firebase';

import RegisterPage from "ProjectOne/src/components/register/RegisterPage";
export default class newLogin extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Icon name='md-home' stlye={{color: tintColor}}/>
        }
    };

    state = {
       email: '',
       password: '',
       authenticating: false,
       user: null,
       error: '',
     }
     onPressSignIn() {
    this.setState({
      authenticating: true,
    });

    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => this.setState({
        authenticating: false,
        user,
        error: '',
      }))
      .catch(() => {
        // Login was not successful
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => this.setState({
            authenticating: false,
            user,
            error: '',
          }))
          .catch(() => this.setState({
            authenticating: false,
            user: null,
            error: 'Authentication Failure',
          }))
      })
  }

  onPressLogOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          user: null,
        })
      }, error => {
        console.error('Sign Out Error', error);
      });
  }
  renderCurrentState() {
      if (this.state.authenticating) {
        return (
          <View style={styles.form}>
            <ActivityIndicator size='large' />
          </View>
        )
      }

      if (this.state.user !== null) {
        return (
          <View style={styles.form}>
            <Text>Logged In</Text>
            <Button onPress={() => this.onPressLogOut()}>Log Out</Button>
          </View>
        )
      }

      return (
        <View style={styles.form}>
          <Input
            placeholder='Enter your email...'
            label='Email'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Input
            placeholder='Enter your password...'
            label='Password'
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button onPress={() => this.onPressSignIn()}>Log In</Button>
          <Text>{this.state.error}</Text>
        </View>
      )

    }

    render() {
    return (
      <View >
        {this.renderCurrentState()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  form: {
    flex: 1
  }
});
  /*render() {
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
                    <Input placeholder="Логин..." label='Email' onChangeText={email => this.setState({ email })} value={this.state.email} />
                  </Item>
                  <Item last>
                    <Input placeholder="Пароль..." label='Password' onChangeText={password => this.setState({ password })}
          value={this.state.password} />
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
*/
