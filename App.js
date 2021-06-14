import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, ToastAndroid } from 'react-native';

import Header from './components/Header';
import Historial from './components/Historial';
import ConectarBluetoothScreen from './screens/ConectarBluetoothScreen';
import BienvenidoScreen from './screens/BienvenidoScreen';
import NuevaBilleteraScreen from './screens/NuevaBilleteraScreen';
import RecuperarBilleteraScreen from './screens/RecuperarBilleteraScreen';
import DigitarPinScreen from './screens/DigitarPinScreen';
import NavigatorScreen from './screens/NavigationScreen';

import Colors from './constants/colors';
import URL from './constants/url';

export default function App() {
  const [isConectado, setIsConectado] = useState(false);
  const [opcionElegidaBilletera, setOpcionElegidaBilletera] = useState(false);

  const [frase, setFrase] = useState();
  const [direccion, setDireccion] = useState("");

  const [crearPin, setCrearPin] = useState(false);
  const [pinActual, setPinActual] = useState(0);
  const [accionPin, setAccionPin] = useState("");


  const bluetoothConectadoHandler = (conectado) =>{
    setIsConectado(conectado);
  };

  const bienvenidaHandler = (opcionElegida) =>{
    setOpcionElegidaBilletera(opcionElegida);
  };

  const crearBilleteraHandler = (fraseRecuperacion) => {
    setFrase(obtenerStringFrase(fraseRecuperacion));
    setAccionPin("CREAR")
    setDireccion(generarDireccion());
    setCrearPin(true);
  };

  const recuperarBilleteraHandler = (fraseRecuperacion) =>{
    setFrase(obtenerStringFrase(fraseRecuperacion));
    setAccionPin("RECUPERAR")
    setCrearPin(true);
  };

  const pinIntroducido = (pin) =>{
    if(accionPin == "CREAR"){
      crearBilletera(pin);
      console.log("Creando...");
      ToastAndroid.showWithGravity("Espera mientras se crea tu billetera....", ToastAndroid.LONG, ToastAndroid.CENTER);
    }else if(accionPin == "RECUPERAR"){
      recuperarBilletera(pin);
      console.log("Recuperando...");
      ToastAndroid.showWithGravity("Espera mientras verificamos los datos...", ToastAndroid.LONG, ToastAndroid.CENTER);
    }else if(accionPin == "AUT"){
      //autorizar(pin);
      console.log("AUT...");
      ToastAndroid.showWithGravity("Espera validamos tu PIN...", ToastAndroid.LONG, ToastAndroid.CENTER);
    }
  }

  const obtenerStringFrase = (frase) =>{
    var fraseString = "";
    for(var i = 0; i < 12; i++){
      var palabra = frase[i].value.toString();
      fraseString = fraseString + palabra;
    }
    return fraseString;
  };

  const generarDireccion = () =>{
    var palabra= (Math.floor(Math.random() * (4 - 1) + 1)).toString();

    for(var i = 0; i <36; i++){
      var aleatorio = Math.floor(Math.random() * (26 - 0) + 0);
      var chr = String.fromCharCode(97 + aleatorio);
      if(i % 2  == 0){
        palabra = palabra + chr.toUpperCase();
      }else{
        palabra = palabra + chr;
      }
    }

    return palabra;
  };

  const recuperarBilletera = async (pin) =>{
    var url = URL.URL + '/getByFrase.php?&frase='+frase;
    console.log("LLAMANDO " + url);
    try {
        let response = await fetch(url);
        let info = await response.json();
        console.log(info);
        console.log(response); 
        console.log(pin);
        console.log(frase);
        if(info.frase == frase && info.pin == pin){
          ToastAndroid.showWithGravity("Datos correctos, recuperando billetera", ToastAndroid.LONG, ToastAndroid.CENTER);
          setDireccion(info.direccion);
          setPinActual(pin);
          console.log(info.direccion)
        }else{
          ToastAndroid.showWithGravity("Datos incorrectos, revisalos de nuevo", ToastAndroid.LONG, ToastAndroid.CENTER);
          setCrearPin(false);
          setPinActual(0);
          setOpcionElegidaBilletera(false);
        }
      } catch(err) {
        setCrearPin(false);
        setPinActual(0);
        setOpcionElegidaBilletera(false);
        ToastAndroid.showWithGravity("Por el momento el momento estamos fuera de servicio, intenta mas tarde...", ToastAndroid.LONG, ToastAndroid.CENTER);
        console.log("Error:" + err); // TypeError: failed to fetch
      }
  }

  const crearBilletera = async (pin) =>{
    var url = URL.URL + '/crearBilletera.php?direccion='+direccion+'&frase='+frase+'&pin='+ pin;
    console.log("LLAMANDO " + url);
    try {
        let response = await fetch(url);
        let info = await response.json();
        let status = response.status;
        console.log(response); 
        console.log(info); 
        setPinActual(pin);
      } catch(err) {
        setCrearPin(false);
        setPinActual(0);
        setOpcionElegidaBilletera(false);
        ToastAndroid.showWithGravity("Por el momento el momento estamos fuera de servicio, intenta mas tarde...", ToastAndroid.LONG, ToastAndroid.CENTER);
        console.log("Error:" + err); // TypeError: failed to fetch
      }
  }

  let contenedorPrincipal = <ConectarBluetoothScreen onConectado = {bluetoothConectadoHandler}/>
  //let contenedorPrincipal = <Historial />

  if(isConectado){
    contenedorPrincipal = <BienvenidoScreen onOpcionBilletera={bienvenidaHandler}/>
  }
  if(opcionElegidaBilletera === 'NUEVA'){
    contenedorPrincipal = <NuevaBilleteraScreen onNuevaBilletera={crearBilleteraHandler}/>
  }else if(opcionElegidaBilletera === 'RECUPERAR'){
    contenedorPrincipal = <RecuperarBilleteraScreen onRecuperarBilletera={recuperarBilleteraHandler}/>
  }
  if(crearPin){
    contenedorPrincipal = <DigitarPinScreen onPinIntroducido={pinIntroducido}/>
  }
  if(pinActual !== 0){
    contenedorPrincipal = <NavigatorScreen direccion={direccion} frase={frase} />
  }

  return (
    <View style={styles.container}>
      <Header title='BitSecurity' />
      {contenedorPrincipal}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.grisDifuminado
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
  }
});
