import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'

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

export default function MyPage() {
  const router = useRouter()

  const [user, setUser] = useState<userInformationInterface>({
    biografy: 'Minha biografia é esta',
    email: 'meuemail@mail.com',
    imgURL: '/img/teste.jpg',
    name: 'Meu nome',
    username: '@meuUsername'
  })

  async function getUSerInformation() {
    const token = sessionStorage.getItem('token')

    await api.get('/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        setUser(response.data.user)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // useEffect(() => {
  //   getUSerInformation()
  // }, [])

  return (
    <Layout>
      <Head>
        <title>Sua página</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Sua página'/>

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
            <div className={styles.card}>
              <div className={styles.cardIconContainer}>
                <ReceiptIcon fontSize='large' color='action'/>
              </div>

              <p className={styles.cardText}>X receitas</p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIconContainer}>
                <FastfoodIcon fontSize='large' color='action'/>
              </div>

              <p className={styles.cardText}>Ver receitas</p>
            </div>
            
            <div 
              className={styles.card}
              onClick={() => router.push('/users/updateMyUser')}
            >
              <div className={styles.cardIconContainer}>
                <EditIcon fontSize='large' color='action'/>
              </div>

              <p className={styles.cardText}>Editar perfil</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}