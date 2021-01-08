import Head from 'next/head'
import Image from 'next/image'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'

import ReceiptIcon from '@material-ui/icons/Receipt'
import FastfoodIcon from '@material-ui/icons/Fastfood'

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
          <div className={styles.ApresentationImgContainer}>
            <Image
              src='/img/teste.jpg'
              width={200}
              height={200}
              className={styles.img}
            />
          </div>

          <div className={styles.TextApresentationContainer}>
            <h5 className={styles.TextApresentationTextTitle}>Fulano de tal receitas</h5>
            <p className={styles.TextApresentationTextContent}>@username</p>
          </div>
        </div>

        <h5 className={styles.informationTextTitle}>Bio:</h5>
        <p className={styles.informationTextContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum porttitor diam et blandit. Suspendisse potenti. Aenean in fringilla metus, non dignissim lacus. Sed pretium odio ipsum, quis pulvinar mi blandit vitae. Aliquam erat volutpat. In non lacinia leo. Mauris rutrum, turpis non pharetra mattis, ligula nulla iaculis est, in condimentum erat metus hendrerit mauris.</p>
      

        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.cardIconContainer}>
              <ReceiptIcon fontSize='large' color='action'/>
            </div>

            <p className={styles.cardText}>X receitas</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIconContainer}>
              <FastfoodIcon fontSize='large' color='action'/>
            </div>

            <p className={styles.cardText}>Ver receitas</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}