import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import RoomServiceIcon from '@material-ui/icons/RoomService'
import TimerIcon from '@material-ui/icons/Timer'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'

import styles from './../../styles/Recipe.module.css'

import api from './../../config/api'

interface ingredientsInterface {
  name: string,
  measure: string
}

export default function Recipe() {
  const router = useRouter()
  const { id } = router.query

  const [recipeImgURL, setRecipeImgURL] = useState<string>('/img/teste.jpg')
  const [title, setTitle] = useState<string>('')
  const [number_of_portions, setNumberOfPortions] = useState<number>(0)
  const [time, setTime] = useState<string>('')

  const [preparation_mode, setPreparationMode] = useState<string>('')
  const [observations, setObservations] = useState<string>('')

  const [ingredients, setIngredients] = useState<Array<ingredientsInterface>>([])

  async function getRecipesByID() {
    const token = sessionStorage.getItem('token')

    await api.get(`/recipes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!!response.data.recipe.imgURL) setRecipeImgURL(response.data.recipe.imgURL)
        
        setTitle(response.data.recipe.title)
        setTime(response.data.recipe.time)
        setNumberOfPortions(response.data.recipe.number_of_portions)
        setObservations(response.data.recipe.observations)
        setPreparationMode(response.data.recipe.preparation_mode)
        
        setIngredients(response.data.recipe.ingredients)
      })
      .catch(error => {
        alert('ocorreu um erro ao tentar consultar informações, por favor, tente novamente')
        router.push('/recipes/recipes')
      })
  }

  function renderIngredients() {
    return ingredients.map((ingredient, index) => {
      return <li key={index} className={styles.recipeLi}>{ingredient.measure} de {ingredient.name}</li>
    })
  }

  useEffect(() => {
    getRecipesByID()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Receita</title>
      </Head>

      <Header isHomePage={false} renderMenu={true} />

      <PageDescription title='Receita'/>

      <div className={styles.mainContainer}>
        <div className={styles.recipeMainInformationContainer}>
          <div className={styles.imgContainer}>
            <Image 
              src={recipeImgURL}
              width={200}
              height={200}
              className={styles.img}
            />
          </div>

          <div>
            <h5 className={styles.title}>{title}</h5>

            <div className={styles.recipeInformation} >
              <div className={styles.recipeInformationMicroCard}>
                <div className={styles.iconContainer} >
                  <TimerIcon fontSize='large' color='disabled'/>
                </div>

                <p className={styles.recipeInformationText}>{time} min</p>
              </div>

              <div className={styles.recipeInformationMicroCard}>
                <div className={styles.iconContainer} >
                  <RoomServiceIcon fontSize='large' color='disabled'/>
                </div>

                <p className={styles.recipeInformationText}>serve {number_of_portions} porções</p>
              </div>
            </div>
          </div>

          <div className={styles.ingredientsContainer}>
            <h5 className={styles.title}>Ingredientes</h5>

            <ul className={styles.recipeUl}>
              {renderIngredients()}
            </ul>
          </div>
        </div>


        <h5 className={styles.title}>Modo de preparo</h5>
        <p className={styles.textContent}>{preparation_mode}</p>
        {/* <p className={styles.textContent}>Lorem ipsum diam et condimentum habitasse mauris venenatis porttitor malesuada quam, arcu vehicula est bibendum nunc aliquam sagittis tristique per ut aenean, sit posuere gravida litora nisl sodales blandit morbi consectetur. fermentum aenean urna pharetra lacinia in vehicula eu suspendisse euismod et, dui velit fermentum taciti eget nulla hac ut et ut, eleifend egestas molestie aptent suspendisse sociosqu erat augue non. libero ornare dolor felis consequat sagittis donec ac etiam pulvinar augue, risus accumsan lobortis suscipit cursus aptent tristique habitant tortor, aliquam nullam congue in fringilla tempor hac metus laoreet</p> */}
        
        <h5 className={styles.title}>Observações</h5>
        <p className={styles.textContent}>{observations}</p>
        {/* <p className={styles.textContent}>Lorem ipsum diam et condimentum habitasse mauris venenatis porttitor malesuada quam, arcu vehicula est bibendum nunc aliquam sagittis tristique per ut aenean, sit posuere gravida litora nisl sodales blandit morbi consectetur. fermentum aenean urna pharetra lacinia in vehicula eu suspendisse euismod et, dui velit fermentum taciti eget nulla hac ut et ut, eleifend egestas molestie aptent suspendisse sociosqu erat augue non. libero ornare dolor felis consequat sagittis donec ac etiam pulvinar augue, risus accumsan lobortis suscipit cursus aptent tristique habitant tortor, aliquam nullam congue in fringilla tempor hac metus laoreet</p> */}
      </div>
    </Layout>
  )
}