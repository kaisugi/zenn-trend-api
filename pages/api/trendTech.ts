// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import cheerio from 'cheerio'

const fetchTrend = (html: string) => {
  const $ = cheerio.load(html)
  const raw = $('script[id=__NEXT_DATA__]').html() ?? ''
  if (raw === undefined) return {}
  const rawData = JSON.parse(raw).props.pageProps.dailyTechArticles

  return rawData
}

type Data = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = 'https://zenn.dev/'

  res.setHeader('Access-Control-Allow-Origin', '*')

  await axios
    .get(url)
    .then(({ data }) => {
      res.status(200).json(fetchTrend(data))
    })
}