import { useRouter } from 'next/router'

import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

import RoomServiceIcon from '@material-ui/icons/RoomService'
import TimerIcon from '@material-ui/icons/Timer'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ShareIcon from '@material-ui/icons/Share'

import styles from './../CardRepice/CardRecipe.module.css'

import api from './../../config/api'

type Props = {
  urlImg: string;
  recipeTitle: string;
  numberOfPortions: string;
  time: string;
  id: string;
  onClick?: Function;
  username?: string;
}

export default function CardRecipe({ id, urlImg, recipeTitle, numberOfPortions, time, onClick, username}: Props) {
  const router = useRouter()

  return (
    <Card style={{
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      height: '150px',
      width: '270px'
    }}>
      <CardMedia 
        image={urlImg}
        title='imagem da receita'
      />
      <div style={{
        backgroundColor: ' rgba(255, 191, 183, 0.6)'
      }}>
        <CardContent style={{
          marginLeft: '5px',
          height: '100px'
        }}>
          <div className={styles.recipeTitleContainer}>
            <h5 className={styles.recipeTitle} >{recipeTitle}</h5>
          </div>

          <div className={styles.recipeSubtitleContainer}>
            <RoomServiceIcon fontSize='small' color='action' />
            <p className={styles.recipeSubtitle}>{numberOfPortions}</p>
          </div>
          
          <div className={styles.recipeSubtitleContainer}>
            <TimerIcon fontSize='small' color='action'/>
            <p className={styles.recipeSubtitle}>{time}</p>
          </div>
        </CardContent>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}>
          <IconButton
            onClick={() => {
              router.push(`/recipes/publicRecipe/${id}`)
            }}
          >
            <VisibilityIcon color='primary' />
          </IconButton>
          
          <IconButton
            onClick={() => {
              const myText = `http://localhost:3000/recipes/publicRecipe/${id}`
              
              let textArea = document.createElement('textarea')
              textArea.innerText = myText
              document.body.appendChild(textArea)

              textArea.select()

              document.execCommand('copy')

              textArea.remove()
              alert('link pra divulgação copiado, basta dar ctrl+V ou colar onde desejar')
            }}
          >
            <ShareIcon color='action' />
          </IconButton>
        </div>
      </div>
    </Card>
  )
}