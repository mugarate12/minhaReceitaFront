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

      <div className={styles.container}>
        <h1 className={styles.title}>Seu Lugar</h1>
        <h2 className={styles.subtitle}>pra reiventar e guardar todas as suas ideias na cozinha</h2>
      </div>
    </>
  )
}
