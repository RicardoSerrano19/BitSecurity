import React ,{useState}from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

import TituloContenedor from '../components/TituloContenedor';
import Recuadro from '../components/Recuadro';
import TituloRecuadro from '../components/TituloRecuadro';
import Boton from '../components/Boton';
import Lista from '../components/Lista';

import words from '../constants/words';
import Colors from '../constants/colors';

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

const NuevaBilleteraScreen = props => {
    const [frase, setFrase] = useState(obtenerFrase());

    return(
        <View style={styles.screen}>
            <View style={styles.container}>
                <TituloContenedor titulo={"Crear Nueva"}/>
                <Recuadro style={styles.width100}>
                    <TituloRecuadro titulo={"Almacena tus 12 palabras en papel y no las compartas con nadie"} />
                    <View style={styles.contenedorLista}>
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
                    <Boton titulo={"Continuar"} 
                            btnStyle={styles.btnPrimario}
                            onPress={props.onNuevaBilletera.bind(this, frase)}
                            />
                </Recuadro>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        backgroundColor: Colors.blancoContenedor,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%'
    },
    container:{
        flex: 1,
        backgroundColor: Colors.blancoContenedor,
        width: 1000,
        maxWidth: '100%',
        alignItems: 'flex-start',
    },
    width100:{
        width: '100%'
    },
    btnPrimario:{
        backgroundColor: Colors.verde,
        padding: 10,
        color: Colors.blanco,
        fontWeight: 'bold'
    },
    contenedorLista:{
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flatList:{
        maxWidth: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap-reverse'
    }
});
export default NuevaBilleteraScreen;