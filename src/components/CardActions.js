import React from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
// Material Components
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles({
    root: {
         justifyContent: 'space-evenly',
         padding: 0,
    },
    spacing: {
        '& > :not(:first-child)': {
             marginLeft: 0,
         }
    },
 }, { name: 'MuiCardActions' });

export default function Component(props) {
    const classes = useStyles();

    return (
        <CardActions classes={{root: classes.cardActions, spacing: classes.spacing}}>
            {props.children}
        </CardActions>
    )
}

