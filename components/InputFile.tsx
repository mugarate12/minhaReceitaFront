import { SetStateAction, Dispatch, useState } from 'react'

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'

import styles from './../styles/InputFile.module.css'

type Props = {
  setState: Dispatch<SetStateAction<any>>,
  defaultDisplayText: string
}

export default function InputFile({ setState, defaultDisplayText }: Props) {
  const [displayText, setDisplayText] = useState<string>(defaultDisplayText)
  
  return (
    <div className={styles.inputFileContainer}>
      <input 
        type="file" 
        name="imagem da receita" 
        id="imgFile"
        className={styles.inputFile}
        onChange={(event) => {
          const fileList = event.target.files
          const file = fileList[0]

          setState(file)
          setDisplayText('foto carregada!')
        }}
      />
      <InsertDriveFileIcon 
        color="disabled"
        fontSize='large'
        style={{
          position: 'absolute',
          marginTop: '-25px',
          color: 'rgb(136, 128, 128)'
        }}
      />
      <p className={styles.inputFileText}>{displayText}</p>
    </div>
  );
}