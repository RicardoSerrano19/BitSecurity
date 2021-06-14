import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

const Boton = props => {
    return(
        <TouchableOpacity
            style={[styles.button, props.style]}
            {...props}>
        <Text style={props.btnStyle}>{props.titulo}</Text>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        borderColor: Colors.negro,
        borderWidth: 2
      }
});
export default Boton;