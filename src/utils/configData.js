export const timeConverter = (UNIX_timestamp, withTime=false) => {
  let date = new Date(UNIX_timestamp * 1000);
  let months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  let hour = date.getHours()>= 10 ? date.getHours() : "0" + date.getHours();
  let minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  return withTime ? hour + ':' + minute + ' ' + day + '.' + month + '.' + year : day + '.' + month + '.' + year;
}

export const timeConverterUnix = (date) => {
  let changeDateFormat = date[3]+date[4] + '.' +date[0] + date[1] + '.' + date[6] + date[7] +date [8] + date[9]
  return  Math.floor(Date.parse(changeDateFormat) / 1000);
}

export function formatDate(date) {

  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear();
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

String.prototype.toDate = function(format, delimiter) {
  let date = this;
  let formatedDate = null;
  let formatLowerCase = format.toLowerCase();
  let formatItems = formatLowerCase.split(delimiter);
  let dateItems = date.split(delimiter);
  let monthIndex = formatItems.indexOf("mm");
  let monthNameIndex = formatItems.indexOf("mmm");
  let dayIndex = formatItems.indexOf("dd");
  let yearIndex = formatItems.indexOf("yyyy");
  let d = dateItems[dayIndex];
  if (d < 10) {
    d = "0"+ d;
  }
  if (monthIndex > -1) {
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    if (month < 10) {
      month = "0" + month;
    }
    formatedDate = new Date(dateItems[yearIndex], month, d);
  } else if (monthNameIndex > -1) {
    var monthName = dateItems[monthNameIndex];
    month = getMonthIndex(monthName);
    if (month < 10) {
      month = "0" + month;
    }
    formatedDate = new Date(dateItems[yearIndex], month, d);
  }
  return formatedDate;
};

function getMonthIndex(name) {
  name = name.toLowerCase();
  if (name === "jan" || name === "january") {
    return 0;
  } else if (name === "feb" || name === "february") {
    return 1;
  } else if (name === "mar" || name === "march") {
    return 2;
  } else if (name === "apr" || name === "april") {
    return 3;
  } else if (name === "may" || name === "may") {
    return 4;
  } else if (name === "jun" || name === "june") {
    return 5;
  } else if (name === "jul" || name === "july") {
    return 6;
  } else if (name === "aug" || name === "august") {
    return 7;
  } else if (name === "sep" || name === "september") {
    return 8;
  } else if (name === "oct" || name === "october") {
    return 9;
  } else if (name === "nov" || name === "november") {
    return 10;
  } else if (name === "dec" || name === "december") {
    return 11;
  }
}

export const expandTextEvent = (id) => {
  let card_text = document.querySelector('#list-'+id +' .events-list__text');
  let button_text = document.querySelector('#list-'+id +' .events-list__button-further');
  let card_event = document.querySelector('#list-' +id);
  if(card_event){
    card_text.hidden = false;
    button_text.innerHTML = 'Скрыть';
    card_event.scrollIntoView({block: "start", behavior: "smooth"})
  }
}
