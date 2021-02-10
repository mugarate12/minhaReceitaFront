import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

import RoomServiceIcon from '@material-ui/icons/RoomService'
import TimerIcon from '@material-ui/icons/Timer'
import VisibilityIcon from '@material-ui/icons/Visibility'
import EditIcon from '@material-ui/icons/Edit'
import ShareIcon from '@material-ui/icons/Share'
import DeleteIcon from '@material-ui/icons/Delete'

import styles from './../styles/CardRecipe.module.css'

import api from './../config/api'

type Props = {
  urlImg: string;
  recipeTitle: string;
  numberOfPortions: string;
  time: string;
  id: string;
  onClick?: Function;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    height: '150px',
    width: '270px'
  },
  details: {
    backgroundColor: ' rgba(255, 191, 183, 0.6)'
  },
  content: {
    marginLeft: '5px',
    height: '100px'
  },
  cover: {

  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
}))

export default function CardRecipe({ id, urlImg, recipeTitle, numberOfPortions, time, onClick}: Props) {
  const classes = useStyles()
  const router = useRouter()

  async function deleteRecipe() {
    const token = sessionStorage.getItem('token')

    await api.delete(`/recipes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        alert('receita deletada com sucesso!')
        location.reload()
      })
      .catch(error => {
        alert('ocorreu um erro inexperado, tente novamente!')
      })
  }

  return (
    <Card className={classes.root}>
      <CardMedia 
        image={urlImg}
        title='imagem da receita'
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
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

        <div className={classes.controls}>
          <IconButton
            onClick={() => router.push(`/recipes/${id}`)}
          >
            <VisibilityIcon color='primary' />
          </IconButton>

          <IconButton
            onClick={() => router.push(`/recipes/update/${id}`)}
          >
            <EditIcon color='primary' />
          </IconButton>
          
          <IconButton>
            <ShareIcon color='action' />
          </IconButton>

          <IconButton onClick={() => deleteRecipe()}>
            <DeleteIcon color='secondary' />
          </IconButton>
        </div>
      </div>
    </Card>
  )
}