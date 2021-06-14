import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput, ToastAndroid } from 'react-native';
import TituloRecuadro from './TituloRecuadro';
import Boton from './Boton';
import Colors from '../constants/colors';
import URL from '../constants/url';

const Enviar = props => {
const [miDireccion,setMiDireccion] = useState(props.direccion);
const [direccionDestino,setDireccionDestino] = useState("");
const [cantidad,setCantidad] = useState(0);

const direccionHandler = inputTxt =>{
  setDireccionDestino(inputTxt);
};

const cantidadHandler = inputTxt =>{
    setCantidad(inputTxt.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'));
};

const enviarCripto = () =>{
  if(direccionDestino == "" || cantidad == 0 || cantidad == undefined || direccionDestino == undefined){
    ToastAndroid.showWithGravity("La cantidad tiene que ser mayor a 0 y debes ingresar una direccion de destino", ToastAndroid.LONG, ToastAndroid.CENTER);
  }else{
    enviarCriptoBD();
  }
}

const enviarCriptoBD = async () =>{
  var url = URL.URL + '/crearTransaccion.php?de=' + miDireccion+'&para='+direccionDestino+'&cantidad='+ cantidad;  
  try {
      let response = await fetch(url);
      let info = await response.text();
      console.log(info);
      if(info == "Fondos insuficientes"){
        console.log(cantidad);
        ToastAndroid.showWithGravity("No tienes los fondos suficientes! Intenta con una cantidad menor", ToastAndroid.LONG, ToastAndroid.CENTER);
        setCantidad();
      }else{
        ToastAndroid.showWithGravity("Envio exitoso!", ToastAndroid.LONG, ToastAndroid.CENTER);
        setCantidad(0);
        setDireccionDestino("");
      }
      
    } catch(err) {
      ToastAndroid.showWithGravity("Ocurrio un problema y no se proceso la transaccion", ToastAndroid.LONG, ToastAndroid.CENTER);
      console.log(err); // TypeError: failed to fetch
    }
}
  return (
    <View style={styles.screen}>
        <TituloRecuadro titulo={"Enviar"} />
        <View style={styles.container}>
        <View style={styles.padding}> 
            <Text>Direccion:</Text>
            <TextInput style={styles.inputContainer} 
                blurOnSubmit 
                autoCapitalize='none' 
                autoCorrect={false} 
                keyboardType='default' 
                maxLength={40}
                onChangeText={direccionHandler}
                value={direccionDestino}/>
        </View>        
        <View style= {styles.padding}> 
            <Text>Cantidad:</Text>
            <TextInput style={styles.inputContainer} 
                blurOnSubmit 
                autoCapitalize='none' 
                autoCorrect={false} 
                keyboardType='numeric' 
                maxLength={10}
                onChangeText={cantidadHandler}
                value={cantidad}/>
        </View>
        <Boton titulo={"Enviar"} 
                            btnStyle={styles.btnPrimario}
                            onPress={enviarCripto}
                            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scree:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  txtStyle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  inputContainer:{
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    textAlign: 'center',
    borderBottomColor: Colors.negro,
    borderBottomWidth: 2
},
padding:{
  padding: 20,
  margin: 20
},
btnPrimario:{
  backgroundColor: Colors.verde,
  padding: 10,
  color: Colors.blanco,
  fontWeight: 'bold'
}
});

export default Enviar;