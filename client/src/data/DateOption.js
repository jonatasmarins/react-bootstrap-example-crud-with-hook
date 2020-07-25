export const MAX_DATE = new Date("2021/12/31");
export const MIN_DATE = new Date("2019/01/01");

export const dateOptions = [
  { first: true, value: '2019-01', label: '01/2019', color: '#00B8D9', selected: false },
  { value: '2019-02', label: '02/2019', color: '#00B8D9', selected: false },
  { value: '2019-03', label: '03/2019', color: '#00B8D9', selected: false },
  { value: '2019-04', label: '04/2019', color: '#00B8D9', selected: false },
  { value: '2019-05', label: '05/2019', color: '#00B8D9', selected: false },
  { value: '2019-06', label: '06/2019', color: '#00B8D9', selected: false },
  { value: '2019-07', label: '07/2019', color: '#00B8D9', selected: false },
  { value: '2019-08', label: '08/2019', color: '#00B8D9', selected: false },
  { value: '2019-09', label: '09/2019', color: '#00B8D9', selected: false },
  { value: '2019-10', label: '10/2019', color: '#00B8D9', selected: false },
  { value: '2019-11', label: '11/2019', color: '#00B8D9', selected: false },
  { value: '2019-12', label: '12/2019', color: '#00B8D9', selected: false },
  { value: '2020-01', label: '01/2020', color: '#00B8D9', selected: false },
  { value: '2020-02', label: '02/2020', color: '#00B8D9', selected: false },
  { value: '2020-03', label: '03/2020', color: '#00B8D9', selected: false },
  { value: '2020-04', label: '04/2020', color: '#00B8D9', selected: false },
  { value: '2020-05', label: '05/2020', color: '#00B8D9', selected: false },
  { value: '2020-06', label: '06/2020', color: '#00B8D9', selected: false },
  { value: '2020-07', label: '07/2020', color: '#00B8D9', selected: false },
  { value: '2020-08', label: '08/2020', color: '#00B8D9', selected: false },
  { value: '2020-09', label: '09/2020', color: '#00B8D9', selected: false },
  { value: '2020-10', label: '10/2020', color: '#00B8D9', selected: false },
  { value: '2020-11', label: '11/2020', color: '#00B8D9', selected: false },
  { value: '2020-12', label: '12/2020', color: '#00B8D9', selected: false },
  { value: '2021-01', label: '01/2021', color: '#00B8D9', selected: false },
  { value: '2021-02', label: '02/2021', color: '#00B8D9', selected: false },
  { value: '2021-03', label: '03/2021', color: '#00B8D9', selected: false },
  { value: '2021-04', label: '04/2021', color: '#00B8D9', selected: false },
  { value: '2021-05', label: '05/2021', color: '#00B8D9', selected: false },
  { value: '2021-06', label: '06/2021', color: '#00B8D9', selected: false },
  { value: '2021-07', label: '07/2021', color: '#00B8D9', selected: false },
  { value: '2021-08', label: '08/2021', color: '#00B8D9', selected: false },
  { value: '2021-09', label: '09/2021', color: '#00B8D9', selected: false },
  { value: '2021-10', label: '10/2021', color: '#00B8D9', selected: false },
  { value: '2021-11', label: '11/2021', color: '#00B8D9', selected: false },
  { last: true, value: '2021-12', label: '12/2021', color: '#00B8D9', selected: false }
];

export const getDefaultValue = () => {
  const monthCurrent = (`0${new Date().getMonth() + 1}`).slice(-2);
  const yearCurrent = new Date().getFullYear();
  const period = `${yearCurrent}-${monthCurrent}`;

  const optionSelected = dateOptions.find(x => x.value === period);
  setOptionSelected(period);
  return optionSelected;
};

export const getDateFormat = (date = new Date()) => {
  const daycurrent = (`0${date.getDate()}`).slice(-2);
  const monthCurrent = (`0${date.getMonth() + 1}`).slice(-2);
  const yearCurrent = date.getFullYear();
  const period = `${daycurrent}/${monthCurrent}/${yearCurrent}`;
  
  return period;
};

export const setOptionSelected = (period) => {

  dateOptions.forEach(element => {
    element.selected = false;
  });

  const index = dateOptions.findIndex(x => x.value === period);

  if (index) {
    dateOptions[index].selected = true;
  }
}

export const emptyValue = {
  value: "",
  label: "",
  color: '#00B8D9'
};