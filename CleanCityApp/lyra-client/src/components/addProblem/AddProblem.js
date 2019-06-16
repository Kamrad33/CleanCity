import React, { Component } from "react";
import {Container, Text, Content, Icon, Form, Item, Input,Button, Left, Right,Header } from 'native-base';
import {View, StyleSheet,Image  } from "react-native";
import { DrawerNavigator } from 'react-navigation';
import AuthService from "../../auth/AuthService";
import update from "immutability-helper/index";
import PhotoUpload from 'react-native-photo-upload'
export default class AddProblem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            entryName: '',
            entryType: '',
            description: ''
        };

      //  this.Auth = new AuthService();
      //  this.handleFormChange = this.handleFormChange.bind(this);
      //  this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormChange(value, field){
        this.setState(
            update(this.state, {
                [field]: { $set: value }
            })
        );
    }

    addproblem = () => {
    //  alert(this.state.login);
      fetch('http://192.168.1.43:3000/addproblem', {
        method: 'POST',
          mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entryName: this.state.entryName,
          description: this.state.description,
        })
      })
      .then((response) => response.json())
      .done();
    }



  /*  handleFormSubmit(){
        const {navigate} = this.props.navigation;
        console.log(this.state, "auth", this.Auth);
        console.log("onSubmit");
        this.Auth.fetch("entry/save", this.state, 'PUT')
            .then(res =>{
                console.log("Success!");
                navigate('Домашняя страница', {res});
            })
            .catch(err =>{
                alert("Ошибка!" + err);
            })
    }
*/
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='md-home' stlye={{ color: tintColor}} />
    }
  };

  render() {
     const {navigate} = this.props.navigation;

    return (<Container>
      <Header style = {styles.header}>
      <Left style={{flex:1}}>
      <Icon name="menu" style = {styles.icon} onPress={() => this.props.navigation.openDrawer()}/>
      </Left>
      </Header>
              <Content>
                <Form>
                  <Item>
                    <Input placeholder="Заголовок" value={this.state.entryName} onChangeText={(text) => this.handleFormChange(text, "entryName")}/>
                  </Item>
                  <Item>
                    <Input placeholder="Тип заявки" value={this.state.entryType} onChangeText={(text) => this.handleFormChange(text, "entryType")} />
                  </Item>
                  <Item last>
                    <Input placeholder="Описание" value={this.state.description} onChangeText={(text) => this.handleFormChange(text, "description")}/>
                  </Item>
                </Form>

                <Form style={{alignItems:'center'}}>
                <PhotoUpload
                  onPhotoSelect={avatar => {
                    if (avatar) {
                      console.log('Image base64 string: ', avatar)
                    }
                  }}
                >
                  <Image
                    style={{
                      paddingVertical: 30,
                      width: 200,
                      height: 200,

                    }}
                    resizeMode='cover'
                    source={{
                      uri: ' '
                    }}
                  />
                </PhotoUpload>
                       </Form>
                         <View style={styles.buttons}>
                       <Left>
                         <Button style={styles.addB} onPress={() => navigate('EditProblem')}>
                               <Text>Добавить фото</Text>
                         </Button>
                           </Left>
                         <Right>
                         <Button style={styles.addB} onPress={() => navigate('Отметить на карте')}>
                               <Text>Отметить на карте</Text>
                         </Button>
                         </Right>
                           </View >
                           <Form style={{flex:1, alignItems:'center'}}>
                                <Left>
                           <Button style={styles.saveB} onPress={() => this.addproblem()}>
                                 <Text>Сохранить</Text>
                           </Button>
                                </Left>
                           </Form  >
              </Content>

    </Container>);
  }
}
const styles = StyleSheet.create ({
  buttons: {
    flex:1,
    margin: 20,
    flexDirection: 'row',

  },
  addB:{
    flex: 1,
    backgroundColor:'#4682B4',
    alignItems:'center'
  },
  saveB:{
    flex: 1,
    backgroundColor:'#32CD32',
    alignItems:'center'

  },

  icon: {
      color: '#F8F8F8'
   },
   header:{
     backgroundColor: '#4682B4'
   }
})
