import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

export default function Filter({ onChangerFilter, period }) {

    useEffect(() => {
        let input = document.querySelector("#txtSearch");

        input.addEventListener('keyup', function(event) {
            clearTimeout(timeout);

            const timeout = setTimeout(function () {
                onChangerFilter(input.value);
            }, 1000);
        });

        return () => {
            input.removeEventListener('keyup');
        }
    }, []) 

    useEffect(() => {
        let input = document.querySelector("#txtSearch");
        input.value = "";
    }, [period])

    return (
        <div style={style.formMargin}>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        id="txtSearch"
                        type="text"
                        placeholder="Exemplo: Conta de Luz"
                    />
                </Form.Group>
            </Form>
        </div>
    )
}

const style = {
    formMargin: {
        margin: "15px 0px 15px 0px"
    }
}
