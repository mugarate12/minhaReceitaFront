import { useState } from 'react'

import Head from 'next/head'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import InputFile from './../../components/InputFile'
import Input from './../../components/Input'
import PreviousTextInformation from './../../components/PreviousTextInformation'
import TextField from './../../components/TextField'
import Button from './../../components/Button'
import Image from './../../components/Image'

import styles from './../../styles/UpdateRecipe.module.css'

export default function UpdateMyUSer() {
  const [userImg, setUserImg] = useState<File>()
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [biografy, setBiografy] = useState<string>('')

  return (
    <Layout>
      <Head>
        <title>Atualizar perfil</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Atualizar perfil'/>

      <div className={styles.mainContainer}>
        <div className={styles.updateFieldContainer}>
          <div className={styles.imgContainer}>
            <Image 
              src={!!userImg ? URL.createObjectURL(userImg) : '/img/teste.jpg'}
              alt='imagem do usuário'
            />
          </div>

          <InputFile
            setState={setUserImg}
            defaultDisplayText='selecione uma foto de perfil'
          />
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={name}
            textDescription='Meu nome'
          />

          <Input
            label='titulo da receita'
            state={name}
            setState={setName}
            placeholder='Novo titulo'
            width='250px'
          />
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={username}
            textDescription='@meuusername'
          />

          <Input
            label='titulo da receita'
            state={username}
            setState={setUsername}
            placeholder='Novo titulo'
            width='250px'
          />
        </div>
        
        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={email}
            textDescription='Meu email'
          />

          <Input
            label='titulo da receita'
            state={email}
            setState={setEmail}
            placeholder='Novo titulo'
            width='250px'
          />
        </div>

        <div className={styles.updateFieldContainer}>
          <PreviousTextInformation
            state={biografy}
            textDescription={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem urna, scelerisque in eros at, tristique blandit magna. Mauris dictum sit amet diam sed pretium. Morbi quis rhoncus odio, eu lacinia magna. Vestibulum hendrerit tempus quam vel accumsan. Sed ornare lectus quis nisi suscipit ornare. Phasellus a dictum urna. Sed leo arcu, pulvinar non varius ut, eleifend ac leo. Sed dignissim faucibus interdum. Praesent tincidunt quam et diam facilisis, nec suscipit lorem maximus. Morbi orci mauris, rhoncus finibus tellus dapibus, maximus condimentum dui.

            Nulla vestibulum nisi vitae neque vulputate, non mattis ipsum ullamcorper. Aenean et enim placerat, luctus nunc at, dignissim sapien. Aliquam viverra enim purus, eget porttitor magna vulputate vitae. Morbi ullamcorper magna pellentesque bibendum fermentum. Proin non nunc risus. Curabitur elementum ipsum ac magna rutrum, non laoreet urna lobortis. Proin vitae tincidunt eros, ac euismod justo. Nam facilisis odio tempus nisl egestas interdum quis nec lorem. Aliquam erat volutpat.`}
          />

          <TextField
            label='Modo de preparo'
            state={biografy}
            setState={setBiografy}
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
  )
}