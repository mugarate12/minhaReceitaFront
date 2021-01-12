import Head from 'next/head'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'

import styles from './../../styles/UpdateRecipe.module.css'

export default function UpdateRecipe() {
  return (
    <Layout>
      <Head>
        <title>Editar Receita</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Editar Receita' />

      <div className={styles.mainContainer}>
      
      </div>
    </Layout>
  );
}