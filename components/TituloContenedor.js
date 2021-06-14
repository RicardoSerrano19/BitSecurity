import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

const TituloContenedor = props => {
    return(
        <View style={styles.tituloContenedor}>
            <Text style={styles.tituloTxt}>{props.titulo}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    tituloContenedor:{
        width: 1000,
        maxWidth: '100%',
        borderWidth: 1,
        borderColor: Colors.grisDifuminado,
        padding: 10
    },
    tituloTxt: {
        fontWeight: 'bold',
        fontSize: 24
    }
});
export default TituloContenedor;