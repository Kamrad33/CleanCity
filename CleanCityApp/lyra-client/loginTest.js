/*import React, { Component } from "react";
//import { Container, , Content, Icon, Form, Item, Input,Button, Left, Right, Header, Toast, Root } from 'native-base';
import { View, StyleSheet, KeyboardAvoidView, TextInput, TouchableOpacity, Text, AsyncStorage } from "react-native";
import  { StackNavigator }  from 'react-navigation';
//import RegisterPage from "./src/components/register/RegisterPage";
export default class loginTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    }
  }
  componentDidMount() {
    this._loadInitialState().done();
  }
  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.props.navigation.navigate('RegisterPage')
    }
  }
  render() {
    return (
      <KeyboardAvoidView behavior='padding' style = {styles.wrapper}>
      <View>
        <Text style = {styles.header}>- LOGIN - </Text>
        <TextInput
          style = {styles.textInput} placeholder='login'
          onChangeText={(login) => this.setState({login})}
          underlineColorAndroid='transparent'
        />
        <TextInput
          style = {styles.textInput} placeholder='password'
          onChangeText={(password) => this.setState({password})}
          underlineColorAndroid='transparent'
        />

        <TouchableOpacity
        style={styles.btn}
        onPress={this.login1}>
        <Text>Log in</Text>
        </TouchableOpacity>


      </View>
      </KeyboardAvoidView>
    );
  }
  login1 = () => {
    alert('test');
  }
}

const styles = StyleSheet.create({
  weapper:{
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header:{
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput:{
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  btn:{
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center'
  }
});
*/




import React, { Component } from "react";
import { Container,  Content, Icon, Form, Item, Input,Button, Left, Right, Header, Toast, Root } from 'native-base';
import { View, StyleSheet, KeyboardAvoidView, TextInput, TouchableOpacity, Text, AsyncStorage } from "react-native";
import { DrawerNavigator } from 'react-navigation';
import RegisterPage from "./src/components/register/RegisterPage";
import HomeScreenModer from "./HomeScreenModer";
import App from "./App"
export default class loginTest extends Component {
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
status : false
      }
    }


   componentDidMount() {
      console.log('status log', this.state.status);
      this._loadInitialState().done();
    }
    _loadInitialState = async () => {
      var valueuser = await AsyncStorage.getItem('user');
      //  var loginStatus = await AsyncStorage.getItem('status');
              console.log('value',valueuser);
      //  console.log('loginstat',loginStatus);
      if (valueuser !== null) {

        this.setState({
         status: true,

        });
        AsyncStorage.setItem('status', JSON.stringify(true));
        console.log('stat', loginStatus);
      this.props.navigation.navigate('HomeScreenModer');
      }
      var loginStatus = await AsyncStorage.getItem('status');
      console.log('status axaxxa',loginStatus);
    }


    render() {
const {navigate} = this.props.navigation;
      return (

        <Container>
                  <Content style = {styles.container}>
                  <Header style = {styles.header}>
                  <Left style={{flex:1}}>
                  <Icon name="menu" style = {styles.icon} onPress={() => this.props.navigation.openDrawer()}/>
                  </Left>
                  </Header>
        <View>

          <TextInput
            style = {styles.textInput} placeholder='login'
            value={this.state.login}
            onChangeText={(login) => this.setState({login})}
            underlineColorAndroid='transparent'
          />
          <TextInput
            style = {styles.textInput} placeholder='password'
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            underlineColorAndroid='transparent'
          />

          <View style={styles.buttons}>
          <Right>

          <Button style={styles.logB} block onPress= {this.login1}>
              <Text style={styles.text}>Войти</Text>
        </Button>
        </Right>
        <Text > ИЛИ </Text>
          <Right>
        <Button  style={styles.regB} onPress={() => navigate('Регистрация')}>
            <Text style={styles.text}>Зарегистрироваться</Text>
        </Button>
          </Right>
          </View>
        </View>
            </Content>
        </Container>
      );
    }
    //this.state.login
   login1 = () => {
    //  alert(this.state.login);
      fetch('http://192.168.1.43:3000/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: this.state.login,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then ((res) =>{

        if (res.success === true) {
          AsyncStorage.setItem('user', res.user);

          this.props.navigation.navigate('Домашняя страница');
        }
        else {
            // console.log(this.state.loginstatus);
          alert( res.message);

        }
      })
      .done();
    }
  }


  const styles = StyleSheet.create ({
    container: {
       flex: 1,

     },
     buttons: {
       flex:1,
       margin: 5,
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

     },
     text:{
      // flex:2,
      margin: 10,
        color: '#F8F8F8',
        fontSize: 25
     }
  });



  /*const styles = StyleSheet.create({
    weapper:{
      flex: 1,
    },


    <TouchableOpacity
    style={styles.buttons}
    onPress={this.login1}>
    <Text>Log in</Text>
    </TouchableOpacity>



    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2896d3',
      paddingLeft: 40,
      paddingRight: 40,
    },
    header:{
      fontSize: 24,
      marginBottom: 60,
      color: '#fff',
      fontWeight: 'bold',
    },
    textInput:{
      alignSelf: 'stretch',
      padding: 16,
      marginBottom: 20,
      backgroundColor: '#fff',
    },
    btn:{
          alignSelf: 'stretch',
          backgroundColor: '#01c853',
          padding: 20,
          alignItems: 'center'
    }
  });*/
