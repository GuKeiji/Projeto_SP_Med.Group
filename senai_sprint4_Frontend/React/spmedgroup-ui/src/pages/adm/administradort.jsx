import { useState, useEffect } from 'react';
import axios from 'axios';

import '../../CSS/estilo.css';

export default function ConsultaAdm() {
    const [listaConsulta, setListaConsulta] = useState([]);
    const [listaMedico, setListaMedico] = useState([]);
    const [listaPaciente, setListaPaciente] = useState([]);
    const [idPaciente, setIdPaciente] = useState('');
    const [idMedico, setIdMedico] = useState('');
    const [dataConsulta, setDataConsulta] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    function listarConsultas() {
        axios('http://localhost:5000/api/Consultas/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                setListaConsulta(resposta.data)
            }
        })
        
        .catch(erro => console.log(erro))
    };
    
    useEffect(listarConsultas, []);
    
    function listarMedicos() {
        axios('http://localhost:5000/api/Medicos', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                setListaMedico(resposta.data)
            }
        })
        
        .catch(erro => console.log(erro))
    }
    
    useEffect(listarMedicos, []);
    
    function listarPacientes() {
        axios('http://localhost:5000/api/Pacientes', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                setListaPaciente(resposta.data)
            }
        })
        
        .catch(erro => console.log(erro))
    }
    
    useEffect(listarPacientes, []);
    
    function cadastrarConsulta(evento) {
        setIsLoading(true);
        
        evento.preventDefault()
        
        axios.post('http://localhost:5000/api/Consultas', {
            idPaciente: idPaciente,
            idMedico: idMedico,
            dataConsulta: dataConsulta
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta => {
            if (resposta.status === 201) {
                console.log('Consulta cadastrada');
                setIdMedico('');
                setIdPaciente('');
                setDataConsulta('');
                listarConsultas();
                setIsLoading(false);
            }
        })
        .catch(erro => console.log(erro), setIdMedico(''), setIdPaciente(''), setDataConsulta(''), setInterval(() => {
            setIsLoading(false)
        }, 5000));
        
        return (
            <div class="tela_paciente">
            <header class="header_tela_paciente">
                <div class="container_header">
                    <img class="logo_header" src="../Assets/logo.png" alt="logo"></img>
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
                    <img class="icone_injecao" src="../Assets/seringa.png" alt="Icone de uma seringa de injeção"></img>
                </div>
                <table class="tabela_consultas">
                    <thead class="tabela_consultas_thead">
                        <tr>
                            <th>Médico</th>
                            <th>Paciente</th>
                            <th>Situação</th>
                            <th>Data a Consulta</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaConsulta.map((consulta) => {
                            return (
                                <tr key={consulta.idConsulta}>
                                    <td>{consulta.idMedicoNavigation.idUsuarioNavigation.nome}</td>
                                    <td>{consulta.idPacienteNavigation.idUsuarioNavigation.nome}</td>
                                    <td>{consulta.descricao}</td>
                                    <td>{consulta.idSituacaoNavigation.descricao}</td>
                                    <td>{consulta.dataConsulta}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div class="cadastrar_consulta_box">
                    <h2>Nova Consulta</h2>
                    <div class="organizar_form">
                        <form class="form_cadastrar">
                            <select
                                name="medico"
                                id="medico"
                                value={idMedico}
                                onChange={(campo) => setIdMedico(campo.target.value)} class="input_select" placeholder="Nome Médico"
                                >

                                <option class="titulo_select" value="0">Nome Médico</option>

                                {listaMedico.map((medico) => {
                                    return (
                                        <option key={medico.idMedico} value={medico.idMedico}>
                                            {medico.idUsuarioNavigation.nome}
                                        </option>
                                    )
                                })}

                            </select>
                            <select
                                name="paciente"
                                id="paciente"
                                value={idPaciente}
                                onChange={(campo) => setIdPaciente(campo.target.value)} class="input_select" placeholder="Nome Paciente">

                                <option class="titulo_select" value="0">Nome Paciente</option>

                                {listaPaciente.map((paciente) => {
                                    return (
                                        <option key={paciente.idPaciente} value={paciente.idPaciente}>
                                            {paciente.idUsuarioNavigation.nome}
                                        </option>
                                    )
                                })}

                            </select>
                            {/* <input class="input_cadastrar" placeholder="Descrição" type="text"></input> */}
                            <input name="data" class="input_cadastrar_data" value={dataConsulta} onChange = {(campo) => setDataConsulta(campo.target.value)} type="datetime-local"></input>
                            <div class="organizar_btn_cadastrar">
                                <button class="btn_enviar">Cadastrar</button>
                            </div>
                        </form>
                        <img class="img_form" src="../Assets/img_form.png" alt="Imagem de um Médico"></img>
                    </div>
                </div>
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
                    <img class="logo_header" src="../Assets/logo.png" alt="logo"></img>
                    <p>Salvar vidas e cuidar das pessoas porque elas não podem esperar nas filas da saúde</p>
                </div>
            </footer>
        </div>
    )
}
}