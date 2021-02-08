import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import IconButton from '@material-ui/core/IconButton'
import InputM from '@material-ui/core/TextField'

import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

import Layout from './../../../components/Layout'
import Header from './../../../components/Header'
import PageDescription from './../../../components/PageDescription'
import InputFile from './../../../components/InputFile'
import Input from './../../../components/Input'
import PreviousTextInformation from './../../../components/PreviousTextInformation'
import TextField from './../../../components/TextField'
import Button from './../../../components/Button'
import Image from './../../../components/Image'

import styles from './../../../styles/UpdateRecipe.module.css'

import api from './../../../config/api'

interface ingredientsInterface {
  id: number,
  name: string,
  measure: string
}

interface newIngredientsInterface {
  name: string,
  measure: string
}

export default function UpdateRecipe() {
  const router = useRouter()
  const { id } = router.query

  // inputs state
  const [recipeImg, setRecipeImg] =useState<File>()
  const [title, setTitle] = useState<string>('')
  const [time, setTime] = useState<number>(0)
  const [number_of_portions, setNumber_of_portions] = useState<number>(0)
  const [preparation_mode, setPreparation_mode] = useState<string>('')
  const [observations, setObservations] = useState<string>('')
  
  const [newIngredients, setNewIngredients] = useState<Array<newIngredientsInterface>>([])
  const [newIngredientName, setNewIngredientName] = useState<string>('')
  const [newIngredientMeasure, setNewIngredientMeasure] = useState<string>('')

  // state on actual data recipe received from API
  const [recipeImgURL, setRecipeImgURL] = useState<string>('/img/teste.jpg')
  
  const [previousTitle, setPreviousTitle] = useState<string>('')
  const [previousTime, setPreviousTime] = useState<string>('')
  const [previousNumberOfPortions, setPreviousNumberOfPortions] = useState<string>('')
  const [previousPreparationMode, setPreviousPreparationMode] = useState<string>('')
  const [previousObservations, setPreviousObservations] = useState<string>('')

  const [ingredients, setIngredients] = useState<Array<ingredientsInterface>>([])

  async function getRecipeByID() {
    const token = sessionStorage.getItem('token')

    await api.get(`/recipes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)

        if (!!response.data.recipe.imgURL) setRecipeImgURL(response.data.recipe.imgURL)
        
        setPreviousTitle(response.data.recipe.title)
        setPreviousTime(response.data.recipe.time)
        setPreviousNumberOfPortions(response.data.recipe.number_of_portions)
        setPreviousObservations(response.data.recipe.observations)
        setPreviousPreparationMode(response.data.recipe.preparation_mode)
        
        setIngredients(response.data.recipe.ingredients)
      })
      .catch(error => {
        alert('ocorreu um erro ao tentar consultar informações, por favor, tente novamente')
        router.push('/recipes/recipes')
      })
  }

  function setIngredient(payload: string, index: number, type: 'name' | 'measure') {
    let newArrayIngredients = ingredients
  
    newArrayIngredients[index][type] = payload

    setIngredients([...newArrayIngredients])
  }

  function renderIngredients() {
    return ingredients.map((ingredient, index) => {
      return (
        <div
          className={styles.ingredientsContainer}
          key={index}
        >
          <InputM
            label='ingrediente'
            variant="outlined"
            value={ingredient.name}
            style={{
              width: '120px'
            }}
            onChange={(e) => setIngredient(e.target.value, index, 'name')}
          />

          <InputM
            label='medida'
            variant="outlined"
            style={{
              width: '120px'
            }}
            value={ingredient.measure}
            onChange={(e) => setIngredient(e.target.value, index, 'measure')}
          />

          <IconButton 
            aria-label='editar ingrediente' 
            color='inherit'
            // onClick={() => createIngredient()}
          >
            <EditIcon />
          </IconButton>
        </div>
      )
    })
  }

  function renderNewIngredients() {
    return newIngredients.map((ingredient, index) => {
      return (
        <div
          className={styles.ingredientsContainer}
          key={index}
        >
          <InputM
            label='ingrediente'
            variant="outlined"
            value={ingredient.name}
            style={{
              width: '120px'
            }}
            disabled={true}
          />

          <InputM
            label='medida'
            variant="outlined"
            style={{
              width: '120px'
            }}
            value={ingredient.measure}
            disabled={true}
          />

          <IconButton 
            aria-label='deletar ingrediente' 
            color='secondary'
            onClick={() => deleteNewIngredient(index)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )
    })
  }

  function createNewIngredient() {
    const isNotEmpty = !!newIngredientName && newIngredientMeasure

    if (isNotEmpty) {
      setNewIngredients([...newIngredients, {
        name: newIngredientName,
        measure: newIngredientMeasure
      }])

      setNewIngredientName('')
      setNewIngredientMeasure('')
    }
  }

  function deleteNewIngredient(index: number) {
    let deleteNewIngredients = newIngredients.filter((ingredient, ingredientIndex) => {
      return ingredientIndex !== index
    })

    setNewIngredients(deleteNewIngredients)
  }

  useEffect(() => {
    getRecipeByID()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Editar Receita</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Editar Receita'/>

      <div className={styles.mainContainer}>
        <div className={styles.updateFieldContainer}>
          <div className={styles.imgContainer}>
            <Image
              src={!!recipeImg ? URL.createObjectURL(recipeImg) : recipeImgURL}
              alt='imagem da receita'
            />
          </div>

          <InputFile
            setState={setRecipeImg}
            defaultDisplayText='selecione uma imagem pra receita'
          />
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={title}
            textDescription={previousTitle}
          />

          <Input
            label='titulo da receita'
            state={title}
            setState={setTitle}
            placeholder='Novo titulo'
            width='250px'
          />
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={time > 0 ? 'valid' : ''}
            textDescription={previousTime}
          />

          <div className={styles.inputNumberContainer}>
            <Input
              label='tempo da receita'
              state={time}
              setState={setTime}
              type='number'
              placeholder='40, 50, 60?'
              width='200px'
            />

            <p className={styles.inputNumberHelperText}>Min</p>
          </div>
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={number_of_portions > 0 ? 'valid' : ''}
            textDescription={`${previousNumberOfPortions} porções`}
          />

          <div className={styles.inputNumberContainer}>
            <Input
              label='número de porções'
              state={number_of_portions}
              setState={setNumber_of_portions}
              type='number'
              placeholder='5, 8, 12?'
              width='170px'
            />

            <p className={styles.inputNumberHelperText}>Porções</p>
          </div>
        </div>

        <h5 className={styles.ingredientTitleApresentation}>seus ingredientes</h5>
        {renderIngredients()}

        <h5 className={styles.ingredientTitleApresentation}>adicionar novos</h5>
        <div
          className={styles.ingredientsContainer}
        >
          <InputM
            label='ingrediente'
            variant="outlined"
            value={newIngredientName}
            style={{
              width: '120px'
            }}
            onChange={(e) => setNewIngredientName(e.target.value)}
          />

          <InputM
            label='medida'
            variant="outlined"
            style={{
              width: '120px'
            }}
            value={newIngredientMeasure}
            onChange={(e) => setNewIngredientMeasure(e.target.value)}
          />

          <IconButton 
            aria-label='editar ingrediente' 
            color='primary'
            onClick={() => createNewIngredient()}
          >
            <AddIcon fontSize='large' />
          </IconButton>
        </div>

        {renderNewIngredients()}

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={preparation_mode}
            textDescription={previousPreparationMode}
          />

          <TextField
            label='Modo de preparo'
            state={preparation_mode}
            setState={setPreparation_mode}
          />
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={observations}
            textDescription={previousObservations}
          />

          <TextField
            label='Observações'
            state={observations}
            setState={setObservations}
          />
        </div>


        <Button
          backgroundColor='#d49898'
          width='250px'
          margin= {{
            marginTop: '15px'
          }}
        >Atualizar</Button>
      </div>
    </Layout>
  );
}