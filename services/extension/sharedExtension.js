const getDayFormat = (date) => {
    return (`0${date.getDate()}`).slice(-2);
  }
  
const getMonthFormat = (date) => {
    return (`0${date.getMonth() + 1}`).slice(-2);
  }

module.exports = {getDayFormat, getMonthFormat};