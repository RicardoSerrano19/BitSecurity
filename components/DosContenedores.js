import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

const DosContenedores = props => {
    return(
        <View style={styles.dosContenedores}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    dosContenedores:{
        flex: 1,
        flexDirection: 'row'  
    }
});
export default DosContenedores;