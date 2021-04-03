import { SetStateAction, Dispatch } from 'react'

import TextField from '@material-ui/core/TextField'

type Props = {
  label: string,
  state: string,
  setState?: Dispatch<SetStateAction<any>>,
  width?: string,
  marginBottom?: string
}

export default function CustomTextField({ label, state, setState, width, marginBottom } : Props) {
  return (
    <TextField 
      variant='outlined'
      label={label}
      multiline={true}
      rowsMax={6}
      style={{
        width: width,
        marginBottom: marginBottom
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
      onChange={(e) => setState(e.target.value)}
    />
  );
}