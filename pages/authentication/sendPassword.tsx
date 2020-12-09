import { useState } from 'react'
import Head from 'next/head'

import styles from './../../styles/sendPassword.module.css'
import Layout from './../../components/Layout'
import Figure from './../../components/figure'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import Input from './../../components/Input'
import CustomButton from './../../components/Button'

import api from './../../config/api'

export default function Register() {
  const [email, setEmail] = useState<string>('')

  async function requestNewPassword() {
    const emailNotEmpty = !!email

    if (emailNotEmpty) {
      await api.put('/session', {
        email
      })
        .then(response => {
          alert('Mandamos um email com uma nova senha, verifique sua caixa de email em alguns instantes e siga os passos')
        })
        .catch(error => {
          alert('Email invalido, verifique seu email!')
        })
    } else {
      alert('Preencha o campo com seu email')
    }
  }
  
  return (
    <Layout>
      <Head>
        <title>Recuperar senha</title>
      </Head>

      <Header />

      <PageDescription title='Requisitar senha' />

      <div className={styles.container}>
        <Figure listOfStates={[email]} />

        <form className={styles.form}>
          <Input label='seu email' state={email} setState={setEmail} />
        </form>

        <CustomButton
          backgroundColor='#d49898'
          margin={{marginTop: '15px'}}
          // onclick={() => requestNewPassword()}
        >
          Enviar email
        </CustomButton>
      </div>
    </Layout>
  );
}