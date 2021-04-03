import Link from 'next/link'
import { useRouter } from 'next/router'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import {
  Button as CustomButton,
  HeaderMenu,
  NavMenu
} from './../../components'

// import CustomButton from './Button'
// import HeaderMenu from './HeaderMenu'
// import NavMenu from './NavMenu'

import styles from './Header.module.css'     

type Props = {
  isHomePage?: boolean;
  renderMenu?: boolean;
}

export default function Header({ isHomePage, renderMenu }: Props) {
  const router = useRouter()

  const bigWidth = useMediaQuery('(max-width:1000px)')

  function homePageOptions() {
    if(isHomePage) {
      return (
        <div className={styles.btnContainer}>
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
      )
    }
  }

  function Menu() {
    if (!isHomePage && renderMenu) {
      if (bigWidth) {
        return (
          <HeaderMenu />
        )  
      } else {
        return (
          <NavMenu />
        )
      }
      
    }
  }

  function goToHomePage() {
    const token = sessionStorage.getItem('token')

    if (!!token) {
      router.push('/recipes/recipes')
    } else {
      router.push('/')
    }
  }
  
  return (
    <header className={styles.headerContainer}>
      <a 
        onClick={() => goToHomePage()}
      >
        <img src="/recipe.svg" alt="Vercel Logo" className={styles.logo} />
      </a>


      {homePageOptions()}
      {Menu()}
    </header>
  );
}