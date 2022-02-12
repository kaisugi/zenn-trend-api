
   
import styles from '../styles/Home.module.css'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <Head>
        <title>Zenn Trend API</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Zenn のトレンド記事の一覧を JSON で返す非公式 API です。" />
      </Head>
      <h1>Zenn Trend API</h1>
      <div>
        <p>Zenn のトレンド記事の一覧を JSON で返す非公式 API です。</p>
        <p><Link href="/api/trendTech">トレンド（Tech）一覧（JSON）</Link><br/>
        <Link href="/api/trendIdea">トレンド（Ideas）一覧（JSON）</Link><br/>
        <Link href="/api/trendBook">トレンド（books）一覧（JSON）</Link><br/>
        <Link href="/trend">トレンド記事一覧（テキスト）</Link></p>
        <p>Zenn 側の仕様変更などにより、予告なくサービスを終了する場合があります。<br/>
        何かありましたら <a href="https://github.com/HelloRusk/zenn-trend-api/issues">Issue</a> にてお願いいたします。</p>
        <p>@ 2022 HelloRusk</p>
      </div>
    </div>
  )
}

export default Home