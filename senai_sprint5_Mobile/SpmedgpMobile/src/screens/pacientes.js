import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    TextInput,
} from 'react-native';
import api from '../services/api';

export default class Pacientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
        };
    }

    
    render(){
        return(
            <View>
                <Text>Paciente</Text>
            </View>
        )
    }
}