import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  Layout,
  Figure,
  PageDescription,
  Input,
  Button as CustomButton
} from './../../components'

import {
  Header
} from './../../containers'

import styles from './../../styles/Register.module.css'

import api from './../../config/api'

export default function Register() {
  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [isValidUsername, setIsValidUsername] = useState<string>('')

  async function handleRegister(event) {
    event.preventDefault()

    const nameNotEmpty = !!name
    const emailNotEmpty = !!email
    const usernameNotEmpty = !!username
    const passwordNotEmptyAndSameToConfirm = !!password && !!confirmPassword && password === confirmPassword

    if (nameNotEmpty && emailNotEmpty && usernameNotEmpty && passwordNotEmptyAndSameToConfirm) {
      const isUsernameValid = await getIsValidUsername()
      if (!isUsernameValid) {
        setIsValidUsername('username já está em uso!')
        return
      }
      
      await api.post('/users', {
        name,
        email,
        password,
        username
      })
        .then(response => {
          alert('Conta criada com sucesso!')
          router.push('/authentication/login')
        })
        .catch(error => {
          const isCelebrateError = error.response.status === 400
          const invalidInputError = error.response.status === 406
          const isNotDatabaseError = error.response.data.error.message !== 'Database Error'
          const isDatabaseError =  error.response.data.error.message === 'Database Error'

          console.log(error.response.data)

          if (isCelebrateError) {
            alert('Informações incorretas, por favor, verifique os campos!')
          } else if (isDatabaseError) {
            alert('verifique suas informações como email, e tente novamente!')
          }else if (invalidInputError && isNotDatabaseError) {
            alert('a senha precisa ser maior que 8 digitos e conter números!')
          } else {
            alert('Ocorreu algum erro inesperado, verifique as informações ou tente mais tarde!')
          }
        })
    } else {
      if(!passwordNotEmptyAndSameToConfirm) {
        alert('senha não é igual a confirmação de senha!')
      } else {
        alert('Preencha todos os campos!')
      }
    }
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
  
  return (
    <Layout>
      <Head>
        <title>Cadastrar</title>
      </Head>

      <Header />

      <PageDescription title='Cadastrar-se' />

      <div className={styles.container}>
        <Figure listOfStates={[name, email, username, password, confirmPassword]} />

        <form className={styles.form}>
          <Input label='name' state={name} setState={setName} />
          <Input label='email' state={email} setState={setEmail} />
          <Input label='username' state={username} setState={setUsername} />
          
          <p
            className={styles.validUser}
            style={{
              color: isValidUsername === 'username já está em uso!' ? 'red' : 'green'
            }}
          >{isValidUsername}</p>
          
          <div>
            <Input 
              label='senha' 
              state={password} 
              setState={setPassword} 
              type='password' 
              width='100px'
            />
            <Input 
              label='confirmar' 
              state={confirmPassword} 
              setState={setConfirmPassword} 
              type='password' 
              width='100px'
              marginLeft='25px'
            />
          </div>

          <CustomButton
            backgroundColor='#d49898'
            margin={{marginTop: '15px'}}
            onclick={(e) => handleRegister(e)}
            // onclick={() => router.push('/recipes/recipes')}
            type='submit'
          >
            Cadastrar
          </CustomButton>
        </form>

      </div>
    </Layout>
  )
}