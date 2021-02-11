import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast'
import LocalDiningIcon from '@material-ui/icons/LocalDining'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import styles from './../styles/HeaderMenu.module.css'

export default function HeaderMenu() {
  const small = useMediaQuery('(min-width:500px)')
  const useStyles = makeStyles({
    paper: {
      backgroundColor: '#FEE6CD',
      width: small ? '30%' : '50%'
    }
  })
  const router = useRouter()
  const classes = useStyles()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  

  function recipesOptions() {
    return (
      <>
        <ListItem  
          button={true}
          onClick={() => router.push('/recipes/create')}
        >
          <ListItemIcon>
            <FreeBreakfastIcon/>
          </ListItemIcon>
          
          <ListItemText><span className={styles.menuItemText}>Criar Receita</span></ListItemText>
        </ListItem>

        <ListItem 
          button={true}
          onClick={() => router.push('/recipes/recipes')}
        >
          <ListItemIcon>
            <LocalDiningIcon/>
          </ListItemIcon>
          
          <ListItemText ><span className={styles.menuItemText}>Ver receitas</span></ListItemText>
        </ListItem>
        
        <Divider />
      </>
    )
  }

  function userOptions() {
    return (
      <>
        <ListItem  
          button={true}
          onClick={() => router.push('/users/mypage')}
        >
          <ListItemIcon>
            <PersonIcon/>
          </ListItemIcon>
          
          <ListItemText><span className={styles.menuItemText}>Meus Dados</span></ListItemText>
        </ListItem>
        
        <ListItem  
          button={true}
          onClick={() => router.push('/users/changePassword')}
        >
          <ListItemIcon>
            <LockIcon/>
          </ListItemIcon>
          
          <ListItemText><span className={styles.menuItemText}>Alterar senha</span></ListItemText>
        </ListItem>

        <Divider />
      </>
    )
  }

  function logoutOptions() {
    return (
      <ListItem  
        button={true}
        onClick={() => {
          sessionStorage.removeItem('token')
          router.push('/')
        }}
      >
        <ListItemIcon>
          <ExitToAppIcon/>
        </ListItemIcon>
        
        <ListItemText><span className={styles.menuItemText}>Sair</span></ListItemText>
      </ListItem>
    )
  }

  return (
    <IconButton aria-label='Menu' onClick={() => setOpenMenu(!openMenu)} >
      <MenuIcon fontSize='large' />
      <Drawer 
        anchor='right' 
        open={openMenu}
        classes={{
          paper: classes.paper
        }}
      >
        <List>
          {recipesOptions()}
          {userOptions()}
          {logoutOptions()}
        </List>
      </Drawer>
    </IconButton>
  );
}