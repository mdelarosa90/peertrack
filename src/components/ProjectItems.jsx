import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ScheduleIcon from '@material-ui/icons/Schedule';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
dayjs.locale('es');
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)



const useStyles = makeStyles((theme) => ({
  root: {
    width: 340,
    maxWidth: 345,
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    maxHeight: 345,
    height: 150,
    textAlign: "justify"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  timeText: {
    fontSize: '15px'
  }
}));

const ProjectItems = ({item, props}) => {
    const classes = useStyles();
    const dateUpdate = dayjs(item.expirationTime).fromNow()
    
  
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {item.name.substr(0, 1)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={item.name}
          subheader="September 14, 2016"
        />
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
          <LinearProgressWithLabel value={item.progress} />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton className={classes.timeText} color="primary" aria-label="add to favorites">
            <ScheduleIcon />
            {dateUpdate}
          </IconButton>
        </CardActions>
      </Card>
    );
}

export default ProjectItems;

function LinearProgressWithLabel(props) {
  const colorBar = useMemo(() => {
    let color = 'primary';
    if (props.value < 40) {
      color = "secondary"
    }
    return color
  }
  ,[props])
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress color={colorBar} variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

