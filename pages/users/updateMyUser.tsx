import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  Layout,
  PageDescription,
  InputFile,
  Input,
  PreviousTextInformation,
  TextField,
  Button,
  Image
} from './../../components'

import {
  Header
} from './../../containers'

import styles from './../../styles/UpdateRecipe.module.css'

import api from './../../config/api'

export default function UpdateMyUSer() {
  const router = useRouter()

  const [userImg, setUserImg] = useState<File>()
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [biografy, setBiografy] = useState<string>('')

  const [isValidUsername, setIsValidUsername] = useState<string>('')
  
  // data on API Request
  const [userImgURL, setUserImgURL] = useState<string>('/img/teste.jpg')
  const [previousName, setPreviousName] = useState<string>('')
  const [previousUsername, setPreviousUsername] = useState<string>('')
  const [previousEmail, setPreviousEmail] = useState<string>('')
  const [previousBiografy, setPreviousBiografy] = useState<string>('Ainda não existe biografia, adicione uma')

  async function getUSerInformation() {
    const token = sessionStorage.getItem('token')

    await api.get('/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const { biografy, email, imgURL, name, username } = response.data.user
        
        setPreviousEmail(email)
        setPreviousName(name)
        setPreviousUsername(username)
        
        if (!!biografy) {
          setPreviousBiografy(biografy)
        }
        
        if (!!imgURL) {
          setUserImgURL(imgURL)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  async function updateUserInformations() {
    if (!!username) {
      const isValid = await getIsValidUsername()
      if (!isValid) {
        setIsValidUsername('username já está em uso!')
        return
      }
    }

    const token = sessionStorage.getItem('token')
    const data = new FormData()
    
    if (!!biografy) data.append('biografy', biografy)
    if (!!email) data.append('email', email)
    if (!!username) data.append('username', username)
    if (!!name) data.append('name', name)
    if (!!userImg) data.append('img', userImg)

    await api.put('/users', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        alert('informação atualizada com sucesso!')
        router.push('/users/mypage')
      })
      .catch(error => {
        console.log(error)
        alert('Ocorreu um erro inexperado, verifique as informações e tente novamente')
      })
  }

  async function getIsValidUsername() {
    return await api.get(`/users/${username}/valid`)
      .then(response => {
        const isValid = !!response.data.valid

        return isValid
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getUSerInformation()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Atualizar perfil</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Atualizar perfil'/>

      <div className={styles.mainContainer}>
        <div className={styles.updateFieldContainer}>
          <div className={styles.imgContainer}>
            <Image 
              src={!!userImg ? URL.createObjectURL(userImg) : userImgURL}
              alt='imagem do usuário'
            />
          </div>

          <InputFile
            setState={setUserImg}
            defaultDisplayText='selecione uma foto de perfil'
          />
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={name}
            textDescription={previousName}
          />

          <Input
            label='nome'
            state={name}
            setState={setName}
            placeholder='novo nome'
            width='250px'
          />
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={username}
            textDescription={`@${previousUsername}`}
          />

          <div>
            <Input
              label='username'
              state={username}
              setState={setUsername}
              placeholder='novo username'
              width='250px'
            />
            <p
              className={styles.validUser}
              style={{
                color: isValidUsername === 'username já está em uso!' ? 'red' : 'green'
              }}
            >{isValidUsername}</p>
          </div>
        </div>
        
        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={email}
            textDescription={previousEmail}
          />

          <Input
            label='email'
            state={email}
            setState={setEmail}
            placeholder='seu novo email'
            width='250px'
          />
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={biografy}
            textDescription={previousBiografy}
          />

          <TextField
            label='Biografia'
            state={biografy}
            setState={setBiografy}
          />
        </div>

        <Button
          backgroundColor='#d49898'
          width='250px'
          margin= {{
            marginTop: '15px'
          }}
          onclick={() => updateUserInformations()}
        >Atualizar</Button>
      </div>
    </Layout>
  )
}