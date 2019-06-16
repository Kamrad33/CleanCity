import React from "react";
import { FormLabel, FormInput, FormValidationMessage, CheckBox } from 'react-native-elements'

import { View } from 'react-native';

const CheckBoxInput = res => {
  const {
    id,
    value,
    onFocus,
    onChange,
    onBlur,
    isValid,
    validatorMessage,
    required,
    showWarnings,
    placeholder,
    label,
    requiredPrefix,
    focusNext,
    onRef
  } = res;
  const _isSuccess = showWarnings ? isValid : null;
  const _isError = showWarnings ? !isValid : null;
  const _required = required && requiredPrefix ? requiredPrefix : "";
  return (
    <View>
      <FormLabel>{`${_required}${label}`}</FormLabel>
      <CheckBox
        title='Подтвердить'
        checked={value}
        onPress={() => onChange(value ? null : true)}
      />
      {showWarnings && <FormValidationMessage>{validatorMessage}</FormValidationMessage>}
    </View>
  )
};

export default CheckBoxInput;
