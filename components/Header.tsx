import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './../styles/Header.module.css'
import CustomButton from './Button'

type Props = {
  isHomePage?: boolean;
}

export default function Header({ isHomePage }: Props) {
  const router = useRouter()
  
  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <a >
          <img src="/recipe.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </Link>

      {
        isHomePage ?
          (<div className={styles.btnContainer}>
            <CustomButton
              backgroundColor="#FDDADA"
              onclick={() => router.push('/authentication/login')}
              margin={{ marginRight: '10px' }}
            >
              Entrar
            </CustomButton>

            <CustomButton
              backgroundColor='rgba(232, 197, 229, 90%)'
              onclick={() => router.push('/authentication/login')}
            >
              Cadastrar-se
            </CustomButton>
          </div>)
        : (<></>)
      }
    </header>
  );
}