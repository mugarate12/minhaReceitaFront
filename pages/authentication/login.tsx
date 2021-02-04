import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import styles from './../../styles/Login.module.css'
import Layout from './../../components/Layout'
import Figure from './../../components/figure'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import Input from './../../components/Input'
import CustomButton from './../../components/Button'

import api from './../../config/api'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function logUser() {
    const emailNotEmpty = !!email
    const passwordNotEmpty = !!password

    if (emailNotEmpty && passwordNotEmpty) {
      await api.post('/session', {
        email,
        password
      })
        .then(response => {
          // aqui vai ser local storage mesmo
          sessionStorage.setItem('token', response.data.token)
          router.push('/recipes/recipes')
        })
        .catch(error => {
          const isCelebrateError = error.response.status === 400
          const invalidInputError = error.response.status === 406
          const isNotDatabaseError = error.response.data.error.message !== 'Database Error'

          if (isCelebrateError) {
            alert('Informações incorretas, por favor, verifique os campos!')
          } else if (invalidInputError && isNotDatabaseError) {
            alert('Dados incorretos, verifique a informação!')
          } else {
            alert('Ocorreu algum erro inesperado, verifique as informações ou tente mais tarde!')
          }
        })
    } else {
      alert('Preencha todos os campos')
    }
  }

  return (
    <Layout>
      <Head>
        <title>Entrar</title>
      </Head>

      <PageDescription title='Home'/>

      <Header />

      <div className={styles.container}>
        <Figure listOfStates={[email, password]}/>

        <form className={styles.formLogin}>
          {/* email input */}
          <Input label='email' state={email} setState={setEmail} />
          <br/>
          {/* password input */}
          <Input label='password' type='password' state={password} setState={setPassword} />
        </form>

        <button 
          className={styles.authenticationBtn}
          onClick={() => router.push('/authentication/sendPassword')}
        >
          <p className={styles.authenticationBtnText}>Não consigo autenticar</p>
        </button>

        <div className={styles.optionsLoginBtnContainer}>
          <CustomButton variant='outlined' size='small' colorMaterialUI='primary'>
            [G] entrar
          </CustomButton>

          <CustomButton 
            variant='outlined' 
            size='small' 
            colorMaterialUI='secondary'
            onclick={() => router.push('/authentication/register')}
            >
            Inscrever-se
          </CustomButton>
        </div>

        <CustomButton
          backgroundColor='#d49898'
          margin={{ marginTop: '15px' }}
          width='219px'
          // onclick={() => logUser()}
          onclick={() => router.push('/recipes/recipes')}
        >
          Entrar
        </CustomButton>
      </div>
    </Layout>
  )
}
