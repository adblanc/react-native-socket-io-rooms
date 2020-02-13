import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
const KeyboardDismiss = ({ children }) => (
  <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
    }}
  >
    {children}
  </TouchableWithoutFeedback>
);

export default KeyboardDismiss;
