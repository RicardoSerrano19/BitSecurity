import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import Lista from './Lista';
import Colors from '../constants/colors';
import words from '../constants/words';

const obtenerIndicesAleatorio = () =>{
    const primero = Math.floor(Math.random() * (2048 - 0) + 0);
    var indicesAleatorios = [];
    indicesAleatorios.push(primero);
    

    while(indicesAleatorios.length <= 11){
        const indice = Math.floor(Math.random() * (2048 - 0) + 0);
        if(!indicesAleatorios.includes(indice)){
            indicesAleatorios.push(indice);
        }
    }
    return indicesAleatorios;
};

const obtenerFrase = () =>{
    const indices = obtenerIndicesAleatorio();
    const frasesSeleccionadas = [];
    for(var i = 0; i < 12; i++){
        frasesSeleccionadas.push({id: i.toString(), value: words.words[indices[i]]});
    }
    return frasesSeleccionadas;
};
const FraseRecuperacion = props => {
    const [frase, setFrase] = useState(obtenerFrase());

    return(
        <View style={styles.container}>
           <FlatList
            contentContainerStyle={styles.flatList}
            keyExtractor = {(item, index) => item.id}
            data = {frase}
            renderItem = { itemData => 
            <Lista 
                id = {itemData.item.id}
                value = {itemData.item.value} 
                />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    flatList:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap'
    }
});
export default FraseRecuperacion;