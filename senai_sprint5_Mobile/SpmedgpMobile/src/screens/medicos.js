import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    FlatList,
    TextInput,
} from 'react-native';


import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Medicos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
        };
    }

    buscarConsultas = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');

            const resposta = await api.get('/Consultas/Lista/Minhas', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (resposta.status == 200) {
                const listaDeConsultas = resposta.data.listaConsulta
                this.setState({ listaConsultas: listaDeConsultas });
            }
            // console.warn(this.state.listaConsultas)
        }

        catch (error) {
            console.warn(error)
        }
    }

    componentDidMount() {
        this.buscarConsultas();
    }



    render() {
        return (
            <View style={styles.body}>
                <View style={styles.header}>
                    <View style={styles.container_header}>
                        <Image style={styles.logo}
                            source={require('../../Assets/logo.png')}>
                        </Image>
                        <Image style={styles.menu_hamburguer}
                            source={require('../../Assets/menu_hamburger.png')}></Image>
                    </View>
                </View>
                <View style={styles.main}>
                    {/* <View style={styles.container_consultas}>
                        <View style={styles.container_consulta}>
                            <View style={styles.container_dados}>
                                <Text style={styles.titulos}>Paciente</Text>
                                <Text style={styles.dados}>Helenice</Text>
                            </View>
                            <View style={styles.container_dados}>
                                <Text style={styles.titulos}>Situação</Text>
                                <Text style={styles.dados}>Agendada</Text>
                            </View>
                            <View style={styles.container_dados}>
                                <Text style={styles.titulos}>Data da Consulta</Text>
                                <Text style={styles.dados}>04/10/22</Text>
                            </View>
                            <View style={styles.container_dados}>
                                <Text style={styles.titulos}>Descrição</Text>
                            </View>
                            <Text style={styles.descricao}>Presencial</Text>
                        </View>
                    </View> */}
                    {/* <View style={styles.container_consultas}>
                        <View style={styles.container_consulta}>
                            <View style={styles.container_dados}>
                                <Text style={styles.titulos}>Paciente</Text>
                                <Text style={styles.dados}>Helenice</Text>
                            </View>
                            <View style={styles.container_dados}>
                                <Text style={styles.titulos}>Situação</Text>
                                <Text style={styles.dados}>Agendada</Text>
                            </View>
                            <View style={styles.container_dados}>
                                <Text style={styles.titulos}>Data da Consulta</Text>
                                <Text style={styles.dados}>04/10/22</Text>
                            </View>
                            <View style={styles.container_dados}>
                                <Text style={styles.titulos}>Descrição</Text>
                            </View>
                            <Text style={styles.descricao}>Presencial</Text>
                        </View>
                    </View> */}

                    <FlatList
                        // contentContainerStyle={styles.container_consultas}
                        data={this.state.listaConsultas}
                        keyExtractor={item => item.idConsulta}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }

    renderItem = ({ item }) => (
        <View style={styles.container_consultas}>
            <View style={styles.container_consulta}>
                <View style={styles.container_dados}>
                    <Text style={styles.titulos}>Paciente</Text>
                    <Text style={styles.dados}>{item.idPacienteNavigation.idUsuarioNavigation.nome}</Text>
                </View>
                <View style={styles.container_dados}>
                    <Text style={styles.titulos}>Situação</Text>
                    <Text style={styles.dados}>{item.idSituacaoNavigation.descricao}</Text>
                </View>
                <View style={styles.container_dados}>
                    <Text style={styles.titulos}>Data da Consulta</Text>
                    <Text style={styles.dados}>{moment(item.dataConsulta).format('L')}</Text>
                </View>
                <View style={styles.container_dados}>
                    <Text style={styles.titulos}>Descrição</Text>
                </View>
                <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    //body
    body: {
        width: '100%',
        height: '100%',
    },

    //header
    header: {
        // flexDirection: 'row',
        backgroundColor: '#5049A9',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    container_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: '50%',
    },

    logo: {
        width: 24,
        height: 25,
    },

    menu_hamburguer: {
        width: 25,
        height: 25,
    },

    //main
    main: {
        // backgroundColor: '#ff0000',
        alignItems: 'center',
        width: '100%',
        // height: 629
    },

    container_consultas: {
        // backgroundColor: '#00ff00',
        width: 300,
        height: 144,
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    container_consulta: {
        backgroundColor: '#5049A9',
        width: '100%',
        height: 144,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },

    container_dados: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: 20,
    },

    titulos: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },

    dados: {
        fontSize: 12,
        fontWeight: 'light',
        color: '#fff',
    },

    descricao: {
        // backgroundColor: '#ff0000',
        alignItems: 'flex-start',
        width: '90%',
        height: 50,
        fontSize: 12,
        fontWeight: 'light',
        color: '#fff',
    },

})

// import React, { useState, useEffect } from 'react';
// import {
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//     Image,
//     FlatList,
//     ImageBackground,
//     TextInput,
// } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import api from '../services/api';


// function Medicos() {
//     const [listaConsultas, setListaConsultas] = useState();

//     async function buscarConsultas() {
//         console.warn('Buscando consultas...')
//         const token = await AsyncStorage.getItem('userToken');

//         const response = await api('/Medicos', {
//             headers: {
//                 Authorization: 'Bearer ' + token
//             }
//         })

//         if (response.status === 200) {
//             setListaConsultas(resposta.data)
//         }
//     }

//     useEffect(buscarConsultas, [])

//     return (
//         <View>
//             <Text>Médicos</Text>
//         </View>
//     )
// }

// const styles = StyleSheet.create({


// })

// export default Medicos;