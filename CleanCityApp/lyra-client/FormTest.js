import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DocForm from 'react-cross-form';
import { Card, Button } from 'react-native-elements';
import TextInput from './TextInput';
import CheckBox from './CheckBox';
const FORM_FIELDS = [
  {
    key: 'firstName',
    label: 'First Name',
    required: true,
    component: TextInput,
    placeholder: 'Type your first name...',
    validators: {
      presence: { message: 'is required' },
      length: { minimum: 3 },
    },
  },
  {
    key: 'lastName',
    label: 'Last Name',
    required: true,
    component: TextInput,
    placeholder: 'Type your last name...',
    validators: {
      presence: { message: 'is required' },
      length: { minimum: 3 },
    },
  },
  {
    key: 'email',
    label: 'Email',
    component: TextInput,
    placeholder: 'Type your name...',
    validators: { email: true },
  },
  {
    key: 'confirm',
    label: 'Confirm term',
    component: CheckBox,
    validators: { presence: { message: 'please confirm terms' } },
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: null,
        lastName: null,
        email: null,
        confirm: null,
      },
      isFormValid: false,
      validateType: 'onFocus',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>This is a example of react-cross-form</Text>
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
            disabled={!this.state.isFormValid}
            title={'Submit'}
            onPress={() => alert(JSON.stringify(this.state.form))}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  }
});
