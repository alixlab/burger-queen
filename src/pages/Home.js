/* eslint-disable no-unused-vars */
import React, { Fragment, Component } from 'react';
import { Button } from 'react-bootstrap';
import '../style/Home.css';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Link } from 'react-router-dom';
import burger from '../img/burger.png'

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            value: ""
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

    signIn = () => {
        this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((resp) => {
                const id = resp.user.uid;
                database.collection("users").doc(id).get()
                    .then(resp => {
                        const data = resp.data();
                        this.props.history.push(`/${data.value}/${id}`)
                    })
            })
    }

    render() {
        return (
            <Fragment>
                <header className="App-header">
                    <div className="d-flex justify-content-center m-3">
                        <img src={burger} alt="Logo" className="Home-logo" />
                        <h1>Burger Queen</h1>
                    </div>
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
                    <Button variant="secondary" size="lg" className="mb-3" onClick={this.signIn}>Entrar</Button>
                    <Link to="/Register">Cadastre um novo usuário!</Link>
                </header>
            </Fragment>
        )
    }
}

export default withFirebaseAuth({ firebaseAppAuth })(Home);