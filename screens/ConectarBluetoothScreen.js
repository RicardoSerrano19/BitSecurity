import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';

import Boton from '../components/Boton';
import Colors from '../constants/colors';

const ConectarBluetoothScreen = props => {
  const [activado, setIsActivado] = useState(false);
  const [isConectado, setIsConectado] = useState(false);

  const {onConectado} = props;

  const verificarBluetooth = async () => {
    try{
        const isEnabled = await BluetoothSerial.isEnabled();
        if(!isEnabled){
          const activado = await BluetoothSerial.requestEnable();
          setIsActivado(true);
          if(activado){
              ToastAndroid.showWithGravity("Activado", ToastAndroid.LONG, ToastAndroid.CENTER);
          }
        }
        conectarHardware();
    }catch(ex){
        console.log(ex);
        ToastAndroid.showWithGravity("Necesitas Activar Bluetooth para continuar", ToastAndroid.LONG, ToastAndroid.CENTER);
    }
  }

  const conectarHardware = async () => {
    console.log("Intentando conectar");
    const ID = "00:13:EF:00:1E:10";
    try{
        const bitSecurity = await BluetoothSerial.connect(ID);
        await BluetoothSerial.device(ID).write("C");
        setIsConectado(true);
        ToastAndroid.showWithGravity("Hardware Conectada", ToastAndroid.LONG, ToastAndroid.CENTER);
    }catch(ex){
        ToastAndroid.showWithGravity("Ocurrio un problema en la conexion", ToastAndroid.LONG, ToastAndroid.CENTER);
    }
  }

  useEffect(() =>{
    if(isConectado){
      props.onConectado(true);
    }
  },[onConectado, isConectado]);

  return (
    <View 
      style={styles.container}>
          <Text style={styles.txt}>Conectar a BitSecurity Wallet</Text>
          {!isConectado && (              
            <Boton titulo="Conectar"
              btnStyle={styles.btnPrimario} 
              onPress={() => verificarBluetooth()}/>
            ) 
          }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blancoContenedor,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  btnPrimario:{
    backgroundColor: Colors.verde,
    padding: 10,
    color: Colors.blanco,
    fontWeight: 'bold',
  },
  modal:{
    margin: 60,
    backgroundColor: Colors.amarillo,
    width: '70%',
    height: '70%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: Colors.rojo,
    borderWidth: 5
  },
  btnSecundario:{
    backgroundColor: Colors.white,
    padding: 10,
    color: Colors.gris,
    fontWeight: 'bold'
  },
  txt:{
    color: Colors.negro,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 20
  }
});

export default ConectarBluetoothScreen;