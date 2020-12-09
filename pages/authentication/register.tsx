import { useState } from 'react'
import Head from 'next/head'

import styles from './../../styles/Register.module.css'
import Layout from './../../components/Layout'
import Figure from './../../components/figure'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import Input from './../../components/Input'
import CustomButton from './../../components/Button'

import api from './../../config/api'

export default function Register() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  async function handleRegister() {
    const nameNotEmpty = !!name
    const emailNotEmpty = !!email
    const passwordNotEmptyAndSameToConfirm = !!password && !!confirmPassword && password === confirmPassword

    if (nameNotEmpty && emailNotEmpty && passwordNotEmptyAndSameToConfirm) {
      await api.post('/users', {
        name,
        email,
        password
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          const isCelebrateError = error.response.status === 400
          const invalidInputError = error.response.status === 406
          const isNotDatabaseError = error.response.data.error.message !== 'Database Error'

          if (isCelebrateError) {
            alert('Informações incorretas, por favor, verifique os campos!')
          } else if (invalidInputError && isNotDatabaseError) {
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
  
  return (
    <Layout>
      <Head>
        <title>Cadastrar</title>
      </Head>

      <Header />

      <PageDescription title='Cadastrar-se' />

      <div className={styles.container}>
        <Figure listOfStates={[name, email, password, confirmPassword]} />

        <form className={styles.form}>
          <Input label='name' state={name} setState={setName} />
          <Input label='email' state={email} setState={setEmail} />
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
        </form>

        <CustomButton
          backgroundColor='#d49898'
          margin={{marginTop: '15px'}}
          // onclick={() => handleRegister()}
        >
          Cadastrar
        </CustomButton>
      </div>
    </Layout>
  )
}