import Head from 'next/head'
import { useState, useEffect } from 'react'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import CardRecipe from './../../components/CardRecipe'
import Pagination from './../../components/Pagination'

import styles from './../../styles/Recipes.module.css'

import api from './../../config/api'

interface recipesInterface {
  id: string,
  imgURL: string,
  title: string,
  number_of_portions: string,
  time: string
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Array<recipesInterface>>([])
  const [totalOfPages, setTotalOfPages] = useState<number>(1)
  const [actualPage, setActualPage] = useState<number>(1)

  async function getRecipesFromUser() {
    const token = sessionStorage.getItem('token')

    await api.get(`/recipes?page=${actualPage}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const numberOfRecipesPerPage = 10
        const numbersOfPages = Number(String(response.data.totalOfRecipes / numberOfRecipesPerPage)[0])
        const haveMoreThanOnePageOrUniquePage = numbersOfPages >= 1

        setRecipes(response.data.recipes)
        setTotalOfPages(haveMoreThanOnePageOrUniquePage ? numbersOfPages : 1)
      })
      .catch(error => {
        alert('impossivel encontrar registros, por favor, atualize a página!')
      })
  }

  useEffect(() => {
    getRecipesFromUser()
  }, [])


  function renderCardRecipes() {
    return recipes.map((recipe, index) => {
      return (
        <CardRecipe 
          key={recipe.id}
          id={recipe.id}
          urlImg={!!recipe.imgURL ? recipe.imgURL : '/img/teste.jpg'}
          recipeTitle={recipe.title}
          numberOfPortions={recipe.number_of_portions}
          time={recipe.time}
        />
      )
    })
  }

  return (
    <Layout>
      <Head>
        <title>Suas Receitas</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Suas receitas' />

      <div className={styles.mainContainer} >
        {renderCardRecipes()}
      </div>

      <Pagination
        numberOfPages={totalOfPages}
        actualPage={actualPage}
        setActualPage={setActualPage}
      />
    </Layout>
  );
}