import { useState } from 'react';

import Figure from './../../components/figure'

export default function Login() {
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <>
      <Figure inputString={inputValue} />
      <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
    </>
  )
}
