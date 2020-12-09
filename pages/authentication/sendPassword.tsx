import { useState } from 'react'
import Head from 'next/head'

import styles from './../../styles/sendPassword.module.css'
import Layout from './../../components/Layout'
import Figure from './../../components/figure'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import Input from './../../components/Input'
import CustomButton from './../../components/Button'

export default function Register() {
  const [email, setEmail] = useState<string>('')
  
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
        >
          Enviar email
        </CustomButton>
      </div>
    </Layout>
  );
}