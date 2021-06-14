import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors'

const Header = props => {
    return (
        <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.txtLogo}>B</Text>
            </View>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.negro,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        color: Colors.blanco,
        fontSize: 20,
        fontWeight: 'bold'
    },
    logo:{
        backgroundColor: Colors.blanco,
        padding: 5,
        marginRight: 5,
        borderRadius: 5
    },
    txtLogo:{
        fontSize: 25,
        fontWeight: 'bold'
    }
});

export default Header;