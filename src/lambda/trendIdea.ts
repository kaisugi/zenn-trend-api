import axios from 'axios'
import cheerio from 'cheerio'

const fetchTrend = (html: string) => {
  const $ = cheerio.load(html)
  const raw = $('script[id=__NEXT_DATA__]').html() ?? ''
  if (raw === undefined) return {}
  const rawData = JSON.parse(raw).props.pageProps.dailyIdeaArticles

  return rawData
}

export const handler = async () => {
  const url = 'https://zenn.dev/'

  return await axios
    .get(url)
    .then(({ data }) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(fetchTrend(data)),
      }
    })
    .catch(err => {
      return {
        statusCode: 500,
        body: err,
      }
    })
}