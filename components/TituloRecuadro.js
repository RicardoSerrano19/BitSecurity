import React from 'react';
import {Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

const TituloRecuadro = props => {
    return(
        <Text style={styles.tituloTxt}>{props.titulo}</Text>
    );
};

const styles = StyleSheet.create({
    tituloTxt: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    }
});
export default TituloRecuadro;