import React, { useState } from 'react';
import { TextInput as PaperInput } from 'react-native-paper';

const AppTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  style ,
  themeColor = '#145DA0',
  selectionColor = 'orange',
  cursorColor = 'orange',
  ...rest
}) => {
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <PaperInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={isPassword ? secureText : false}
      mode="outlined"
      style={style}
      theme={{ colors: { primary: themeColor } }}
      selectionColor={selectionColor}
      cursorColor={cursorColor}
      right={
        isPassword ? (
          <PaperInput.Icon
            icon={secureText ? 'eye-off' : 'eye'}
            onPress={() => setSecureText(!secureText)}
          />
        ) : null
      }
      {...rest}
    />
  );
};

export default AppTextInput;