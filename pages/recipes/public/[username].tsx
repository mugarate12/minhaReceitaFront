import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from './../../../components/Layout'
import Header from './../../../components/Header'
import PageDescription from './../../../components/PageDescription'
import CardRecipe from './../../../components/CardRecipePublic'

import styles from './../../../styles/Recipes.module.css'

import api from './../../../config/api'

interface recipesInterface {
  id: string,
  imgURL: string,
  title: string,
  number_of_portions: string,
  time: string
}

export default function Recipes() {
  const router = useRouter()
  const { username } = router.query

  const [recipes, setRecipes] = useState<Array<recipesInterface>>([])

  async function getRecipesFromUser() {
    if (!!username){
      await api.get(`/users/${username}/recipes?page=1`)
        .then(response => {
          setRecipes(response.data.recipes)
        })
        .catch(error => {
          alert('impossivel encontrar registros, por favor, atualize a página!')
        })
    }

  }

  useEffect(() => {
    getRecipesFromUser()
  }, [username])

  function renderCardRecipes() {
    const urlImg = '/img/teste.jpg'
    const recipeTitle = 'Titulo da receita'
    const numberOfPortions = 'Serve x porções'
    const time = '40min'
    const id = '1'

    return recipes.map((recipe, index) => {
      return (
        <CardRecipe 
          key={recipe.id}
          id={recipe.id}
          urlImg={!!recipe.imgURL ? recipe.imgURL : '/img/teste.jpg'}
          recipeTitle={recipe.title}
          numberOfPortions={recipe.number_of_portions}
          time={recipe.time}
          username={typeof(username) === 'string' ? username : username[0]}
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

      <PageDescription title={`Receitas de ${username}`} />

      <div className={styles.mainContainer} >
        {renderCardRecipes()}
      </div>
    </Layout>
  );
}