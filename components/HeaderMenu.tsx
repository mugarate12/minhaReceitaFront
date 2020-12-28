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


export default function HeaderMenu() {
  const small = useMediaQuery('(min-width:500px)')
  const router = useRouter()
  const useStyles = makeStyles({
    paper: {
      backgroundColor: '#FEE6CD',
      width: small ? '30%' : '50%'
    }
  })
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
          
          <ListItemText>Criar receita</ListItemText>
        </ListItem>

        <ListItem 
          button={true}
          onClick={() => router.push('/recipes/recipes')}
        >
          <ListItemIcon>
            <LocalDiningIcon/>
          </ListItemIcon>
          
          <ListItemText>Ver receitas</ListItemText>
        </ListItem>
      </>
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
        </List>
      </Drawer>
    </IconButton>
  );
}