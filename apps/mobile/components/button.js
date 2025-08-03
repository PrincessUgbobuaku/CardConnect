import React from "react";
import { Button as PaperButton } from "react-native-paper";

export function AppButton({ style, children, onPress, ...props }) {
  return (
    <PaperButton
      mode="contained"
      buttonColor="#145DA0"
      textColor="#ffffff"
      rippleColor="purple"
      onPress={onPress}
      // loading="true"
      // onPress={() => console.log("Pressed")}
      style={style}
    >
      {children}
    </PaperButton>
  );
}
