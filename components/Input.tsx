import { SetStateAction, Dispatch } from 'react';
import TextField from '@material-ui/core/TextField'

import styles from './../styles/Input.module.css'

type Props = {
  label: string;
  type?: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

export default function Input({ label, type, state, setState }: Props) {
  return (
    <TextField
      label={label}
      type={type}
      // id="outlined-size-small"
      variant="outlined"
      size="small"
      className={styles.inputLogin}
      style={{marginBottom: '10px'}}
      value={state}
      onChange={(e) => setState(e.target.value)}
    />
  )
}