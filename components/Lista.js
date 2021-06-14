import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';

const Lista = props => {
    return (
            <View style={styles.lista} 
                {...props}>
                <Text style={styles.num}>{(parseInt(props.id)+ 1).toString()}</Text>
                <Text style={styles.palabra}>{props.value}</Text>
            </View>

    );
}

const styles = StyleSheet.create({
    lista:{
        flexDirection: 'row',
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
    palabra:{
        color: Colors.negro,
        fontWeight: 'bold'
    }
});

export default Lista;