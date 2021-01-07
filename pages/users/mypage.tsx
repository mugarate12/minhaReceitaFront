import Head from 'next/head'
import Image from 'next/image'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'

import styles from './../../styles/MyPage.module.css'

export default function MyPage() {
  return (
    <Layout>
      <Head>
        <title>Sua página</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Sua página'/>

      <div className={styles.mainContainer}>
        <div className={styles.ApresentationContainer}>
          <p className={styles.p}>olá, sou um teste</p>
        </div>
      </div>

    </Layout>
  );
}