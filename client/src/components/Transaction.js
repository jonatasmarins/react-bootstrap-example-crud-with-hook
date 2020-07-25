import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import css from '../css/Transaction.module.css';
import NewTransactionModal from '../modals/NewTransactionModal';
import DeleteTransactionModal from '../modals/DeleteTransactionModal';

export default function Transaction({ transaction, index, refresh }) {
    
    const [modalShow, setModalShow] = useState(false);
    const [deletemodalShow, setDeleteModalShow] = useState(false);

    const onEditTransaction = () => {
        setModalShow(true);
    }

    const onDeleteTransaction = () => {
        setDeleteModalShow(true);
    }

    const onHide = () => {
        setModalShow(false)
        refresh();
    }

    const onDeleteHide = () => {
        setDeleteModalShow(false)
        refresh();
    }

    return (
        <div className={`${transaction.type === "+"  ? css.backgroundColorSuccess : css.backgroundColorError} ${css.margin}`}>
            <Row className={css.row}>
                <Col md={1}>{index}</Col>
                <Col md={7} className={css.textAlignStart}>{transaction.category} - {transaction.description}</Col>
                <Col md={2}>R$ {transaction.value}</Col>
                <Col md={2}>
                    <img value={transaction._id} alt="Editar" src="assets/icons/pencil-square.svg" className={css.img} onClick={onEditTransaction} />
                    <img alt="Remover" src="assets/icons/trash-fill.svg" className={css.img} onClick={onDeleteTransaction}/>
                </Col>
            </Row>

            <NewTransactionModal
                transaction={transaction}
                show={modalShow} 
                onHide={onHide}
                title="Atualizar Transação" 
            />

            <DeleteTransactionModal 
                show={deletemodalShow} 
                onHide={onDeleteHide}
                description={transaction.description}
                id={transaction._id}
            />
        </div>
    )
}
