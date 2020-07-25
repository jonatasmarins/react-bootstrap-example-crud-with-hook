import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function DashBoard({properties}) {
    const {quantidade, receitas, despesas, total} = properties;

    return (
        <div style={style.principal}>
            <Row>
                <Col>Lançamento: {quantidade}</Col>
                <Col>Receitas: <span style={style.textColorSuccess}>R$ {receitas}</span></Col>
                <Col>Despesas: <span style={style.textColorError}>R$ {despesas}</span></Col>
                <Col>Saldo: R$ <span style={total >= 0 ? style.textColorSuccess : style.textColorError}>{total}</span></Col>
            </Row>
        </div>
    )
}

const style = {
    principal: {
        padding: "15px",
        border: "1px solid #ced4da",
        margin: "15px 0px 15px 0px",
    },
    textColorSuccess: {
        color: "green"
    },
    textColorError: {
        color: "red"
    }
}
