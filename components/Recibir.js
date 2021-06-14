import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import Colors from '../constants/colors';
import TituloRecuadro from './TituloRecuadro';
const Historial = props => {
const [direccion,setDireccion] = useState([]);

  return (
    <View style={styles.screen}>
        <TituloRecuadro titulo={"Recibir"} />
        <View style={styles.container}> 
            <Text>Direccion:</Text>
            <Text selectable={true} style={styles.inputContainer} >{props.direccion}</Text>
        </View>
        <TituloRecuadro titulo={"Copia y pega la direccion para poder recibir cripto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    width: 1000,
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menu:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderColor: Colors.grisDifuminado
  },
  contenedorAcciones:{
    height: 1000,
    maxHeight: '100%',
    alignItems: 'center',
    padding: 10
  },
  inputContainer:{
    color: Colors.rojo,
    fontSize: 25,
    padding: 20,
    textAlign: 'center'
  },
  txtStyle: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default Historial;