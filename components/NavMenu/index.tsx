import { useRouter } from 'next/router'

import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast'
import LocalDiningIcon from '@material-ui/icons/LocalDining'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import styles from './NavMenu.module.css'

export default function NavMenu() {
  const router = useRouter()

  return (
    <nav className={styles.nav}>
      <a 
        className={styles.option}
        onClick={() => router.push('/recipes/create')}
      >
        <FreeBreakfastIcon 
          color='action'
          style={{marginRight: '15px'}}
        />
        <p className={styles.optionText}>Criar receita</p>
      </a>
      
      <a 
        className={styles.option}
        onClick={() => router.push('/recipes/recipes')}
      >
        <LocalDiningIcon 
          color='action'
          style={{marginRight: '15px'}}
        />
        <p className={styles.optionText}>Ver receita</p>
      </a>

      <a 
        className={styles.option}
        onClick={() => router.push('/users/mypage')}
      >
        <PersonIcon 
          color='action'
          style={{marginRight: '15px'}}
        />
        <p className={styles.optionText}>Meus Dados</p>
      </a>

      <a 
        className={styles.option}
        onClick={() => router.push('/users/changePassword')}
      >
        <LockIcon 
          color='action'
          style={{marginRight: '15px'}}
        />
        <p className={styles.optionText}>Alterar senha</p>
      </a>

      <a 
        className={styles.option}
        onClick={() => {
          sessionStorage.removeItem('token')
          router.push('/')
        }}
      >
        <ExitToAppIcon 
          color='action'
          style={{marginRight: '15px'}}
        />
        <p className={styles.optionText}>Sair</p>
      </a>
    </nav>
  );
}