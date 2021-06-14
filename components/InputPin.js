import React, {useState} from 'react';
import {View, Image, TextInput,TouchableOpacity, Text, StyleSheet} from 'react-native'
import Colors from '../constants/colors';
import Boton from './Boton';

const PalabraInput = props => {
    const [tareaIngresada, setTareaIngresada] = useState('');

    const agregarTareaIngresada = (tareaIngresada) =>{
        setTareaIngresada(tareaIngresada);
    }

    return(
    <View style={styles.main}>
          <TextInput
            {...props}
            style= {styles.txtInput}
            placeholder="palabra"
            onChangeText={agregarTareaIngresada}/>
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '10%'
    },
    btnSecundario:{
        backgroundColor: Colors.white,
        padding: 5,
        color: Colors.gris,
        fontWeight: 'bold',
    },
    txtInput:{
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.negro,
        textAlign:'center'
    }
  });
  
  export default PalabraInput;