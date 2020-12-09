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

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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

          <CustomButton variant='outlined' size='small' colorMaterialUI='secondary'>
            Inscrever-se
          </CustomButton>
        </div>

        <CustomButton
          backgroundColor='#d49898'
          margin={{ marginTop: '15px' }}
        >
          Entrar
        </CustomButton>
      </div>
    </Layout>
  )
}
