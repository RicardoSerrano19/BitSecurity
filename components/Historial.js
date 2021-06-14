import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, FlatList,ToastAndroid } from 'react-native';
import Colors from '../constants/colors';
import URL from '../constants/url';
import ListaHistorial from '../components/ListaHistorial';

const Historial = props => {
const [historial,setHistorial] = useState([]);
const [cantBTC,setCantBTC] = useState(0);

const frasesSeleccionadas = [];
//frasesSeleccionadas.push({id: "1",fecha: ,value: "RIcardo"});

useEffect(() =>{
  const getHistorial = async () =>{
    setHistorial([]);
    var url = URL.URL +'/getTransByAddress.php?frase=' + props.direccion;
    console.log("LLAMANDO " + url);
    try {
        let response = await fetch(url);
        let info = await response.json();
        
        setHistorial(info);
        
        console.log(historial);
      } catch(err) {
        ToastAndroid.showWithGravity("Por el momento el momento estamos fuera de servicio, intenta mas tarde...", ToastAndroid.LONG, ToastAndroid.CENTER);
        console.log("Error:" + err); // TypeError: failed to fetch
      }
  }
  getHistorial();

  const getBTC = async () =>{
    var url = URL.URL + '/getByFrase.php?&frase='+ props.frase;
    console.log("LLAMANDO " + url);
    try {
        let response = await fetch(url);
        let info = await response.json();
        setCantBTC(info.cantidadBTC);
      } catch(err) {
        ToastAndroid.showWithGravity("Por el momento el momento estamos fuera de servicio, intenta mas tarde...", ToastAndroid.LONG, ToastAndroid.CENTER);
        console.log("Error:" + err); // TypeError: failed to fetch
      }
  }
  getBTC();
},[]);
  

  return (
    <View style={styles.screen}>
        <Text>Historial de Transacciones</Text>
        <View style={styles.contenedorLista}>
          <Text>Disponible {cantBTC} BTC</Text>
            <FlatList
                contentContainerStyle={styles.flatList}
                keyExtractor = {(item, index) => item.id}
                data = {historial}
                renderItem = { itemData => 
                <ListaHistorial 
                    id = {itemData.item.id}
                    fecha = {itemData.item.fecha} 
                    cantidad = {itemData.item.cantidad} 
                    de = {itemData.item.de} 
                    para = {itemData.item.para} 
                />}
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

export default Historial;