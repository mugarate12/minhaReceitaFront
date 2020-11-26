import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'

import styles from './../styles/Header.module.css'

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
            <Button variant="contained" color="primary" size="medium" style={{marginTop: '15px'}} onClick={() => router.push('/authentication/login')}>
              Entrar
            </Button>

            <Button variant="contained" color="secondary" size="medium" style={{marginTop: '15px'}}>
              Cadastrar
            </Button>
          </div>)
        : (<></>)
      }
    </header>
  );
}