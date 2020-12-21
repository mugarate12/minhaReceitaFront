import Head from 'next/head'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import CardRecipe from './../../components/CardRecipe'

import styles from './../../styles/Recipes.module.css'

export default function Recipes() {
  function renderCardRecipes() {
    const urlImg = '/img/teste.jpg'
    const recipeTitle = 'Titulo da receita'
    const numberOfPortions = 'Serve x porções'
    const time = '40min'

    const temporaryArray = [1, 2, 3, 4, 5, 6]
    return temporaryArray.map((value, index) => {
      return (
        <CardRecipe
          key={index}
          urlImg={urlImg}
          recipeTitle={recipeTitle}
          numberOfPortions={numberOfPortions}
          time={time}
        />
      )
    })
  }

  return (
    <Layout>
      <Head>
        <title>Receitas</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Suas receitas' />

      <div className={styles.mainContainer} >
        {renderCardRecipes()}
      </div>
    </Layout>
  );
}