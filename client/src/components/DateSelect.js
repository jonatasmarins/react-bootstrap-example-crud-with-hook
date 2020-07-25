import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { dateOptions, getDefaultValue, emptyValue, setOptionSelected } from '../data/DateOption.js';
import AsyncSelect from 'react-select/async';
import css from '../css/DateSelect.module.css';

export default function DateSelect({onChangeDateSelect}) {
    const isClearable = true;
    const isSearchable = true;

    const [inputSelected, setInputSelected] = useState({});

    useEffect(() => {
        const defaultValue = getDefaultValue();
        setInputSelected(defaultValue);
    }, [])

    const handleChange = async (newvalue) => {
        if (newvalue) {
            const filter = dateOptions.find(x => x.value === newvalue.value);

            if (filter) {
                await setOption(filter, newvalue);
            } else {
                await setOptionDefault();
            }
        } else {
            await setOptionDefault();
        }        
    }

    const setOptionDefault = async () => {
        setInputSelected(emptyValue);
        setOptionSelected(emptyValue.value);
        await onChangeDateSelect(emptyValue.value);
    }

    const setOption = async(filter) => {
        setInputSelected(filter);
        setOptionSelected(filter.value);
        await onChangeDateSelect(filter.value);
    }

    const handleInputChange = (newValue) => newValue;

    const filterDate = (inputValue) => {
        return dateOptions.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterDate(inputValue));
        }, 500);
    };

    const onClickButtonLeft = () => {
        previousAndNext(true);
    }

    const onClickButtonRight = () => {        
        previousAndNext(false);
    }

    const previousAndNext = (isPrevious) => {
        let optionSelect = {};

        if (inputSelected !== emptyValue) {
            const indexOptionSelected = dateOptions.findIndex(x => x.value === inputSelected.value);
            optionSelect = isPrevious ? dateOptions[indexOptionSelected - 1] : dateOptions[indexOptionSelected + 1];
            setInputSelected(optionSelect);
        } else {
            optionSelect = isPrevious ? dateOptions[0] : dateOptions[dateOptions.length - 1];
            setInputSelected(optionSelect);
        }

        setOption(optionSelect);
        onChangeDateSelect(optionSelect.value);
    }

    return (
        <div className={`center-block ${css.principal}`}>
            <div>
                <Button variant="info" className={css.button} onClick={onClickButtonLeft} disabled={inputSelected?.first}>
                    <img
                        alt=""
                        src="assets/icons/arrow-left.svg"
                        width="20"
                        height="20"
                        title="Voltar"
                    ></img>
                </Button>
            </div>

            <div className={css.selectSize}>
                <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    value={inputSelected}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                />
            </div>

            <div>
                <Button variant="info" className={css.button} onClick={onClickButtonRight} disabled={inputSelected?.last}>
                    <img
                        id="arrowright"
                        alt=""
                        src="assets/icons/arrow-right.svg"
                        width="20"
                        height="20"
                        title="Avançar"
                    ></img>
                </Button>
            </div>
        </div>
    )
}
