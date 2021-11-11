import { Component } from 'react';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import { Link } from 'react-router-dom';

import logo from '../../../../../Assets/logo.png';

import '../../../../../CSS/estilo.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      erroMensagem: '',
      isLoading: false,
    };
  }

  efetuarLogin = (evento) => {
    evento.preventDefault();
    this.setState({ erroMensagem: '', isLoading: true })
    axios.post('http://localhost:5000/api/Login', {
      email: this.state.emailg,
      senha: this.state.senha,
    })
    .then((resposta) => {
      if (resposta === 200) {
        localStorage.setItem('usuario-login', resposta.data.token);
        this.setState({ isLoading: false });
        let base64 = localStorage.getItem('usuario-login').split('.')[1];
        console.log(base64);
        console.log(this.props);

        if (parseJwt().role === '1') {
          this.props.history.push('/medico')
        } else if (parseJwt().role === '2') {
          this.props.history.push('/paciente')
        } else {
          this.props.history.push('/administrador')
        }
        
      }
    })

    .catch(() => {
      this.setState({
        erroMensagem: 'E-mail e/ou senha estão inválidos',
        isLoading: false,
      })
    })
  }

  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value });
  }

  render() {
    return (
      <div>
        <body>
          <main class="tela_login_fundo">
            <section class="fundo_login">
              <div class="form_login">
                <img src="../Assets/logo.png" class="logo_login" alt="Logo do Sp Medical Group"></img>
                <form class="organizar_inputs">
                  <input type="text" class="input_login" placeholder="Usuario"></input>
                  <input type="text" class="input_login" placeholder="Senha"></input>
                </form>
                <div class="organizar_btn">
                  <button class="btn_login">Entrar</button>
                </div>
              </div>
              <img src="../Assets/img_login_gradient.png" class="img_login" alt=""></img>
            </section>
          </main>
        </body>
      </div>
    );
  }
}