import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    element: {
        padding: theme.spacing(1),
        textAlign: 'center',
    },
}));


const Input = (props) => {
    const classes = useStyles();
    return  (
        <TextField className={classes.element} {...props} />
    );
}

export default Input;