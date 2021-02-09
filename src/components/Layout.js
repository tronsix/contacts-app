import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    root: {
        height: window.innerHeight,
        backgroundColor: '#f6f6f8',
        padding: '56px 60px'
    },
    title: {
        marginBottom: 40,
    },
}));

export default function Layout(props) {
    const bgCover = React.useRef(null);
    const classes = useStyles();

    const resizeContent = () => {
        let wh = window.innerHeight;
          bgCover.current.style.minHeight = `${wh}px`;
      }
      window.onresize = resizeContent;

    return (
        <div className={classes.root} ref={bgCover} >
            <Typography className={classes.title} variant="h1">{props.title}</Typography>
            {props.children}
        </div>
    );
}