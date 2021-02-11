import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import styles from './../styles/CardMyPage.module.css'

type Props = {
  children: ReactNode,
  text: string,
  onclick?: Function
}

export default function CardMyPage({ children, text, onclick }: Props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100px',
      height: '120px',
      cursor: 'pointer',
      borderRadius: '10px',
      backgroundColor: '#e9bcb2'
    }
  }))

  const classes = useStyles()

  return (
    <button 
      className={styles.btn}
      onClick={!!onclick ? () => onclick() : () => {}}
    >
      <Card className={classes.root}>
        <CardContent>
          { children }
        <p className={styles.text}>{text}</p>
        </CardContent>
      </Card>
    </button>
  )
}