import { useRouter } from 'next/router'

import RoomServiceIcon from '@material-ui/icons/RoomService'
import TimerIcon from '@material-ui/icons/Timer'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import styles from './../styles/CardRecipe.module.css'

export default function CardRecipe() {
  const router = useRouter()

  return (
    <button className={styles.cardContainer} onClick={() => router.push('/recipes/1')}>
      <div className={styles.cardImgContainer}>
        <img 
          src="/img/teste.jpg" 
          alt="Teste de imagem de receita"
          className={styles.cardImg}
        />
      </div>

      <div className={styles.informationContainer} >
        <h5 className={styles.recipeTitle} >Titulo da receita</h5>

        <div className={styles.recipeInformationContainer}>
          <div className={styles.recipeSubtitleContainer}>
            <RoomServiceIcon fontSize='small' color='action' />
            <p className={styles.recipeSubtitle}>Serve x porções</p>
          </div>

          <div className={styles.recipeSubtitleContainer}>
            <TimerIcon fontSize='small' color='action'/>
            <p className={styles.recipeSubtitle}>40 min</p>
          </div>
        </div>
      </div>

      <ArrowForwardIosIcon fontSize='small' color='action' className={styles.teste}/>
    </button>
  )
}