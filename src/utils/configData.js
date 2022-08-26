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
  let day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
  return day + '.' + month + '.' + year;
}

export const timeConverterUnix = (data) => {
  const date = new Date(data);

  return  Math.floor(date.getTime() / 1000);
}