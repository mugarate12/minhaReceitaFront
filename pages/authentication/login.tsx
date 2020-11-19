import { useState } from 'react';

import Figure from './../../components/figure'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <>
      <Figure listOfStates={[email, password]}/>
      
      <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
      <br/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
    </>
  )
}
