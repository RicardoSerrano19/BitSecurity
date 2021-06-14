import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';

const Lista = props => {
    return (
            <View style={styles.lista} 
                {...props}>
                <Text style={styles.num}>Fecha: {props.fecha}</Text>
                <Text style={styles.cantidad}>Cantidad: {props.cantidad}</Text>
                <Text style={styles.cantidad}>De: {props.de}</Text>
                <Text style={styles.cantidad}>Para: {props.para}</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    lista:{
        flexDirection: 'column',
        backgroundColor: Colors.grisDifuminado,
        borderWidth: 2,
        borderColor: Colors.gris,
        borderRadius: 10,
        padding: 5,
        margin: 5
    },
    num:{
        color: Colors.gris,
        fontWeight: 'bold',
        paddingRight: 5
    },
    cantidad:{
        color: Colors.negro,
        fontWeight: 'bold'
    }
});

export default Lista;