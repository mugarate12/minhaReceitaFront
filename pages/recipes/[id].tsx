import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import RoomServiceIcon from '@material-ui/icons/RoomService'
import TimerIcon from '@material-ui/icons/Timer'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'

import styles from './../../styles/Recipe.module.css'

export default function Recipe() {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout>
      <Head>
        <title>Receita</title>
      </Head>

      <Header isHomePage={false} renderMenu={true} />

      <PageDescription title='Receita'/>

      <div className={styles.mainContainer}>
        {/* <h1>{id}</h1> */}

        <div className={styles.recipeMainInformationContainer}>
          <div className={styles.imgContainer}>
            <Image 
              src='/img/teste.jpg'
              width={200}
              height={200}
              className={styles.img}
            />
          </div>

          <div>
            <h5 className={styles.title}>Titulo da Receita</h5>

            <div className={styles.recipeInformation} >
              <div className={styles.recipeInformationMicroCard}>
                <div className={styles.iconContainer} >
                  <TimerIcon fontSize='large' color='disabled'/>
                </div>

                <p className={styles.recipeInformationText}>40 min</p>
              </div>

              <div className={styles.recipeInformationMicroCard}>
                <div className={styles.iconContainer} >
                  <RoomServiceIcon fontSize='large' color='disabled'/>
                </div>

                <p className={styles.recipeInformationText}>serve x porções</p>
              </div>
            </div>
          </div>

          <div className={styles.ingredientsContainer}>
            <h5 className={styles.title}>Ingredientes</h5>

            <ul className={styles.recipeUl}>
              <li className={styles.recipeLi}>Açucar</li>
              <li className={styles.recipeLi}>Tempero</li>
              <li className={styles.recipeLi}>E tudo que há de bom</li>
            </ul>
          </div>
        </div>


        <h5 className={styles.title}>Modo de preparo</h5>

        <p className={styles.textContent}>Lorem ipsum diam et condimentum habitasse mauris venenatis porttitor malesuada quam, arcu vehicula est bibendum nunc aliquam sagittis tristique per ut aenean, sit posuere gravida litora nisl sodales blandit morbi consectetur. fermentum aenean urna pharetra lacinia in vehicula eu suspendisse euismod et, dui velit fermentum taciti eget nulla hac ut et ut, eleifend egestas molestie aptent suspendisse sociosqu erat augue non. libero ornare dolor felis consequat sagittis donec ac etiam pulvinar augue, risus accumsan lobortis suscipit cursus aptent tristique habitant tortor, aliquam nullam congue in fringilla tempor hac metus laoreet</p>
        
        <h5 className={styles.title}>Observações</h5>

        <p className={styles.textContent}>Lorem ipsum diam et condimentum habitasse mauris venenatis porttitor malesuada quam, arcu vehicula est bibendum nunc aliquam sagittis tristique per ut aenean, sit posuere gravida litora nisl sodales blandit morbi consectetur. fermentum aenean urna pharetra lacinia in vehicula eu suspendisse euismod et, dui velit fermentum taciti eget nulla hac ut et ut, eleifend egestas molestie aptent suspendisse sociosqu erat augue non. libero ornare dolor felis consequat sagittis donec ac etiam pulvinar augue, risus accumsan lobortis suscipit cursus aptent tristique habitant tortor, aliquam nullam congue in fringilla tempor hac metus laoreet</p>
      </div>
    </Layout>
  )
}