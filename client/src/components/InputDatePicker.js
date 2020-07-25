import React, { useState, useEffect } from 'react'
import {MAX_DATE, MIN_DATE, getDateFormat} from '../data/DateOption.js';
import DatePicker, { registerLocale } from "react-datepicker";
import locale from "date-fns/locale/pt-BR";
import { MaxKey } from 'mongodb';
registerLocale("locale", locale);


export default function InputDatePicker({getCurrentDate, resetDate, setCurrentDate}) {

    const [date, setDate] = useState(new Date());

    const handleCalendarClose = () => console.log("Calendar closed");
    const handleCalendarOpen = () => console.log("Calendar opened");

    const onChangeCurrentDate = (dateCurrent) => {
        const period = getDateFormat(dateCurrent);
        setDate(dateCurrent);
        getCurrentDate(period);
    }

    useEffect(() => {
        if(resetDate) {
            onChangeCurrentDate(new Date());
        }
    }, [resetDate])

    useEffect(() => {
        if(setCurrentDate) {
            onChangeCurrentDate(new Date(setCurrentDate));
        }
    }, [setCurrentDate])

    return (
        <DatePicker
            minDate={MIN_DATE}
            maxDate={MAX_DATE}
            locale="locale"
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={onChangeCurrentDate}
            onCalendarClose={handleCalendarClose}
            onCalendarOpen={handleCalendarOpen}
            required
        />
    )
}
