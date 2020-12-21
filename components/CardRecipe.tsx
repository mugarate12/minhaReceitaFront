import { useRouter } from 'next/router'
import IconButton from '@material-ui/core/IconButton'

import RoomServiceIcon from '@material-ui/icons/RoomService'
import TimerIcon from '@material-ui/icons/Timer'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import styles from './../styles/CardRecipe.module.css'

type Props = {
  urlImg: '/img/teste.jpg';
  recipeTitle: 'Titulo da receita';
  numberOfPortions: 'Serve x porções';
  time: '40min';
}

export default function CardRecipe({ urlImg, recipeTitle, numberOfPortions, time}: Props) {
  const router = useRouter()

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardImgContainer}>
        <img 
            src={urlImg} 
            alt="Teste de imagem de receita"
            className={styles.cardImg}
          />
      </div>

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

      <div className={styles.buttonContainer}>
        <IconButton style={{
          padding: '5px', 
          backgroundColor: '#FDDADA', 
          borderRadius: '10px'
          }} 
          aria-label='recipe page'
          onClick={() => router.push('/recipes/1')}
          >
          <ArrowForwardIcon />
        </IconButton>
      </div>
      {/* <div className={styles.cardImgContainer}>
        <img 
          src={urlImg} 
          alt="Teste de imagem de receita"
          className={styles.cardImg}
        />
      </div>

      <div className={styles.informationContainer} >
        <h5 className={styles.recipeTitle} >{recipeTitle}</h5>

        <div className={styles.recipeInformationContainer}>
          <div className={styles.recipeSubtitleContainer}>
            <RoomServiceIcon fontSize='small' color='action' />
            <p className={styles.recipeSubtitle}>{numberOfPortions}</p>
          </div>

          <div className={styles.recipeSubtitleContainer}>
            <TimerIcon fontSize='small' color='action'/>
            <p className={styles.recipeSubtitle}>{time}</p>
          </div>
        </div>
      </div>

      <ArrowForwardIosIcon fontSize='small' color='action' className={styles.teste}/> */}
    </div>
  )
}