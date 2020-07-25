import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import InputDatePicker from '../components/InputDatePicker'
import { getDateFormat } from '../data/DateOption.js';
import service from '../services/TransactionService';
import moment from 'moment';

export default function NewTransactionModal(props) {
    const initialTrasanction = { _id: "", type: "", period: "", category: "", description: "", value: "" };

    const [transactionState, setTransactionState] = useState(initialTrasanction);

    const [resetPeriod, setResetPeriod] = useState(false);
    const [setCurrentDate, onSetCurrentDate] = useState("");

    const [validated, setValidated] = useState(false);
    const [success, setSuccess] = useState(false);

    const [messageValidatorValue, setMessageValidatorValue] = useState("Insira o valor");
    const [messageSubmit, setMessageSubmit] = useState("");

    useEffect(() => {
        if (props.show) {
            if (props?.transaction?._id) {
                mountModelUpdate();
            } else {
                mountModelNew();
            }
        }
    }, [props.show])

    const mountModelUpdate = () => {
        const transaction = copyTransaction();
        const periodDateFomated = props.transaction.yearMonthDay.replace("-", "/");
        const period = getDateFormat(new Date(moment(periodDateFomated, "YYYY/MM/DD")));
        onSetCurrentDate(periodDateFomated);

        document.querySelector(`input[value='${props.transaction.type}']`).checked = true;

        transaction._id = props.transaction._id;
        transaction.type = props.transaction.type;
        transaction.category = props.transaction.category;
        transaction.description = props.transaction.description;
        transaction.value = props.transaction.value;
        transaction.period = period;

        setTransactionState(transaction);
    }

    const mountModelNew = () => {
        const transaction = copyTransaction();
        transaction.period = getDateFormat(new Date());

        setTransactionState(transaction);
    }

    const handleSubmit = async (event) => {

        setValidated(true);

        const form = document.querySelector("#formTransaction");
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {

            if (props?.transaction?._id) {
                await updateTransaction();
            } else {
                await createTransaction();
            }
        }
    };

    const createTransaction = async () => {
        const axios = await service.createTransaction(transactionState);
        resultResponseTransaction(axios, "Cadastro com sucesso !");
    }

    const updateTransaction = async () => {
        const axios = await service.updateTransaction(transactionState);
        resultResponseTransaction(axios, "Atualizado com sucesso !");
    }

    const resultResponseTransaction = (axios, message) => {

        const transaction = Object.assign(initialTrasanction);

        setSuccess(axios.data.success);

        if (axios.data.success) {
            transaction.period = getDateFormat(new Date());

            setTransactionState(transaction);
            setMessageSubmit(message);

            document.querySelector("#fieldValue").value = "";
            document.querySelector("#inline-radio-1").checked = false;
            document.querySelector("#inline-radio-2").checked = false;

            setResetPeriod(true);
            setResetPeriod(false);

            setValidated(false);

            setTimeout(() => {
                setMessageSubmit("");
            }, 3000);
        } else {
            setMessageSubmit("Erro inesperado, contate o administrador");
            setTimeout(() => {
                setMessageSubmit("");
            }, 3000);

            console.log(axios.data.messages);
        }
    }

    const validatorValue = (event) => {
        const value = event.target.value;

        if (!value) {
            setMessageValidatorValue("Insira o valor");
        } else if (value < 0.01) {
            setMessageValidatorValue("Valor não pode ser zero ou negativo");
        } else {
            setMessageValidatorValue("");
        }
    }

    const getCurrentDate = (date) => {
        const transaction = copyTransaction();
        transaction.period = date;
        setTransactionState(transaction);
    }

    const onChangeValue = (event) => {
        const transaction = copyTransaction();
        transaction[event.target.name] = event.target.value;
        setTransactionState(transaction);
    }

    const copyTransaction = () => {
        const transaction = Object.assign({}, transactionState);
        return transaction;
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form id="formTransaction" noValidate validated={validated}>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Tipo</Form.Label>
                                        <div>
                                            <Form.Check value="+" onChange={onChangeValue} inline name="type" label="Receita" type="radio" id={`inline-radio-1`} required />
                                            <Form.Check value="-" onChange={onChangeValue} inline name="type" label="Despesa" type="radio" id={`inline-radio-2`} required />
                                            <Form.Control.Feedback type="invalid">Insira o Tipo</Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="periodValidation">
                                        <Form.Label>Lançamento</Form.Label><br />
                                        <InputDatePicker getCurrentDate={getCurrentDate} resetDate={resetPeriod} setCurrentDate={setCurrentDate} required />
                                        <Form.Control.Feedback type="invalid">Insira o Período</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="categoryValidation">
                                        <Form.Label>Categoria</Form.Label>
                                        <Form.Control name="category" value={transactionState.category} onChange={onChangeValue} type="text" placeholder="Gasto de Consumo" required />
                                        <Form.Control.Feedback type="invalid">Insira a Categoria</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="descriptionValidation">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control name="description" value={transactionState.description} onChange={onChangeValue} type="text" placeholder="Conta de Luz" required />
                                        <Form.Control.Feedback type="invalid">Insira a Descrição</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="valueValidation">
                                        <Form.Label>Valor</Form.Label>
                                        <Form.Control id="fieldValue" name="value" value={transactionState.value} onChange={onChangeValue} onInput={validatorValue} step="0.01" min="0.01" type="number" placeholder="Exemplo: 1.100,00" required />
                                        <Form.Control.Feedback type="invalid">{messageValidatorValue}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <span style={success ? { color: "green" } : { color: "red" }}>{messageSubmit}</span>
                    <Button variant="info" onClick={handleSubmit}>Enviar</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
