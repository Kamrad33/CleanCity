import { View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { DrawerNavigator, createBottomTabNavigator,TabNavigator, StackNavigator } from 'react-navigation';
import Map from "./src/components/map/Map";
import ProblemList from "./src/components/list/ProblemList";
import ListMy from "./src/components/myList/ListMy";
import EditSelectProblem from "ProjectOne/src/components/EditSelectProblem/EditSelectProblem";
import ProblemInf from "ProjectOne/src/components/ProblemInf/ProblemInf";
import MapMarker from "ProjectOne/src/components/map/MapMarker";
import { Platform } from 'react-native';

import { Text, Icon, Button, Container, Header, Content, Left,Label,Right } from 'native-base'

export default class HomeScreen extends Component {

  render() {
const {navigate} = this.props.navigation;
    return(
      <Container>
      <Header style = {styles.header}>
      <Left style={{flex:1}}>
      <Icon name="menu" style = {styles.icon} onPress={() => this.props.navigation.openDrawer()}/>
      </Left>
      </Header>
        <MainNavigator />
    </Container>

);
  }
}

const ListMyNavigator = StackNavigator({
  ListMy: {
    screen: ListMy
  },
EditSelectProblem: {screen: EditSelectProblem},
MapMarker: {screen: MapMarker}
},

{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });
const ProblemListNavigator = StackNavigator(
  {
  List: {
    screen: ProblemList
},
ProblemInf: {screen: ProblemInf},
MapMarker: {screen: MapMarker}
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);
const MainNavigator = createBottomTabNavigator({
  'КАРТА': {
    screen: Map,

  },
  'СПИСОК': {
    screen: ProblemListNavigator,

  },
  'МОИ ЗАПИСИ': {
    screen: ListMyNavigator,

}
},
{

  tabBarOptions: {

  showIcon: false,
  showLabel: true,
  activeTintColor: '#F8F8F8',
  inactiveTintColor: '#A9A9A9',
  labelStyle: {
        fontSize: 15,
        paddingVertical: 15
      },
  style: {
            backgroundColor: '#4682B4'
        }
}
});
const styles = StyleSheet.create ({
  icon: {
      color: '#F8F8F8'
   },
   header:{
     backgroundColor: '#4682B4'
   }
})
