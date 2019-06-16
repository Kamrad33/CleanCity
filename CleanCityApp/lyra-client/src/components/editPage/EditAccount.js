import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab,  Left, Body, Right, Title, Icon, Drawer } from 'native-base';
import DocForm from 'react-cross-form';
import { Card, Button } from 'react-native-elements';
import TextInput from 'ProjectOne/TextInput';
import CheckBox from 'ProjectOne/CheckBox';
const FORM_FIELDS = [

    {
      key: 'Login',
      label: 'Логин',
      required: true,
      component: TextInput,
      placeholder: 'Ваш логин',
      validators: {
        presence: { message: 'обязательно' },
        length: { minimum: 3, maximum:64 },
      },
    },
    {
      key: 'Password',
      label: 'Пароль',
      required: true,
      component: TextInput,
      placeholder: 'Ваш пароль',
      validators: {
        presence: { message: 'обязательно' },
        length: { minimum: 5, maximum:64 },
      },
    },
    {
    key: 'firstName',
    label: 'Имя',
    required: true,
    component: TextInput,
    placeholder: 'Ваше имя',
    validators: {
      presence: { message: 'обязательно' },
      length: { minimum: 3 },
    },
  },
  {
    key: 'lastName',
    label: 'Фамилия',
    required: true,
    component: TextInput,
    placeholder: 'Ваша фамилия',
    validators: {
      presence: { message: 'обязательно' },
      length: { minimum: 3 },
    },
  },
  {
    key: 'Patronymic',
    label: 'Отчество',
    required: false,
    component: TextInput,
    placeholder: 'Ваше отчество',
    validators: {
      presence: { message: 'не обязательно' },
      length: { minimum: 3 },
    },
  },
  {
    key: 'email',
    label: 'Email',
    component: TextInput,
    placeholder: 'Ваш eMail',
    validators: { email: true },
  },
  {
    key: 'confirm',
    label: 'Подтвердить изменения',
    component: CheckBox,
    validators: { presence: { message: 'Пожалуйста подтвердите изменения' } },
  },
];

export default class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        Login:null,
        Password:null,
        firstName: null,
        lastName: null,
        Patronymic: null,
        email: null,
        confirm: null,
      },
      isFormValid: false,
      validateType: 'onFocus',
    };
  }
  render() {
    return (
    <Container>
    <Content>
      <Header style = {styles.header}>
      <Left style={{flex:1}}>
      <Icon name="menu" style = {styles.icon} onPress={() => this.props.navigation.openDrawer()}/>
      </Left>
      </Header>
      <View style={styles.container}>
      <Card>
          <DocForm
            fields={FORM_FIELDS}
            data={this.state.form}
            onChange={({ key, updateData }) => {
              this.setState({ form: updateData });
              if (key === 'lastName') {
                this.setState({ validateType: 'all' });
              }
            }}
            validateType={this.state.validateType}
            onValidateStateChanged={({ isValid }) => {
              this.setState({ isFormValid: isValid });
            }}
          />
          <Button
            style ={{color: '#4682B4'}}
            disabled={!this.state.isFormValid}
            title={'Принять изменения'}
            onPress={() => alert(JSON.stringify(this.state.form))}
          />
  </Card>
      </View>
      </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  icon: {
      color: '#F8F8F8'
   },
   header:{
     backgroundColor: '#4682B4'
   }
});
