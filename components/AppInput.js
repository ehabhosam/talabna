import React, { useState } from "react";
import { TextInput, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useFormikContext } from 'formik';

import RelativeView from "./RelativeView";
import ErrorMessage from "./ErrorMessage";

const AppInput = ({ 
    icon,
    focusColor = 'tomato', 
    fieldName,
    width = '90%',
    height = '6vh',
    isValidate = false,
    touched, 
    errors,
    ...otherProps
}) => {
    const [focused, setFocused] = useState(false);
    const _color = focused? focusColor : 'darkgrey'; 
    let value; 
    if (isValidate){
      value = useFormikContext().values[fieldName]
    }
    return ( 
      <>
        <RelativeView 
            width={width}
            height={height}
            style={[styles.container, { borderColor: _color }]}
            >
            {/* icon */}
          {icon && (
            <MaterialCommunityIcons
            name={icon}
            size={20}
            color={_color}
            style={[styles.icon]}
            />
            )}

          {/* input */}
          <TextInput 
            onBlur={ e => setFocused(false)}
            onFocus={ () => setFocused(true)}
            placeholderTextColor={'darkgrey'}
            style={[styles.text]}
            {...otherProps}
          />

          {/* validation icon */}
          {(isValidate)? ((!errors && value.length > 0) && (
            <AntDesign
            name='checkcircle'
            size={20}
            color={'mediumseagreen'}
            style={[styles.icon]}
            />
            )) : null}
        </RelativeView>
        {(isValidate && errors) && <ErrorMessage error={errors} visible={touched}/>}
      </>
      );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'ghostwhite',
      borderRadius: 25,
      flexDirection: "row",
      maxHeight: 150, 
      paddingHorizontal: 10,
      marginVertical: 10,
      borderWidth: 2, 
      borderColor: 'transparent',
      borderStyle: "solid", 
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    text: {
        color: 'darkmagenta' ,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        width : '85%', 
        height: '100%',
    },
  });


export default AppInput;