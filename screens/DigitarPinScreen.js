import React,{useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity,Alert,ToastAndroid} from 'react-native';

import TituloContenedor from '../components/TituloContenedor';
import Recuadro from '../components/Recuadro';
import Boton from '../components/Boton';
import BluetoothSerial from 'react-native-bluetooth-serial-next';

import Colors from '../constants/colors';

const DigitarPinScreen = props => {
    const [pinValue, setPinValue] = useState("");
    const [isConfirmado, setIsConfirmado] = useState(true);
    const [pinMandado, setPinMandado] = useState(false);
    const [activado, setIsActivado] = useState(false);
    const [numeros, setNumeros] = useState(["1", "2","3", "4", "5", "6", "7", "8"]);

    useEffect(() =>{
        const verificarBluetooth = async () => {
            console.log("Conectando PIN");
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
                verificarBluetooth();
                setPinMandado(false);
                ToastAndroid.showWithGravity("Necesitas Activar Bluetooth para continuar", ToastAndroid.LONG, ToastAndroid.CENTER);
            }
        }
        
        const conectarHardware = async () => {
            console.log("Intentando conectar");
            const ID = "00:13:EF:00:1E:10";
            try{
                console.log("MANDANDO");
                const isConnected = await BluetoothSerial.isConnected(ID);
                if(!isConnected){
                    const bitSecurity = await BluetoothSerial.connect(ID);
                }
                await BluetoothSerial.device(ID).write(obtenerPINAleatorio());
                setPinMandado(true);
                ToastAndroid.showWithGravity("Verifica posicion de los digitos en BitSecurity", ToastAndroid.LONG, ToastAndroid.CENTER);
            }catch(ex){
                setPinMandado(false);
                ToastAndroid.showWithGravity("Ocurrio un problema en la conexion", ToastAndroid.LONG, ToastAndroid.CENTER);
            }
        }
        verificarBluetooth();
    },[]);
    

    const verificarBluetooth = async () => {
        console.log("Conectando PIN");
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
            verificarBluetooth();
            setPinMandado(false);
            ToastAndroid.showWithGravity("Necesitas Activar Bluetooth para continuar", ToastAndroid.LONG, ToastAndroid.CENTER);
        }
    }
    
    const conectarHardware = async () => {
        console.log("Intentando conectar");
        const ID = "00:13:EF:00:1E:10";
        try{
            console.log("MANDANDO");
            const isConnected = await BluetoothSerial.isConnected(ID);
            if(!isConnected){
                const bitSecurity = await BluetoothSerial.connect(ID);
            }
            await BluetoothSerial.device(ID).write(obtenerPINAleatorio());
            setPinMandado(true);
            ToastAndroid.showWithGravity("Verifica posicion de los digitos en BitSecurity", ToastAndroid.LONG, ToastAndroid.CENTER);
        }catch(ex){
            setPinMandado(false);
            ToastAndroid.showWithGravity("Ocurrio un problema en la conexion", ToastAndroid.LONG, ToastAndroid.CENTER);
        }
    }

    const digitarPin = (value) => {
        console.log(numeros[value-1]);
        const currentValue = pinValue + numeros[value-1];
        if(currentValue.length >= 1){
            setIsConfirmado(false)
        }else{
            setIsConfirmado(true)
        }
        if(currentValue.length <= 9){
            setPinValue(currentValue);
        }else{
            Alert.alert("Numero maximo alcanzado", 
            "Pin de 9 digitos",
            [{text: 'Okay', style:'cancel'}]);
        }
    }

    const borrarTxt = () => {
        setPinValue("");
        setIsConfirmado(true);
    }

    const obtenerPINAleatorio = () =>{
        var currentIndex = numeros.length,  randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [numeros[currentIndex], numeros[randomIndex]] = [
            numeros[randomIndex], numeros[currentIndex]];
        }
        var numString = numeros.toString();
        var pinEnviar = "T" + numString.replace(/,/g, "");
        console.log(pinEnviar)
        return pinEnviar;
    }

    return(
        <View style= {styles.screen} >
            {!pinMandado && (              
            <View style={styles.container}>
                    <TouchableOpacity
                                    style={[styles.button, styles.btnSecundario]}
                                    onPress={() => {obtenerPINAleatorio()}}
                                    >
                                <Text style={styles.btnStyle}>Intentar de Nuevo</Text>
                        </TouchableOpacity>
            </View>
            ) 
        }
            {pinMandado && (              
            <View style={styles.container}>
                <TituloContenedor titulo={"Introduzca Pin"}/>
                <Recuadro style={styles.width100}>
                    <View style={styles.viewInput}>
                            <TextInput
                                style= {styles.txtInput}
                                secureTextEntry
                                textAlign='center'
                                value={pinValue}
                                placeholder="-"
                                editable = {false}
                            />
                    </View>
                    <View style={styles.fila}>
                            <TouchableOpacity
                                    style={[styles.button, styles.btnSecundario]}
                                    onPress={() => {digitarPin(1)}}
                                    >
                                <Text style={styles.btnStyle}>*</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={[styles.button, styles.btnSecundario]}
                                    onPress={() => {digitarPin(2)}}
                                    >
                                <Text style={styles.btnStyle}>*</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={[styles.button, styles.btnSecundario]}
                                    onPress={() => {digitarPin(3)}}
                                    >
                                <Text style={styles.btnStyle}>*</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={[styles.button, styles.btnSecundario]}
                                    onPress={() => {digitarPin(4)}}
                                    >
                                <Text style={styles.btnStyle}>*</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={styles.fila}>
                            <TouchableOpacity
                                    style={[styles.button, styles.btnSecundario]}
                                    onPress={() => {digitarPin(5)}}
                                    >
                                <Text style={styles.btnStyle}>*</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={[styles.button, styles.btnSecundario]}
                                    onPress={() => {digitarPin(6)}}
                                    >
                                <Text style={styles.btnStyle}>*</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={[styles.button, styles.btnSecundario]}
                                    onPress={() => {digitarPin(7)}}
                                    >
                                <Text style={styles.btnStyle}>*</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={[styles.button, styles.btnSecundario]}
                                    onPress={() => {digitarPin(8)}}
                                    >
                                <Text style={styles.btnStyle}>*</Text>
                            </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                                    style={[styles.button, styles.btnSecundario]}
                                    onPress={() => {borrarTxt()}}
                                    >
                                <Text style={styles.btnStyle}>Borrar Todo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                                    disabled={isConfirmado}
                                    style={[styles.button, styles.btnPrimario]}
                                    onPress={props.onPinIntroducido.bind(this,pinValue)}
                                    >
                                <Text style={[styles.btnStyle, styles.btnBlanco]}>Confirmar</Text>
                        </TouchableOpacity>
                </Recuadro>
            </View>
            ) 
        }
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
    },
    width100:{
        width: '100%',
        justifyContent:'center',
        alignItems: 'center'
    },
    btnPrimario:{
        backgroundColor: Colors.verde,
        padding: 10,
        color: Colors.blanco,
        fontWeight: 'bold'
    },
    btnSecundario:{
        backgroundColor: Colors.white,
        padding: 10,
        height: 50,
        color: Colors.gris,
        fontWeight: 'bold'
    },
    button: {
        alignItems: "center",
        borderColor: Colors.negro,
        maxHeight: 100,
        borderWidth: 2,
        margin: 10
    },
    btnStyle:{
        fontWeight:'bold'
    },
    btnBlanco:{
        color:'white'
    },
    contenedorBotones:{
        width: '100%',
        height: '50%',
        flexDirection: 'column',
        backgroundColor: Colors.verde,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fila:{
        flexDirection: 'row'
    },
    txtInput:{
        textAlign: 'center',
        width: '50%',
        borderWidth: 2,
        borderColor: Colors.negro,
        padding: 10,
        fontWeight: 'bold',
        letterSpacing: 5
    }
});

export default DigitarPinScreen;