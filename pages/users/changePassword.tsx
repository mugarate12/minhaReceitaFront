import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Layout from './../../components/Layout'
import PageDescription from './../../components/PageDescription'
import Header from './../../components/Header'
import Input from './../../components/Input'
import Button from './../../components/Button'

import styles from './../../styles/ChangePassword.module.css'

import api from './../../config/api'

export default function ChangePassword() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')

  async function changePasswordOfUser() {
    const isFieldsNotEmpty = !!email && !!currentPassword && !!newPassword && !!confirmNewPassword
    const token = sessionStorage.getItem('token')

    if (isFieldsNotEmpty) {
      await api.post('/session', {
        email: email,
        password: currentPassword
      })
        .then(async (response) => {
          const newPasswordAndConfirmationIsSame = newPassword === confirmNewPassword
          if (newPasswordAndConfirmationIsSame) {
            await api.put('/users', {
              password: newPassword
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
              .then(response => {
                alert('Senha alterada com sucesso!')

                sessionStorage.removeItem('token')
                router.push('/authorization/login')
              })
              .catch(error => {
                alert('ocorreu um erro inexperado, por favor, tente novamente')
              })
          } else {
            alert('A senha e sua confirmação não são iguais')
          }
        })
        .catch(error => {
          alert('Verifique seus dados atuais, por favor!')
        })
    }
  }

  return (
    <Layout>
      <Head>
        <title>Mudar senha</title>
      </Head>

      <PageDescription title='Mudar senha' />

      <Header renderMenu={true} />

      <form className={styles.mainContainer}>
        <Input label='email' width='260px' state={email} placeholder='seu email' setState={setEmail}/>
        <Input label='senha atual' width='260px' state={currentPassword} placeholder='sua senha atual' setState={setCurrentPassword} type='password'/>
        <Input label='nova senha' width='260px' state={newPassword} placeholder='sua nova senha' setState={setNewPassword} type='password'/>
        <Input label='confirmar nova senha' width='260px' state={confirmNewPassword} placeholder='confirme sua senha' setState={setConfirmNewPassword} type='password'/>
      
        <Button
          backgroundColor='#d49898'
          margin={{ marginTop: '30px', marginBottom: '60px' }}
          width='260px'
          onclick={() => changePasswordOfUser()}
        >
          Atualizar
        </Button>
      </form>
    </Layout>
  )
}