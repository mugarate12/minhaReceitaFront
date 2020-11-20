import { useState } from 'react'
import Head from 'next/head'
import TextField from '@material-ui/core/TextField'

import styles from './../../styles/Login.module.css'
import Figure from './../../components/figure'
import Header from './../../components/Header'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>
      <Header />

      <Figure listOfStates={[email, password]}/>

      <form className={styles.formLogin}>
        {/* email input */}
        <TextField
          label="email"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          className={styles.inputLogin}
          style={{marginBottom: '10px'}}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br/>

        {/* password input */}
        <TextField
          label="password"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          type="password"
          className={styles.inputLogin}
          style={{marginBottom: '10px'}}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>

      <button className={styles.authenticationBtn}>
        <p className={styles.authenticationBtnText}>Não consigo autenticar</p>
      </button>


    </div>
  )
}
