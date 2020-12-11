import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import RoomServiceIcon from '@material-ui/icons/RoomService'
import TimerIcon from '@material-ui/icons/Timer'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '500px',
    height: '150px',
    backgroundColor: '#E8CFE8'
  },
  img: {
    width: '30%'
  },
  content: {
    width: '70%'
  },
  title: {
    textAlign: 'center',
    fontSize: '16px'
  },
  recipeInformationContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recipeInformation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}))

export default function CardRecipe() {
  const classes = useStyles()

  return (
    <Card variant='elevation' className={classes.root}>
      <CardMedia
        className={classes.img}
        image='/img/teste.jpg'
        title='Imagem da receita'
      />
      
      <CardContent className={classes.content} >
        <Typography className={classes.title} component='h5' variant='h5'>Titulo da receita</Typography>
        
        <div className={classes.recipeInformationContent}>
          <div className={classes.recipeInformation}>
            <Typography variant="subtitle1" color="textSecondary" style={{ marginRight: '5px' }}>serve 4 porções</Typography>
            <RoomServiceIcon fontSize='small' />
          </div>

          <div className={classes.recipeInformation}>
            <Typography variant="subtitle1" color="textSecondary">30 min</Typography>
            <TimerIcon fontSize='small' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}