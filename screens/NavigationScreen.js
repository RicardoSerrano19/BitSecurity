import React, {useState} from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import Historial from '../components/Historial';
import Enviar from '../components/Enviar';
import Recibir from '../components/Recibir';

const NavigatorScreen = props => {
  const [actividadActual, setActividadActual] = useState(1);
  const [direccion, setDireccion] = useState(props.direccion);

  const cambiarPantallaHandler = (noPantalla) =>{
    setActividadActual(noPantalla)
  }

  let actividadPrincipal = <Historial />
  if(actividadActual === 1){
    actividadPrincipal = <Historial frase={props.frase} direccion={props.direccion}/>
  }else if(actividadActual === 2){
    actividadPrincipal = <Enviar direccion={props.direccion} />
  }else if(actividadActual === 3){
    actividadPrincipal = <Recibir direccion={props.direccion} />
  }
  return (
    <View style={styles.screen}>
          <View style={styles.container}>
              <View style={styles.menu}>
                <TouchableOpacity onPress={() => {cambiarPantallaHandler(1)}}>
                  <Text style={styles.txtStyle}>Historial</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {cambiarPantallaHandler(2)}}>
                  <Text style={styles.txtStyle}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {cambiarPantallaHandler(3)}}>
                  <Text style={styles.txtStyle}>Recibir</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contenedorAcciones}>
                {actividadPrincipal}
              </View>
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
    height: '100%',
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
  }
});

export default NavigatorScreen;