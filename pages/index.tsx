import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Header from './../components/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>Minha Receita</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isHomePage={true} />
    </>
  )
}
