import { SetStateAction, Dispatch } from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

type Props = {
  numberOfPages?: number,
  actualPage?: number,
  setActualPage?: Dispatch<SetStateAction<number>>
}

export default function Pagination({ numberOfPages, actualPage, setActualPage }: Props) {
  const desktopWidth = useMediaQuery('(min-width:900px)')
  const useStyles = makeStyles((theme) => ({
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: desktopWidth ? 'flex-end' : 'center',
      paddingRight: desktopWidth ? '20px' : '0px',
      marginTop: '100px',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    btn: {
      backgroundColor: 'rgba(255, 191, 183, 0.6)',
      width: '20px',
      paddingLeft: '2px',
      paddingRight: '2px'
    }
  }))

  const classes = useStyles()

  function renderButtons() {
    let arrayButtons = []
    arrayButtons.length = numberOfPages
    arrayButtons.fill(0)

    return arrayButtons.map((value, index) => {
      const maxOfViewPages = numberOfPages > 4
      const activePage = (index + 1) === actualPage
      const onePageBeforeActivePage = (index + 1) === (actualPage - 1)
      const pageAfterActivePage = (index + 1) > actualPage && (index + 1) <= (actualPage + 2) 

      if (maxOfViewPages) {
        if (onePageBeforeActivePage) {
          return <Button
            key={index}
            variant="contained" 
            className={classes.btn}
            onClick={() => setActualPage(index + 1)}
          >{index + 1}</Button>
        } else if (activePage) {
          return <Button 
            key={index}
            variant="contained" 
            className={classes.btn}
            style={{
              backgroundColor: '#d49898'
            }}
            >{index + 1}</Button>
        } else if (pageAfterActivePage) {
          return <Button
            key={index}
            variant="contained" 
            className={classes.btn}
            onClick={() => setActualPage(index + 1)}
          >{index + 1}</Button>
        }
      } else {
        if (activePage) {
          return <Button 
            key={index}
            variant="contained" 
            className={classes.btn}
            style={{
              backgroundColor: '#d49898'
            }}
            >{index + 1}</Button>
        } else {
          return <Button
            key={index}
            variant="contained" 
            className={classes.btn}
            onClick={() => setActualPage(index + 1)}
          >{index + 1}</Button>
        }
      }
    })
    
  }

  return (
    <div className={classes.container}>
      <Button variant="contained" className={classes.btn}>{'<'}</Button>
      {/* <Button variant="contained" className={classes.btn}>1</Button>
      <Button variant="contained" className={classes.btn}>2</Button>
      <Button variant="contained" className={classes.btn}>3</Button> */}
      {renderButtons()}
      <Button variant="contained" className={classes.btn}>...</Button>
      <Button variant="contained" className={classes.btn}>{'>'}</Button>
    </div>
  )
}