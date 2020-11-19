import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import styles from './../../styles/Login.module.css'

import Figure from './../../components/figure'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <>
      <Figure listOfStates={[email, password]}/>

      <form className={styles.formLogin}>
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

        <TextField
          label="password"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          type="password"
          className={styles.inputLogin}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>

      
      {/* <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
      <br/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}/> */}
    </>
  )
}
