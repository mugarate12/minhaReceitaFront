import { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import InputFile from './../../components/InputFile'
import Input from './../../components/Input'
import PreviousTextInformation from './../../components/PreviousTextInformation'

import styles from './../../styles/UpdateRecipe.module.css'

export default function UpdateRecipe() {
  const [recipeImg, setRecipeImg] = useState<File>()
  const [title, setTitle] = useState<string>('')
  const [time, setTime] = useState<number>(0)
  const [number_of_portions, setNumber_of_portions] = useState<number>(0)
  const [preparation_mode, setPreparation_mode] = useState<string>('')
  const [observations, setObservations] = useState<string>('')

  return (
    <Layout>
      <Head>
        <title>Editar Receita</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Editar Receita'/>

      <div className={styles.mainContainer}>
        <div className={styles.updateFieldContainer}>
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              src='/img/teste.jpg'
              width={200}
              height={200}
            />
          </div>

          <InputFile
            setState={setRecipeImg}
          />
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={title}
            textDescription='Titulo da receita'
          />

          <Input
            label='titulo da receita'
            state={title}
            setState={setTitle}
            placeholder='Novo titulo'
            width='250px'
          />
        </div>

      </div>
    </Layout>
  );
}