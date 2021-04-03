import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import IconButton from '@material-ui/core/IconButton'
import InputM from '@material-ui/core/TextField'

import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

import {
  Layout,
  PageDescription,
  InputFile,
  Input,
  PreviousTextInformation,
  TextField,
  Button,
  Image
} from './../../../components'

import {
  Header
} from './../../../containers'

import styles from './../../../styles/UpdateRecipe.module.css'

import api from './../../../config/api'

interface ingredientsInterface {
  id: number,
  name: string,
  measure: string,
  recipeIDFK: string
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
  const [ingredientsForDelete, setIngredientsForDelete] = useState<Array<ingredientsInterface>>([])

  async function getRecipeByID() {
    const token = sessionStorage.getItem('token')

    await api.get(`/recipes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
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

  async function updateRecipeRequest() {
    const token = sessionStorage.getItem('token')
    
    try {
      // atualiza os ingredientes
      ingredients.forEach(async (ingredient, index) => {
        await api.put(`/recipes/${id}/ingredients/${ingredient.id}`, {
          name: ingredient.name,
          measure: ingredient.measure
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      })

      // deleta ingredientes
      ingredientsForDelete.forEach(async (ingredient, index) => {
        await api.delete(`/ingredients/${ingredient.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      })

      // cria novos ingredientes
      const haveNewIngredients = newIngredients.length > 0

      if (haveNewIngredients) {
        let createArrayIngredients = newIngredients.map((ingredient, index) => {
          ingredient['recipeIDFK'] = id
          return ingredient
        })
  
        await api.post('/ingredients', {
          ingredients: createArrayIngredients
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            setNewIngredients([])
          })
      }

      // atualiza informações gerais
      let recipeData = {}
      !!title ? recipeData['title'] = title : null
      !!time ? recipeData['time'] = String(time) : null
      !!number_of_portions ? recipeData['number_of_portions'] = number_of_portions : null
      !!preparation_mode ? recipeData['preparation_mode'] = preparation_mode : null
      !!observations ? recipeData['observations'] = observations : null

      const isNotEmptyData = Object.keys(recipeData).length > 0
      if (isNotEmptyData) {
        await api.put(`/recipes/${id}`, recipeData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }

      // atualiza foto
      if (!!recipeImg) {
        const data = new FormData()
        data.append('img', recipeImg)

        await api.put(`/recipes/${id}/img`, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }

      alert('Receita atualizada com sucesso!')
      router.push('/recipes/recipes')
    } catch (error) {
      alert('ocorreu um erro inexperado, tente novamente')
    }
  }

  function setIngredient(payload: string, index: number, type: 'name' | 'measure') {
    let newArrayIngredients = ingredients
  
    newArrayIngredients[index][type] = payload

    setIngredients([...newArrayIngredients])
  }

  function deleteIngredient(index: number) {
    let ingredient = {
      id: ingredients[index].id,
      name: ingredients[index].name,
      measure: ingredients[index].measure,
      recipeIDFK: ingredients[index].recipeIDFK
    }

    let newArrayIngredients = ingredients.filter((ingredient, ingredientIndex) => {
      return ingredientIndex !== index
    })

    setIngredients(newArrayIngredients)
    setIngredientsForDelete([...ingredientsForDelete, ingredient])
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
          
          <IconButton 
            aria-label='editar ingrediente' 
            color='inherit'
            onClick={() => deleteIngredient(index)}
          >
            <DeleteIcon />
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
            <DeleteIcon fontSize='large'/>
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

        <div className={styles.updateFieldContainer} style={{marginTop: '40px'}}>
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
          onclick={() => updateRecipeRequest()}
        >
          Atualizar</Button>
      </div>
    </Layout>
  );
}