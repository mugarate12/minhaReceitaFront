import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './../styles/Header.module.css'
import CustomButton from './Button'
import HeaderMenu from './HeaderMenu'

type Props = {
  isHomePage?: boolean;
  renderMenu?: boolean;
}

export default function Header({ isHomePage, renderMenu }: Props) {
  const router = useRouter()

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
      return (
        <HeaderMenu />
      )
    }
  }
  
  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <a >
          <img src="/recipe.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </Link>

      {homePageOptions()}
      {Menu()}
    </header>
  );
}