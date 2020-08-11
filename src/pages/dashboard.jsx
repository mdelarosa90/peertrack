import React from 'react';
import ProjectItem from '../components/ProjectItems';
import { makeStyles } from '@material-ui/core/styles';

const projects = require('./projects-test.json');


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        padding: 5,
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));


const Dashboard = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {projects.map(proj => {
                return (
                    <ProjectItem item={proj} key={`project-${proj.id}`} />
                )
            })}
        </div>

    )
}

export default Dashboard;