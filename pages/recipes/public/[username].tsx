import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  Layout,
  PageDescription,
  CardRecipePublic as CardRecipe,
  Pagination
} from './../../../components'

import {
  Header
} from './../../../containers'

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
  const [totalOfPages, setTotalOfPages] = useState<number>(1)
  const [actualPage, setActualPage] = useState<number>(1)

  async function getRecipesFromUser() {
    if (!!username){
      await api.get(`/users/${username}/recipes?page=1`)
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
  }

  useEffect(() => {
    getRecipesFromUser()
  }, [username])

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

      <Header renderMenu={false} />

      <PageDescription title={`Receitas de ${username}`} />

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