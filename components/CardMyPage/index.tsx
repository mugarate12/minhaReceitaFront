import { ReactNode } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import styles from './CardMyPage.module.css'

type Props = {
  children: ReactNode,
  text: string,
  onclick?: Function
}

export default function CardMyPage({ children, text, onclick }: Props) {
  return (
    <button 
      className={styles.btn}
      onClick={!!onclick ? () => onclick() : () => {}}
    >
      <Card style={{
      width: '100px',
      height: '120px',
      cursor: 'pointer',
      borderRadius: '10px',
      backgroundColor: '#e9bcb2'
    }}>
        <CardContent>
          { children }
        <p className={styles.text}>{text}</p>
        </CardContent>
      </Card>
    </button>
  )
}