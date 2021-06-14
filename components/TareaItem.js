import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

const TareaItem = props => {
    return (
            <View style={styles.lista} on>
                <Text>{props.tarea}</Text>
                <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
                <Text style={styles.red}>X</Text>
                </TouchableOpacity>
            </View>

    );
}

const styles = StyleSheet.create({
    main: {
        width: '100%'
      },
    lista:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '100%',
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 50,
        marginTop: 10,
        padding: 5
    },
    red: {
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 5
    }
});

export default TareaItem;