import { SetStateAction, Dispatch } from 'react'
import TextField from '@material-ui/core/TextField'

type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  state: string | number;
  setState?: Dispatch<SetStateAction<any>>
  width?: string;
  marginLeft?: string;
}

export default function Input({ label, placeholder, type, disabled, state, setState, width, marginLeft }: Props) {
  return (
    <TextField
      label={label}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      variant="outlined"
      size="small"
      style={{
        marginBottom: '5px', 
        width: width, 
        marginLeft: marginLeft
      }}
      InputLabelProps={{
        style: {
          fontFamily: 'Caveat',
          fontStyle: 'cursive',
          fontSize: '20px'
        }
      }}
      inputProps={{
        style: {
          fontFamily: 'Caveat',
          fontStyle: 'cursive',
          fontSize: '20px'
        }
      }}
      value={state}
      onChange={(e) => {
        if (type === 'number') {
          if (Number(e.target.value) >= 0) {
            setState(e.target.value)
          }
        } else {
          setState(e.target.value)
        }
      }}
    />
  )
}