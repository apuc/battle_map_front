export const newsSelector = (state) => {
  const date = state.date.selectedDate
  //console.log(typeof date)

  // let result = state.news.news.filter(item => item.created_at <= date.toLocaleString("sv-SE").substring(0,10))

  return state.news.news
}
