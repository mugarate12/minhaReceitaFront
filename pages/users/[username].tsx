import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import Card from './../../components/CardMyPage'

import ReceiptIcon from '@material-ui/icons/Receipt'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import EditIcon from '@material-ui/icons/Edit'


import styles from './../../styles/MyPage.module.css'

import api from './../../config/api'

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

  async function getUSerInformation() {
    console.log(username)

    await api.get(`/users/${username}`)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        alert('ocorreu um erro inexperado, recarregue a página!')
      })
  }

  useEffect(() => {
    getUSerInformation()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Página de {user.name}</title>
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
            <Card text='X receitas'>
              <ReceiptIcon fontSize='large' color='action'/>
            </Card>

            <div></div>

            <Card text='Ver receitas'>
              <FastfoodIcon fontSize='large' color='action'/>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}