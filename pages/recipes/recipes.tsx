import Head from 'next/head'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import CardRecipe from './../../components/CardRecipe'

import styles from './../../styles/Recipes.module.css'

export default function Recipes() {
  return (
    <Layout>
      <Head>
        <title>Receitas</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Suas receitas' />

      <div className={styles.mainContainer} >
        <CardRecipe />
      </div>
    </Layout>
  );
}