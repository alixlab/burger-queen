/* eslint-disable no-unused-vars */
import React, { Fragment, Component } from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { Button } from 'react-bootstrap';
import burger from '../img/burger.png'

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            value: "Kitchen"
        };
        this.change = this.change.bind(this);
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    change(event) {
        this.setState({ value: event.target.value });
    }

    createUser = () => {
        this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(resp => {
                if (resp) {
                    const id = resp.user.uid;
                    database.collection("users").doc(id).set({
                        name: this.state.name,
                        email: this.state.email,
                        value: this.state.value
                    })
                        .then(() => {
                            this.props.history.push(`/${this.state.value}/${id}`);
                        });
                }
            })
    }

    render() {
        if (this.props.error) {
            if (this.props.error === "The email address is already in use by another account.") {
                alert("O email já está cadastrado.");
            } if (this.props.error === "Password should be at least 6 characters") {
                alert("Senha deve ter no mínimo 6 caracteres.")
            }
        }
        return (
            <Fragment>
                <header className="App-header">
                    <div className="d-flex justify-content-center m-3">
                        <img src={burger} alt="Logo" className="Home-logo" />
                        <h1>Burger Queen</h1>
                    </div>
                    <input size="sm" className="mb-3" value={this.state.name}
                        placeholder="Digite seu nome"
                        onChange={(e) => this.handleChange(e, "name")} />
                    <input size="sm" className="mb-3" value={this.state.email}
                        placeholder="Digite seu e-mail"
                        onChange={(e) => this.handleChange(e, "email")} />
                    <input size="sm" className="mb-3" value={this.state.password}
                        placeholder="Digite sua senha" type="password"
                        onChange={(e) => this.handleChange(e, "password")} />
                    <select className="mb-3" as="select" onChange={this.change} value={this.state.value}>
                        <option value="Kitchen">Cozinha</option>
                        <option value="Hall">Salão</option>
                    </select>
                    <Button variant="secondary" size="lg" className="mb-3" onClick={this.createUser}>Criar Usuário</Button>
                </header>
            </Fragment>
        )
    }
}

export default withFirebaseAuth({ firebaseAppAuth })(Register);