import React from "react";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { View } from 'react-native';

const TextInput = res => {
  const { id, value, onFocus, onChange, onBlur, isValid, validatorMessage, required, showWarnings, placeholder, label, requiredPrefix, focusNext, onRef } = res;
  const _isSuccess = showWarnings ? isValid : null;
  const _isError = showWarnings ? !isValid : null;
  const _required = required && requiredPrefix ? requiredPrefix : "";
  return (
  <View>
        <FormLabel>
          {`${_required}${label}`}
        </FormLabel>
      <FormInput
        onChangeText={onChange}
        value={value}
        ref={ref => {onRef(ref)}}
        onBlur={onBlur}
        onFocus={onFocus}
        onSubmitEditing={focusNext}
      />
      {showWarnings && <FormValidationMessage>{validatorMessage}</FormValidationMessage>}
  </View>
  )

};

export default TextInput;
