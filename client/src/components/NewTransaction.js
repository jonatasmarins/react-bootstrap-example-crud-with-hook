import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import NewTransactionModal from '../modals/NewTransactionModal';

export default function NewTransaction({refresh}) {
    const [modalShow, setModalShow] = useState(false);

    const onHideAndRefresh = () => {
        setModalShow(false)
        refresh();
    }

    return (
        <div>
            <Button variant="info" onClick={() => {setModalShow(true)}}>
                <img
                    alt=""
                    src="assets/icons/plus.svg"
                    width="20"
                    height="20"
                    title="Voltar"
                ></img> Novo Lançamento
            </Button>

            <NewTransactionModal 
                show={modalShow} 
                onHide={onHideAndRefresh}
                title="Nova Transação"
            />
        </div>
    )
}
