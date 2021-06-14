import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import TituloContenedor from '../components/TituloContenedor';
import DosContenedores from '../components/DosContenedores';
import Recuadro from '../components/Recuadro';
import Boton from '../components/Boton';
import TituloRecuadro from '../components/TituloRecuadro';

import Colors from '../constants/colors';

const BienvenidoScreen = props => {
    return(
        <View style={styles.screen}>
            <View style={styles.container}>
                <TituloContenedor titulo={"Bienvenido"}/>
                <DosContenedores>
                    <Recuadro>
                        <TituloRecuadro titulo={"Crear nuevo monedero"} />
                        <Boton titulo={"Crear Billetera"} 
                                btnStyle={styles.btnPrimario}
                                onPress = {props.onOpcionBilletera.bind(this, 'NUEVA')}/>
                    </Recuadro>
                    <Recuadro>
                        <TituloRecuadro titulo={"Recuperar existente"} />
                        <Boton titulo={"Recuperar"} 
                                btnStyle={styles.btnSecundario}
                                onPress = {props.onOpcionBilletera.bind(this, 'RECUPERAR')}/>
                    </Recuadro>
                </DosContenedores>
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
    btnSecundario:{
        backgroundColor: Colors.white,
        padding: 10,
        color: Colors.gris,
        fontWeight: 'bold'
    }
});
export default BienvenidoScreen;