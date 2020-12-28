import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import Layout from './../components/Layout'
import CustomButton from './../components/Button'
import CardRecipe from './../components/CardRecipe'

export default function Home() {
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>Minha Receita</title>
      </Head>

      <div className={styles.mainContentContainer}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            src='/img/home.jpg'
            alt='Preparo de uma receita'
            width={300}
            height={300}
          />
        </div>

        <div className={styles.mainContentInformationContainer}>
          <h1 className={styles.title}>Seu Lugar</h1>
          <h2 className={styles.subtitle}>pra se reiventar na sua cozinha</h2>
          
          <div className={styles.actionButtonsContainer}>
            <CustomButton
              backgroundColor="#FDDADA"
              onclick={() => router.push('/authentication/login')}
              margin={{ marginRight: '10px' }}
            >
              Entrar
            </CustomButton>

            <CustomButton
              backgroundColor='rgba(232, 197, 229, 90%)'
              onclick={() => router.push('/authentication/register')}
            >
              Cadastrar-se
            </CustomButton>
          </div>
        </div>
      </div>
      

      <div className={styles.subContentContainer}>
        <div className={styles.subContentTextContainer}>
          <h2 className={styles.subtitle}>suas receitas com lugar pra estar e te esperar</h2>
          <p className={styles.subContentText}>guarde, edite e reveja suas receitas de forma prática, rápida e prazerosa</p>
        </div>

        <div className={styles.cardsContainer}>
          <CardRecipe
            numberOfPortions='oito fatias'
            recipeTitle='Pizza de calabresa'
            time='1 hora'
            urlImg='/img/pizza.jpg'
            onClick={() => {}}
          />

          <CardRecipe
            numberOfPortions='dez porções'
            recipeTitle='macarrão ??'
            time='40 min'
            urlImg='/img/macarrao.jpg'
            onClick={() => {}}
          />
        </div>
      </div>
    </Layout>
  )
}
