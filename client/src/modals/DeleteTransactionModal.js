import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import service from '../services/TransactionService'

export default function DeleteTransactionModal(props) {

    const [msgError, setMsgError] = useState("");

    const handlerSubmit = async () => {
        const result = await service.deleteTransaction(props.id);
        if(result.data.success) {
            props.onHide();
            window.location.reload(false);
            return false;
        } else {
            setMsgError("Erro inesperado, contate o administrador");
            console.log(result);
        }
    }

    return (
        <>
            <Modal
               show={props.show}
               onHide={props.onHide}
               size="sm"
               aria-labelledby="contained-modal-title-vcenter"
               centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Deletar Transação
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Tem certeza que deseja deletar a transação <strong>'{props.description}'</strong>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <span style={{color: "red"}}>{msgError}</span>
                    <Button variant="info" onClick={handlerSubmit}>Concluir</Button>
                    <Button variant="danger" onClick={props.onHide}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
