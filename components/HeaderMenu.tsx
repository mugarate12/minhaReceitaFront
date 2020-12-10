import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles({
  paper: {
    backgroundColor: '#FEE6CD',
    width: '50%'
  }
})

export default function HeaderMenu() {
  const classes = useStyles()
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  return (
    <IconButton aria-label='Menu' onClick={() => setOpenMenu(!openMenu)} >
      <MenuIcon fontSize='large' />
      <Drawer anchor='right' open={openMenu} 
        classes={{
          paper: classes.paper
        }}
      >
        <p>sou uma opção de teste</p>
        <p>sou uma opção de teste</p>
        <p>sou uma opção de teste</p>
        <p>sou uma opção de teste</p>
      </Drawer>
    </IconButton>
  );
}