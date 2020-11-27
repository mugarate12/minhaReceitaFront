import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Layout from './../components/Layout'
import Header from './../components/Header'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Minha Receita</title>
      </Head>
      
      <Header isHomePage={true} />

      <div className={styles.container}>
        <h1 className={styles.title}>Seu Lugar</h1>
        <h2 className={styles.subtitle}>pra reiventar e guardar todas as suas ideias na cozinha</h2>
      </div>
    </Layout>
  )
}
