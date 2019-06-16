import React, { Component } from "react";
import {Container, Text, Content, Icon, Form, Item, Input,Button, Left, Right,Thumbnail,Label } from 'native-base';
import {View, StyleSheet, Image } from "react-native";
import { DrawerNavigator } from 'react-navigation';
export default class ProblemInfModer extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='md-home' stlye={{ color: tintColor}} />
    }
  }
  constructor(props) {
    super(props);
   this.state = {author : "Автор", inf : "инф", status : "статус"}
  }
  render() {
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
     const {navigate} = this.props.navigation;
    return (<Container>
              <Content>

                <Form>
                <Image source={{uri: uri}}
                       style={{width: 100, height:100,  alignItems: 'center',}} />
                  <Item floatingLabel>
                  <Label>Заголовк:</Label>
                    <Input disabled={true} value={this.state.author}/>
                  </Item>
                  <Item floatingLabel>
                  <Label>Тип:</Label>
                    <Input disabled={true} value={this.state.inf}/>
                  </Item>
                  <Item floatingLabel last>
                  <Label>Статус:</Label>
                    <Input disabled={true} value={this.state.status}/>
                  </Item>
                </Form>
                <View style={styles.buttons}>
                <Left>
                  <Button style={styles.accB} onPress={() => {this.accept(); navigate('HomeScreen')}}>
                        <Text>Принять</Text>
                  </Button>
                    </Left>
                  <Right>
                  <Button style={styles.dropB} onPress={() => {this.denied(); navigate('HomeScreen')}}>
                        <Text>Отклонить</Text>
                  </Button>
                  </Right>
                  </View>
                  <Form style={{flex:1, alignItems:'center'}}>
                       <Left>
                  <Button style={styles.saveB} onPress={() => navigate('MapTry')}>
                        <Text>Найти на карте</Text>
                  </Button>
                       </Left>
                  </Form  >
              </Content>

    </Container>);
  }



accept = () => {
//  alert(this.state.login);
  fetch('http://192.168.1.43:3000/accept', {
    method: 'POST',
      mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: this.state.status,

    })
  })
  .then((response) => response.json())
  .done();
}
denied = () => {
//  alert(this.state.login);
  fetch('http://192.168.1.43:3000/denied', {
    method: 'POST',
      mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: this.state.status,

    })
  })
  .then((response) => response.json())
  .done();
}
}




const styles = StyleSheet.create ({
   buttons: {
     flex:1,
     margin: 20,
     flexDirection: 'row',

   },
   accB:{
     flex: 1,
     backgroundColor:'#32CD32',
     alignItems:'center'
   },
   dropB:{
     flex: 1,
     backgroundColor:'red',
     alignItems:'center'

   },
   saveB:{
     flex: 1,
     margin: 10,
     backgroundColor:'#4682B4',
     alignItems:'center'

   },
})
