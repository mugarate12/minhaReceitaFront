import { SetStateAction, Dispatch } from 'react';
import TextField from '@material-ui/core/TextField'

type Props = {
  label: string;
  type?: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  width?: string;
  marginLeft?: string;
}

export default function Input({ label, type, state, setState, width, marginLeft }: Props) {
  return (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      size="small"
      style={{marginBottom: '5px', width: width, marginLeft: marginLeft}}
      value={state}
      onChange={(e) => setState(e.target.value)}
    />
  )
}