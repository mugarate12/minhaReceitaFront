import { useState } from 'react'
import Head from 'next/head'

import styles from './../../styles/Register.module.css'
import Layout from './../../components/Layout'
import Figure from './../../components/figure'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import Input from './../../components/Input'
import CustomButton from './../../components/Button'

export default function Register() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  
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
        >
          Cadastrar
        </CustomButton>
      </div>
    </Layout>
  );
}