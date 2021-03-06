import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  Layout,
  PageDescription,
  CardMyPage as Card
} from './../../../components'
import {
  Header
} from './../../../containers'

import ReceiptIcon from '@material-ui/icons/Receipt'
import FastfoodIcon from '@material-ui/icons/Fastfood'

import styles from './../../../styles/MyPage.module.css'

import api from './../../../config/api'

interface userInformationInterface {
  biografy: string,
  email: string,
  imgURL: string,
  name: string,
  username: string
}

export default function MyPageByUsername() {
  const router = useRouter()
  const { username } = router.query

  const [user, setUser] = useState<userInformationInterface>({
    biografy: 'Minha biografia é esta',
    email: 'meuemail@mail.com',
    imgURL: '/img/teste.jpg',
    name: 'Meu nome',
    username: '@meuUsername'
  })
  const [totalOfRecipes, setTotalOfRecipes] = useState<number>(0)

  async function getUSerInformation() {
    await api.get(`/users/${username}`)
      .then(response => {
        const isNotHaveUserWithThisName = Object.keys(response.data).length <= 0

        if (isNotHaveUserWithThisName) {
          alert('Não existe usuário com esse username')
        } else {
          setUser(response.data.user)
          setTotalOfRecipes(response.data.totalOfRecipes)
        }
      })
      .catch(error => {
        alert('ocorreu um erro inexperado, recarregue a página!')
      })
  }

  useEffect(() => {
    if (!!username) {
      getUSerInformation()
    }
  }, [username])

  return (
    <Layout>
      <Head>
        <title>Perfil</title>
      </Head>

      <Header />

      <PageDescription title={`Página de ${user.name}`}/>

      <div className={styles.mainContainer}>
        <div className={styles.ApresentationContainer}>
          <div className={styles.ApresentationImgContainer}>
            <Image
              src={!!user.imgURL ? user.imgURL : '/img/teste.jpg'}
              width={270}
              height={270}
              className={styles.img}
            />
          </div>

          <div className={styles.TextApresentationContainer}>
            <h5 className={styles.TextApresentationTextTitle}>{user.name} receitas</h5>
            <p className={styles.TextApresentationTextContent}>@{user.username}</p>
          </div>
        </div>

        <div className={styles.informationContainer}>
          <h5 className={styles.informationTextTitle}>Bio:</h5>
          {/* <p className={styles.informationTextContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum porttitor diam et blandit. Suspendisse potenti. Aenean in fringilla metus, non dignissim lacus. Sed pretium odio ipsum, quis pulvinar mi blandit vitae. Aliquam erat volutpat. In non lacinia leo. Mauris rutrum, turpis non pharetra mattis, ligula nulla iaculis est, in condimentum erat metus hendrerit mauris.</p> */}
          <p className={styles.informationTextContent}>{user.biografy}</p>
        

          <div className={styles.cardsContainer}>
            <Card text={`${totalOfRecipes} receitas`}>
              <ReceiptIcon fontSize='large' color='action'/>
            </Card>

            <div></div>

            <Card 
              text='Ver receitas'
              onclick={() => router.push(`/recipes/public/${username}`)}
            >
              <FastfoodIcon fontSize='large' color='action'/>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}