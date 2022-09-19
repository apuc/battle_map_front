export const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timezone: 'UTC'
}

export const timeConverter = (UNIX_timestamp) => {
  let date = new Date(UNIX_timestamp * 1000);
  let months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  return day + '.' + month + '.' + year;
}

export const timeConverterUnix = (date) => {

  let changeDateFormat = date[3]+date[4] + '.' +date[0] + date[1] + '.' + date[6] + date[7] +date [8] + date[9]
  console.log(new Date(changeDateFormat).getTime() / 1000)
  console.log(Date.parse(changeDateFormat) / 1000)

  return  Math.floor(Date.parse(changeDateFormat) / 1000);
}