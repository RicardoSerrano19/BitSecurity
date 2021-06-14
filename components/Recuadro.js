import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


import Colors from '../constants/colors';

const Recuadro = props => {
    return(
        <View style={[styles.recuadro, props.style]}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    recuadro:{
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.grisDifuminado,
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
});
export default Recuadro;