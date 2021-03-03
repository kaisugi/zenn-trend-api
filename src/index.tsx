import React, { useState, useEffect } from "react"
import ReactDom from "react-dom"
import { BrowserRouter, Route, Link } from 'react-router-dom'
import axios from "axios"

import * as styles from "./style.css"

const Main = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Zenn Trend API</h1>
      <div>
        <p>Zenn のトレンド記事の一覧を JSON で返す非公式 API です。</p>
        <p><a href="/.netlify/functions/trendTech" className={styles.a}>トレンド（Tech）一覧（JSON）</a><br/>
        <a href="/.netlify/functions/trendIdea" className={styles.a}>トレンド（Ideas）一覧（JSON）</a><br/>
        <a href="/.netlify/functions/trendBook" className={styles.a}>トレンド（books）一覧（JSON）</a><br/>
        <Link to="/trend" className={styles.a}>トレンド一覧（テキスト）</Link></p>
        <p>Zenn 側の仕様変更などにより、予告なくサービスを終了する場合があります。<br/>
        何かありましたら <a href="https://github.com/HelloRusk/zenn-trend-api/issues" className={styles.a}>Issue</a> にてお願いいたします。</p>
        <p>@ 2021 HelloRusk</p>
      </div>
    </div>
  )
}

const Trend = () => {
  const [techData, setTechData] = useState<JSX.Element[] | undefined>(undefined)
  const [ideaData, setIdeaData] = useState<JSX.Element[] | undefined>(undefined)
  const [bookData, setBookData] = useState<JSX.Element[] | undefined>(undefined)

  useEffect(() => {
    const f = async () => {
      let res = await axios(
        "/.netlify/functions/trendTech"
      )
      setTechData(res.data)

      res = await axios(
        "/.netlify/functions/trendIdea"
      )
      setIdeaData(res.data)

      res = await axios(
        "/.netlify/functions/trendBook"
      )
      setBookData(res.data)
    }
    f()
  })

  const renderTrends = (data) => {
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

      arr.push(<p><a target="_blank" className={styles.a} href={link}>{title}</a></p>)
    }

    return arr
  }

  return (
    <div className={styles.main}>
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

const Root = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Main} />
      <Route path="/trend" component={Trend} />
    </div>
  </BrowserRouter>
)

ReactDom.render(
  <Root />,
  document.getElementById('root')
)
