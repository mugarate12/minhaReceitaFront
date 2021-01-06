import { useState } from 'react'
import Head from 'next/head'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import FormData from 'form-data'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import Input from './../../components/Input'
import Button from './../../components/Button'
import Figure from './../../components/figure'
import CustomTextField from './../../components/TextField'
import InputFile from './../../components/InputFile'

import styles from './../../styles/CreateRecipe.module.css'

import api from './../../config/api'

interface ingredientsInterface {
  name: string,
  measure: string
}

export default function CreateRecipe() {
  const [title, setTitle] = useState<string>('')
  const [time, setTime] = useState<number>(0)
  const [number_of_portions, setNumber_of_portions] = useState<number>(0)
  const [preparation_mode, setPreparation_mode] = useState<string>('')
  const [observations, setObservations] = useState<string>('')
  const [recipeImg, setRecipeImg] = useState<File>()
  
  const [ingredientName, setIngredientName] = useState<string>('')
  const [measure, setMeasure] = useState<string>('')
  const [ingredients, setIngredients] = useState<ingredientsInterface[]>([])

  async function createRecipeInAPI() {
    const isNotEmptyFields = !!title && !!time && !!number_of_portions && !!preparation_mode && !!observations
    const token = sessionStorage.getItem('token')
    const data = new FormData()

    data.append('title', title)
    data.append('time', time)
    data.append('number_of_portions', number_of_portions)
    data.append('preparation_mode', preparation_mode)
    data.append('observations', observations)
    data.append('img', recipeImg)

    if (isNotEmptyFields) {
      await api.post('/recipes', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          alert('Receita criada com sucesso!')
        })
        .catch(error => {
          alert('informações incorretas, verifique se todos os campos estão preenchidos corretamente.')
        })
    }
  }

  function createIngredient() {
    const isNotEmpty = !!ingredientName && !!measure

    if (isNotEmpty) {
      setIngredients([...ingredients, {
        name: ingredientName,
        measure: measure
      }])
  
      setIngredientName('')
      setMeasure('') 
    }
  }

  function deleteIngredient(id: number) {
    let Newingredients = ingredients.filter((ingredient, index) => {
      return index !== id
    })

    setIngredients(Newingredients)
  }

  function renderActualIngredients() {
    return ingredients.map((ingredinent, index) => {
      return (
        <div className={styles.ingredientsContainer} key={index}>
          <Input 
            state={ingredinent.name}
            label='Ingrediente'
            disabled={true}
            width='100px'
          />

          <Input 
            state={ingredinent.measure}
            label='medida'
            disabled={true}
            width='100px'
            marginLeft='15px'
          />

          <IconButton 
            aria-label='adicionar ingrediente' 
            color='secondary'
            onClick={() => deleteIngredient(index)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )
    })
  }

  return (
    <Layout>
      <Head>
        <title>Criar Receita</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Criar receita' />

      <div className={styles.mainContainer}>
        <Figure  listOfStates={[title, preparation_mode, observations, ingredientName]}/>

        <InputFile
          setState={setRecipeImg}
        />

        <Input state={title} setState={setTitle} label='titulo da receita' width='260px' />
        
        <div className={styles.timeInputsContainer}>
          <Input 
            state={time} 
            setState={setTime} 
            label='tempo de preparo' 
            type='number' 
            width='220px'
          />
          <p className={styles.timeInputsText}>Min</p>
        </div>

        <div className={styles.timeInputsContainer}>
          <Input 
            state={number_of_portions} 
            setState={setNumber_of_portions} 
            label='Serve' 
            type='number' 
            width='200px'
          />
          <p className={styles.timeInputsText}>porções</p>
        </div>

        {renderActualIngredients()}

        <div className={styles.ingredientsContainer}>
          <Input 
            state={ingredientName}
            setState={setIngredientName}
            label='Ingrediente'
            placeholder='leite, açucar, etc'
            width='100px'
          />

          <Input 
            state={measure}
            setState={setMeasure}
            label='medida'
            placeholder='g, xicaras, etc'
            width='100px'
            marginLeft='15px'
          />

          <IconButton 
            aria-label='adicionar ingrediente' 
            color='primary'
            onClick={() => createIngredient()}
          >
            <AddIcon />
          </IconButton>
        </div>

        <CustomTextField
          label='Modo de preparo'
          state={preparation_mode}
          setState={setPreparation_mode}
          width='260px'
          marginBottom='10px'
        />

        <CustomTextField
          label='Observações'
          state={observations}
          setState={setObservations}
          width='260px'
        />

        <Button
          backgroundColor='#d49898'
          margin={{ marginTop: '30px', marginBottom: '60px' }}
          width='260px'
          // onclick={() => createRecipeInAPI()}
        >
          Registrar
        </Button>
      </div>
    </Layout>
  )
}