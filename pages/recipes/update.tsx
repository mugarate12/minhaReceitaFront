import { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import InputFile from './../../components/InputFile'
import Input from './../../components/Input'
import PreviousTextInformation from './../../components/PreviousTextInformation'
import TextField from './../../components/TextField'
import Button from './../../components/Button'

import styles from './../../styles/UpdateRecipe.module.css'

export default function UpdateRecipe() {
  // const [recipeImg, setRecipeImg] = useState<File>()
  const [recipeImg, setRecipeImg] =useState<string>('/img/teste.jpg')
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
              src={recipeImg}
              width={200}
              height={200}
              id='preview'
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

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={time > 0 ? 'valid' : ''}
            textDescription='40 min'
          />

          <div className={styles.inputNumberContainer}>
            <Input
              label='tempo da receita'
              state={time}
              setState={setTime}
              type='number'
              placeholder='40, 50, 60?'
              width='200px'
            />

            <p className={styles.inputNumberHelperText}>Min</p>
          </div>
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={number_of_portions > 0 ? 'valid' : ''}
            textDescription='10 porções'
          />

          <div className={styles.inputNumberContainer}>
            <Input
              label='número de porções'
              state={number_of_portions}
              setState={setNumber_of_portions}
              type='number'
              placeholder='5, 8, 12?'
              width='170px'
            />

            <p className={styles.inputNumberHelperText}>Porções</p>
          </div>
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={preparation_mode}
            textDescription={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem urna, scelerisque in eros at, tristique blandit magna. Mauris dictum sit amet diam sed pretium. Morbi quis rhoncus odio, eu lacinia magna. Vestibulum hendrerit tempus quam vel accumsan. Sed ornare lectus quis nisi suscipit ornare. Phasellus a dictum urna. Sed leo arcu, pulvinar non varius ut, eleifend ac leo. Sed dignissim faucibus interdum. Praesent tincidunt quam et diam facilisis, nec suscipit lorem maximus. Morbi orci mauris, rhoncus finibus tellus dapibus, maximus condimentum dui.

            Nulla vestibulum nisi vitae neque vulputate, non mattis ipsum ullamcorper. Aenean et enim placerat, luctus nunc at, dignissim sapien. Aliquam viverra enim purus, eget porttitor magna vulputate vitae. Morbi ullamcorper magna pellentesque bibendum fermentum. Proin non nunc risus. Curabitur elementum ipsum ac magna rutrum, non laoreet urna lobortis. Proin vitae tincidunt eros, ac euismod justo. Nam facilisis odio tempus nisl egestas interdum quis nec lorem. Aliquam erat volutpat.`}
          />

          <TextField
            label='Modo de preparo'
            state={preparation_mode}
            setState={setPreparation_mode}
          />
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={observations}
            textDescription={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem urna, scelerisque in eros at, tristique blandit magna. Mauris dictum sit amet diam sed pretium. Morbi quis rhoncus odio, eu lacinia magna. Vestibulum hendrerit tempus quam vel accumsan. Sed ornare lectus quis nisi suscipit ornare. Phasellus a dictum urna. Sed leo arcu, pulvinar non varius ut, eleifend ac leo. Sed dignissim faucibus interdum. Praesent tincidunt quam et diam facilisis, nec suscipit lorem maximus. Morbi orci mauris, rhoncus finibus tellus dapibus, maximus condimentum dui.

            Nulla vestibulum nisi vitae neque vulputate, non mattis ipsum ullamcorper. Aenean et enim placerat, luctus nunc at, dignissim sapien. Aliquam viverra enim purus, eget porttitor magna vulputate vitae. Morbi ullamcorper magna pellentesque bibendum fermentum. Proin non nunc risus. Curabitur elementum ipsum ac magna rutrum, non laoreet urna lobortis. Proin vitae tincidunt eros, ac euismod justo. Nam facilisis odio tempus nisl egestas interdum quis nec lorem. Aliquam erat volutpat.`}
          />

          <TextField
            label='Observações'
            state={observations}
            setState={setObservations}
          />
        </div>


        <Button
          backgroundColor='#d49898'
          width='250px'
          margin= {{
            marginTop: '15px'
          }}
        >Atualizar</Button>
      </div>
    </Layout>
  );
}