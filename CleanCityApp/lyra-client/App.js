
import React, { Component } from 'react';
import { ScrollView,Platform, Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerNavigator } from 'react-navigation';
import HomeScreen from "./HomeScreen";
import HomeScreenModer from "./HomeScreenModer";
import SettingsScreen from "./SettingsScreen";
import Map from "./src/components/map/Map";
import ProblemList from "./src/components/list/ProblemList";
import ProblemListModer from "./src/components/list/ProblemListModer";
import ListMy from "./src/components/myList/ListMy";
import LogInPage from "./src/components/login/LogInPage";
import RegisterPage from "./src/components/register/RegisterPage";
import EditAccountPage from "ProjectOne/src/components/editPage/EditAccountPage";
import EditAccount from "ProjectOne/src/components/editPage/EditAccount";
import AddProblem from "ProjectOne/src/components/addProblem/AddProblem";
import EditProblem from "ProjectOne/src/components/EditProblem/EditProblem";
import ProblemInf from "ProjectOne/src/components/ProblemInf/ProblemInf";
import EditSelectProblem from "ProjectOne/src/components/EditSelectProblem/EditSelectProblem";
import Account from "./src/components/account/Account";
import SideBar from "./SideBar"
import { Container, Header, Content, Footer, FooterTab,  Left, Body, Right, Title, Icon, Button, Drawer } from 'native-base';
import FormTest from "./FormTest";
import MapTry from "./MapTry";
import selectTry from "./selectTry";
import newLogin from "./newLogin";
import newRegister from "./newRegister";
import setMarker from "./setMarker";
import newTry from "./newTry";
import AuthService from "./src/auth/AuthService";
import withAuth from "./src/components/hocs/withAuth";
import firebase from 'firebase';
import loginTest from "./loginTest";
const Auth = new AuthService();
const loginstatus = new loginTest();
const Navigator = createStackNavigator({

  Main:{
    screen: HomeScreen,


}
});
const AccountNavigator = createStackNavigator({

  Main:{
    screen: Account,

},
 Edit:{ screen: EditAccount}
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });
 const AddNavigator = createStackNavigator({
   AddProblem:{
     screen: AddProblem,
 },
  EditProblem:{ screen: EditProblem},
  MapCheck:{screen: MapTry}
 },

 {
   headerMode: 'none',
   navigationOptions: {
     headerVisible: false,
   }
  });


export default class App extends Component {
/*  componentWillMount(){
    var firebaseConfig = {
   apiKey: "AIzaSyBsRCYVwzfiDItGeSeBWP8miPOPTBAzIv0",
   authDomain: "cleancitydatabase.firebaseapp.com",
   databaseURL: "https://cleancitydatabase.firebaseio.com",
   projectId: "cleancitydatabase",
   storageBucket: "cleancitydatabase.appspot.com",
   messagingSenderId: "116424591099",
   appId: "1:116424591099:web:bc8066c71a932bbe"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);


  /*firebase.database().ref('users/002').set(
    {
      name: 'name2',
      age: 22
    }
  ).then (() => {
    console.log('inserted !');
  }).catch((error) => {
    console.log(error);
  })
firebase.database().ref('users').once('value', (data) => {
  console.log(data.toJSON());
})
}*/
    constructor(props){
       super(props);
      // const { navigation } = this.props;
   //const entry = navigation.getParam('entry', {});
        this.state = {
            isLoginIn: false
        };
        //  console.log(this.state.isLoginIn);
    }



  /*async componentWillReceiveProps(){
        console.log("onRecive");
        let loginIn = await Auth.loggedIn();
        this.setState({
            isLoginIn: loginIn
        });
    }

  /*  async componentWillReceiveProps(){

          let loginIn = await loginstatus.componentDidMount();
            console.log(loginIn);
          this.setState({
              isLoginIn: loginIn
          });
      }
*/

async componentDidMount(){
console.log('loginIn');
  this.checkStatusLog().done();
//var loginStatus = await AsyncStorage.getItem('status');
  console.log('status betas', loginStatus);
        let loginIn = await loginstatus.componentDidMount();
        this.setState({
            isLoginIn: loginIn
        });
    }

    checkStatusLog = async () => {
    var loginStatus = await AsyncStorage.getItem('status');
              console.log('value status11111',loginStatus);
              if (loginStatus == 'true'){
                this.setState({
                    isLoginIn: true
                });
                console.log('change',this.state.isLoginIn);
              }
              else
              {
                this.setState({
                    isLoginIn: false
                });
                  console.log('change esle',this.state.isLoginIn);
              }
      //  console.log('loginstat',loginStatus);
    //  if (valueuser !== null) {

      //  this.setState({
      //   status: true,

      //  });
      //  AsyncStorage.setItem('status', JSON.stringify(true));
      //  console.log('stat', loginStatus);
    //  this.props.navigation.navigate('HomeScreenModer');
      }
    //  var loginStatus = await AsyncStorage.getItem('status');
    //  console.log('status axaxxa',loginStatus);



  /*  async componentDidMount(){
         console.log("onRecive");
        var varrrr = await AsyncStorage.getItem('loginstatus');
          console.log("status login", varrrr);
        if (loginstatus == true) {
          this.setState({
              isLoginIn: loginstatus
          });
        }
        console.log("status login", loginstatus);
     }
*/
/*    async componentWillReceiveProps(){
        console.log("onRecive");
        let loginIn = await Auth.loggedIn();
        this.setState({
            isLoginIn: true
        });
    }
*/
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

 render() {
    //var loginStatus = await AsyncStorage.getItem('status');
  //   console.log('status async', loginStatus);
     console.log('chek status', this.state.isLoginIn);
  //   var loginStatus = await AsyncStorage.getItem('status');
  //   console.log('status async', loginStatus);
  //   const navigation = !(!!this.state.isLoginIn) ?
    const navigation = !(!!this.state.isLoginIn) ?
         {
            // 'Домашняя страница': {screen: HomeScreen,},
          //   Логин: {screen: LogInPage },
            //
              'Вход': {screen: loginTest},
             'Регистрация': {screen: RegisterPage },
             'Домашняя страница': {screen: HomeScreen,},
            //  'HomeScreenModer': {screen: HomeScreenModer},
            // 'HomeScreenModer': {screen: HomeScreenModer},
            // 'MapTry':{screen:MapTry},
          //  'setMarker':{screen: setMarker },
          //   'newTry' : {screen: newTry},
          //   'newLogin': {screen: newLogin},

            // 'selectTry': {screen: selectTry},
          //   'loginTest': {screen: loginTest},
          //   'HomeScreenModer': {screen: HomeScreenModer},
          //   'Домашняя страница': {screen: HomeScreen,},
          //   'Аккаунт':{screen: AccountNavigator},
          //   'Добавление проблемы': {screen: AddNavigator},

          //   'MapTry':{screen:MapTry}
            // 'newRegister':{screen: newRegister}
         }:
         {
             'Домашняя страница': {screen: HomeScreen,},
             'Аккаунт':{screen: AccountNavigator},
             'Добавление проблемы': {screen: AddNavigator},
  'Отметить на карте':{screen: setMarker },
          //   'MapTry':{screen:MapTry}
         };
  //  console.log("nav", navigation);
     const DrNv = createDrawerNavigator(navigation);
    return (
   <DrNv/>
    //    console.log('status async', loginStatus);
    );

  }
}
