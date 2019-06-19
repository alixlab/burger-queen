/* eslint-disable no-unused-vars */
import React, { Fragment, Component } from 'react';
import '../style/Hall.css';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { Button, Table } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();
const menu = [
    {
        id: 1,
        name: "café americano",
        price: 5.00,
        option: "bebida",
        type: "café da manhã"
    }, {
        id: 2,
        name: "café com leite",
        price: 7.00,
        option: "bebida",
        type: "café da manhã"
    }, {
        id: 3,
        name: "sanduíche presunto e queijo",
        price: 10.00,
        option: "sanduíche",
        type: "café da manhã"
    }, {
        id: 4,
        name: "suco de fruta natural",
        price: 7.00,
        option: "bebida",
        type: "café da manhã"
    }, {
        id: 5,
        name: "burger simples bovino",
        price: 10.00,
        option: "sanduíche",
        type: "resto do dia"
    }, {
        id: 6,
        name: "burger duplo bovino",
        price: 15.00,
        option: "sanduíche",
        type: "resto do dia"
    }, {
        id: 7,
        name: "burger simples frango",
        price: 10.00,
        option: "sanduíche",
        type: "resto do dia"
    }, {
        id: 8,
        name: "burger duplo frango",
        price: 15.00,
        option: "sanduíche",
        type: "resto do dia"
    }, {
        id: 9,
        name: "burger simples vegetariano",
        price: 10.00,
        option: "sanduíche",
        type: "resto do dia"
    }, {
        id: 10,
        name: "burger duplo vegetariano",
        price: 15.00,
        option: "sanduíche",
        type: "resto do dia"
    }, {
        id: 11,
        name: "queijo",
        price: 1.00,
        option: "adicional",
        type: "resto do dia"
    }, {
        id: 12,
        name: "ovo",
        price: 1.00,
        option: "adicional",
        type: "resto do dia"
    }, {
        id: 13,
        name: "batata frita",
        price: 5.00,
        option: "acompanhamento",
        type: "resto do dia"
    }, {
        id: 14,
        name: "anéis de cebola",
        price: 5.00,
        option: "acompanhamento",
        type: "resto do dia"
    }, {
        id: 15,
        name: "água 500ml",
        price: 5.00,
        option: "bebida",
        type: "resto do dia"
    }, {
        id: 16,
        name: "água 750ml",
        price: 7.00,
        option: "bebida",
        type: "resto do dia"
    }, {
        id: 17,
        name: "bebida gaseificada 500ml",
        price: 7.00,
        option: "bebida",
        type: "resto do dia"
    }, {
        id: 18,
        name: "bebida gaseificada 750ml",
        price: 10.00,
        option: "bebida",
        type: "resto do dia"
    }]

class Hall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waiter: "",
            table: "",
            orderId: "",
            order: []
        };
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    orderClick = (item) => {
        const itemIndex = this.state.order.findIndex((food) => {
            return food.name === item.name;
        });
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            };
            this.setState({
                order: this.state.order.concat(newItem)
            });
        } else {
            let newOrder = this.state.order;
            newOrder[itemIndex].quantity += 1;
            this.setState({
                order: newOrder
            });
        }
    }

    deleteOrder = (item) => {
        const itemIndex = this.state.order.findIndex((food) => {
            return food.name === item.name;
        });

        let deleteItem = this.state.order;
        deleteItem[itemIndex].quantity -= 1;

        const quantity = deleteItem[itemIndex].quantity;
        if (quantity > 0) {
            this.setState({
                order: deleteItem
            });
        } else {
            deleteItem.splice(itemIndex, 1);
            this.setState({
                order: deleteItem
            })
        }
    }

    componentDidMount() {
        const id = (this.props.location.pathname).split("/")[2]
        database.collection("users").doc(id).get()
            .then((response) => {
                const name = response.data().name;
                this.setState({
                    waiter: name,
                });
            });
    }

    createNewOrder = () => {
        const { waiter, table, order, orderId } = this.state;
        const newOrder = {
            waiter,
            table,
            orderId,
            order
        }
        database.collection("orders").add(newOrder)
            .then(() => {
                this.setState({
                    waiter: "",
                    table: "",
                    orderId: "",
                    order: []
                })
                alert("Pedido enviado para cozinha!")
            });
    }

    change(event) {
        this.setState({ value: event.target.value });
    }
    
    render() {
        const bill = this.state.order.reduce((accum, current) => {
            return accum + (current.quantity * current.price)
        }, 0);
        return (
            <Fragment>
                <header className="Hall-header">
                    <h1>Burger Queen Menu</h1>
                    <div className="d-flex">
                        <h2 className="mr-4">Garçom: {this.state.waiter}</h2>
                        <input className="mb-3 input-Hall" value={this.state.table} onChange={(e) => this.handleChange(e, "table")} placeholder="Número da mesa" />
                    </div>
                    <hr />
                    {
                        menu.map((food, index) => {
                            return <button key={index} className="Hall-btn" onClick={() => {
                                this.orderClick(food)
                            }}>{food.name}</button>
                        })
                    }
                    <hr />
                    <h2>Pedidos</h2>
                    {
                        this.state.order.map((food, index) => {
                            return <div key={index}>
                                <ul>
                                    <li>
                                        <Table borderless responsive="sm" size="sm" className="setColumn">
                                            <thead>
                                                <tr>
                                                    <th>{food.id}</th>
                                                    <th>{food.name}</th>
                                                    <th>R${food.price * food.quantity}</th>
                                                    <th>{food.quantity}</th>
                                                </tr>
                                            </thead>
                                        </Table>
                                    </li>
                                    <button onClick={() => this.deleteOrder(food)}>Remover Item</button>
                                </ul>
                            </div>
                        })
                    }
                    <hr />
                    <h2>Total</h2>
                    <p>Valor Total : R$ {bill}</p>
                    <Button variant="secondary" size="lg" className="mb-3" onClick={this.createNewOrder}>Enviar pedido</Button>
                </header>
            </Fragment>
        );
    }
}

export default withFirebaseAuth({ firebaseAppAuth })(Hall);