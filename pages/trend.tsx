import styles from '../styles/Home.module.css'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'

const Trend: NextPage = () => {
  const [techData, setTechData] = useState<JSX.Element[] | undefined>(undefined)
  const [ideaData, setIdeaData] = useState<JSX.Element[] | undefined>(undefined)
  const [bookData, setBookData] = useState<JSX.Element[] | undefined>(undefined)

  useEffect(() => {
    const f = async () => {
      let res = await axios(
        "/api/trendTech"
      )
      setTechData(res.data)

      res = await axios(
        "/api/trendIdea"
      )
      setIdeaData(res.data)

      res = await axios(
        "/api/trendBook"
      )
      setBookData(res.data)
    }
    f()
  }, [])

  const renderTrends = (data: any) => {
    if (data === undefined) {
      return (
        <p>Loading...</p>
      )
    }

    const arr: JSX.Element[] = []

    for (const trend of data){
      const link = trend.articleType ?
        `https://zenn.dev/${trend.user.username}/articles/${trend.slug}` :
        `https://zenn.dev/${trend.user.username}/books/${trend.slug}`
      const title = trend.title

      arr.push(<p><a target="_blank" className={styles.a} href={link} rel="noreferrer">{title}</a></p>)
    }

    return arr
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Zenn Trend API</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Zenn のトレンド記事の一覧を JSON で返す非公式 API です。" />
      </Head>
      <h1 className={styles.h1}>Zenn Trend API</h1>
      <h3>Tech</h3>
      <div>
        {renderTrends(techData)}
      </div>
      <h3>Ideas</h3>
      <div>
        {renderTrends(ideaData)}
      </div>
      <h3>Books</h3>
      <div>
        {renderTrends(bookData)}
      </div>
      <br />
    </div>
  )
}

export default Trend