import React from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
// Material Components
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 2,
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderBottom: `2px solid ${theme.palette.primary.main}`,

        },
    },
    notchedOutline: {
        '&hover': {
            borderColor: theme.palette.primary.main,
        },
    },
 }), { name: 'MuiOutlinedInput' });

export default function Component(props) {
    const { className, error, id, helperText, inputProps, label, onBlur, onChange, type, value, } = props;
    //styles
    const classes = useStyles();

    return (
        <TextField  
            aria-label={label}
            className={className}
            error={error}
            fullWidth
            helperText={helperText}
            id={id}
            inputProps={inputProps}
            InputProps={{
                classes:{root: classes.root, notchedOutline: classes.notchedOutline}
            }}
            label={label} 
            onBlur={onBlur}
            onChange={onChange} 
            type={type}
            value={value} 
            variant="outlined" 
        />
    )
}
