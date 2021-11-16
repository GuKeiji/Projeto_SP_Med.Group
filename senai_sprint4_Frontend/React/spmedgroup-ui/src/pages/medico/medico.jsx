import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../CSS/estilo.css';
import logo from '../../Assets/logo.png';
import seringa from '../../Assets/seringa.png';
import icon_edit from '../../Assets/icon_edit.png'

export default function Paciente() {
    const [listaMinhasConsultas, setListaMinhasConsultas] = useState([]);
    const [idConsulta, setIdConsulta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function buscarMinhasConsultas() {
        axios('http://localhost:5000/api/Consultas/Lista/Minhas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaMinhasConsultas(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    };

    useEffect(buscarMinhasConsultas, [])

    alterarDescricao = (event) => {

        setIsLoading(true);

        event.preventDefault();

        axios.patch("http://localhost:5000/api/Consultas/AlterarDescricao" + idConsulta, {

        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta => {
            if (resposta.status === 201) {
                console.log('Descrição alterada');

                listarConsultas();
                setIsLoading(false);
            }
        })
        .catch(erro => console.log(erro), setInterval(() => {
            setIsLoading(false)
        }, 5000));
    }

    return (
        <div>
            <div class="tela_paciente">
                <header class="header_tela_paciente">
                    <div class="container_header">
                        <img class="logo_header" src={logo} alt="logo"></img>
                        <div class="container_links">
                            <span>Home</span>
                            <span>Consultas</span>
                            <span>Sign-up</span>
                            <span>Sair</span>
                        </div>
                    </div>
                </header>
                <main class="container_main">
                    <div class="titulo_pagina_box container">
                        <h1>Minhas Consultas</h1>
                        <img class="icone_injecao" src={seringa} alt="Icone de uma seringa de injeção"></img>
                    </div>
                    <table class="tabela_consultas">
                        <thead class="tabela_consultas_thead">
                            <tr>
                                <th>Paciente</th>
                                <th>Situação</th>
                                <th>Data a Consulta</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                listaMinhasConsultas.map((consulta) => {
                                    return (

                                        <tr key={consulta.idConsulta}>
                                            <td>{consulta.idPacienteNavigation.idUsuarioNavigation.nome}</td>
                                            <td>{consulta.idSituacaoNavigation.descricao}</td>
                                            <td>{ Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.DataConsulta)) }</td>
                                            <td>{consulta.Descricao}</td>
                                            <td><button onClick={alterarDescricao} type='submit' className="btn_edit"><img src={icon_edit} alt="Icone de edição"/></button></td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </main>
                <footer class="footer_tela_paciente">

                    <div class="container_footer">
                        <ul class="lista_footer">
                            <li>Serviços</li>
                            <li>Consultas</li>
                            <li>Exames</li>
                            <li>Check-ups</li>
                            <li>Vacinas</li>
                            <li>Cirurgias</li>
                        </ul>
                        <img class="logo_header" src={logo} alt="logo"></img>
                        <p>Salvar vidas e cuidar das pessoas porque elas não podem esperar nas filas da saúde</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}