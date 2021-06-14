import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,FlatList, Alert} from 'react-native';

import Boton from '../components/Boton';
import TituloContenedor from '../components/TituloContenedor';
import TituloRecuadro from '../components/TituloRecuadro';
import Recuadro from '../components/Recuadro';
import PalabraInput from '../components/PalabaInput';
import TareaItem from '../components/TareaItem';

import Colors from '../constants/colors';

const NuevaBilleteraScreen = props => {
    const [tareas, setTareas] = useState([]);
    const [isCompleto, setIsCompleto] = useState(true);

    const agregarListaTareas = (tareaIngresada) =>{
        if(tareas.length > 11){
            Alert.alert("Maximo de palabras", 
            "Ya ingresaste las palabras necesarias",
            [{text: 'Okay', style:'cancel'}]);
            return;
        }
        if(/^[a-zA-Z]+$/.test(tareaIngresada)){
        setTareas(tareas => [...tareas,{id: Math.random().toString(), value: tareaIngresada.toLowerCase()}]);
        }else{
            Alert.alert("Palabra invalida", 
            "No debe contener espacios en blanco, ni numeros, ni caracteres especiales",
            [{text: 'Okay', style:'cancel'}]);
            return;
        }
    }

    const eliminarTarea = (idTarea) =>{
        setTareas( tareas => {
        return tareas.filter( tarea => tarea.id !== idTarea);
        });
    }

    let btnAvanzar = <Boton titulo={"Comprobar"} 
                        btnStyle={styles.btnPrimario}
                        onPress={() => {comprobar()}}
                    />
    
    const comprobar = () => {
        if(tareas.length > 11){
            Alert.alert("Luce bien", 
            "Para continuar presiona el boton de recuperar",
            [{text: 'Okay', style:'cancel'}]);
            setIsCompleto(false);
        }
    };

    return(
        <View style={styles.screen}>
            <View style={styles.container}>
            <TituloContenedor titulo={"Recuperar Billetera"}/>
                <Recuadro style={styles.width100}>
                <TituloRecuadro titulo={"Ingresa las palabras en orden de 1 al 12"} />
                <PalabraInput 
                    blurOnSubmit 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    keyboardType='default' 
                    maxLength={20}
                    onAgregarTarea = {agregarListaTareas} />
                <FlatList
                    style ={styles.main}
                    keyExtractor = {(item, index) => item.id}
                    data = {tareas}
                    renderItem = { itemData => 
                    <TareaItem 
                        id = {itemData.item.id}
                        onDelete={eliminarTarea} 
                        tarea = {itemData.item.value} />}
                />
                {btnAvanzar}
                <Boton titulo={"Recuperar"} 
                    disabled={isCompleto}
                    btnStyle={styles.btnPrimario}
                    onPress={props.onRecuperarBilletera.bind(this,tareas)}
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
    btnPrimario:{
        backgroundColor: Colors.verde,
        padding: 10,
        color: Colors.blanco,
        fontWeight: 'bold'
    },
    width100:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default NuevaBilleteraScreen;