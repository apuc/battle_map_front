export const mapCenterUkraine = [49.0384, 31.4513]
export const mapCenterDonbass = [48.08, 37.44]

export const currentDate = new Date()
export const menuHeaderList = [
  { id: 1, title: 'Украина' },
  { id: 2, title: 'Донбасс' },
]
export const geojsonData = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [125.6, 10.1]
  },
  properties: {
    name: 'Dinagat Islands'
  }
}
export const optionsDate = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timezone: 'UTC'
}

export function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear();
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

String.prototype.toDate = function(format, delimiter) {
  var date = this;
  var formatedDate = null;
  var formatLowerCase = format.toLowerCase();
  var formatItems = formatLowerCase.split(delimiter);
  var dateItems = date.split(delimiter);
  var monthIndex = formatItems.indexOf("mm");
  var monthNameIndex = formatItems.indexOf("mmm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var d = dateItems[dayIndex];
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
  if (name == "jan" || name == "january") {
    return 0;
  } else if (name == "feb" || name == "february") {
    return 1;
  } else if (name == "mar" || name == "march") {
    return 2;
  } else if (name == "apr" || name == "april") {
    return 3;
  } else if (name == "may" || name == "may") {
    return 4;
  } else if (name == "jun" || name == "june") {
    return 5;
  } else if (name == "jul" || name == "july") {
    return 6;
  } else if (name == "aug" || name == "august") {
    return 7;
  } else if (name == "sep" || name == "september") {
    return 8;
  } else if (name == "oct" || name == "october") {
    return 9;
  } else if (name == "nov" || name == "november") {
    return 10;
  } else if (name == "dec" || name == "december") {
    return 11;
  }
}
