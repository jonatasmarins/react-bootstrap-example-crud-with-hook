import React from 'react'
import css from '../css/Header.module.css';

export default function Header({title, subTitle}) {
    return (
        <div className={css.centralizar}>
            <h1>{title}</h1>
            <h5>{subTitle}</h5>
        </div>
    )
}
