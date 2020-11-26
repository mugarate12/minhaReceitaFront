import { useState } from 'react'
import Head from 'next/head'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import styles from './../../styles/Login.module.css'
import Figure from './../../components/figure'
import Header from './../../components/Header'
import Input from './../../components/Input'
import CustomButton from './../../components/Button'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

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

        <button className={styles.authenticationBtn}>
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
          backgroundColor='rgba(232, 197, 229, 90%)'
          margin={{ marginTop: '15px' }}
        >
          Entrar
        </CustomButton>
      </div>
    </>
  )
}
