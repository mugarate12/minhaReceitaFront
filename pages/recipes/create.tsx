import { useState } from 'react';
import Head from 'next/head'
import TextField from '@material-ui/core/TextField'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import PageDescription from './../../components/PageDescription'
import Input from './../../components/Input'

import Figure from './../../components/figure'

import styles from './../../styles/CreateRecipe.module.css'

export default function CreateRecipe() {
  const [title, setTitle] = useState<string>('')
  const [time, setTime] = useState<number>(0)
  const [number_of_portions, setNumber_of_portions] = useState<number>(0)
  const [preparation_mode, setPreparation_mode] = useState<string>('')
  const [observations, setObservations] = useState<string>('')

  return (
    <Layout>
      <Head>
        <title>Criar Receita</title>
      </Head>

      <Header renderMenu={true} />

      <PageDescription title='Criar receita' />

      <div className={styles.mainContainer}>
        <Figure  listOfStates={[title]}/>

        <Input state={title} setState={setTitle} label='titulo da receita' />
        
        <div className={styles.timeInputsContainer}>
          <Input 
            state={time} 
            setState={setTime} 
            label='tempo de preparo' 
            type='number' 
            width='170px'
          />
          <p className={styles.timeInputsText}>Min</p>
        </div>

        <div className={styles.timeInputsContainer}>
          <Input 
            state={number_of_portions} 
            setState={setNumber_of_portions} 
            label='Serve' 
            type='number' 
            width='149px'
          />
          <p className={styles.timeInputsText}>porções</p>
        </div>

        <TextField
          variant='outlined'
          label='Modo de preparo'
          multiline={true}
          rowsMax={6}
          style={{width: '208px', marginBottom: '10px'}}
          value={preparation_mode}
          onChange={(e) => setPreparation_mode(e.target.value)}
        />

        <TextField
          variant='outlined'
          label='Observações'
          multiline={true}
          rowsMax={6}
          style={{width: '208px'}}
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        />
      </div>
    </Layout>
  )
}