import Head from 'next/head'
import { useState, useEffect } from 'react'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import CardRecipe from './../../components/CardRecipe'

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

  async function getRecipesFromUser() {
    const token = sessionStorage.getItem('token')

    await api.get('/recipes?page=1', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        setRecipes(response.data.recipes)
      })
      .catch(error => {
        alert('impossivel encontrar registros, por favor, atualize a página!')
      })
  }

  // useEffect(() => {
  //   getRecipesFromUser()
  // }, [])


  function renderCardRecipes() {
    const urlImg = '/img/teste.jpg'
    const recipeTitle = 'Titulo da receita'
    const numberOfPortions = 'Serve x porções'
    const time = '40min'
    const id = '1'

    // return recipes.map((recipe, index) => {
    //   return (
    //     <CardRecipe 
    //       key={recipe.id}
    //       id={recipe.id}
    //       urlImg={!!recipe.imgURL ? recipe.imgURL : '/img/teste.jpg'}
    //       recipeTitle={recipe.title}
    //       numberOfPortions={recipe.number_of_portions}
    //       time={recipe.time}
    //     />
    //   )
    // })

    const temporaryArray = [1, 2, 3, 4, 5, 6]
    return temporaryArray.map((value, index) => {
      return (
        <CardRecipe
          key={index}
          id={id}
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
        <title>Suas Receitas</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Suas receitas' />

      <div className={styles.mainContainer} >
        {renderCardRecipes()}
      </div>
    </Layout>
  );
}