import React from 'react';
import ProjectItem from '../components/ProjectItems';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

const projects = require('./projects-test.json');


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 10,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
        padding: 5,
        maxHeight: 560,
        '&::-webkit-scrollbar': {
            width: '0.4em'
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
          }
    },
    gridList: {
        width: 500,
        height: 450,
    },
    fabButton: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 10,
        right: 10,
    },
    alertClass: {
        justifyContent: 'center'
    }
}));


const Dashboard = () => {
    const classes = useStyles();
    return (
        <div>
            <Alert className={classes.alertClass} severity="info">Let's get started!</Alert>
            <div className={classes.root}>
                {projects.map(proj => {
                    return (
                        <ProjectItem item={proj} key={`project-${proj.id}`} />
                    )
                })}
            <div className={classes.fabButton}>
                <Fab color="primary" aria-label="add" href="/projectsform">
                    <AddIcon />
                </Fab>
            </div>
            </div>
        </div>

    )
}

export default Dashboard;