// Global Styling
import { makeStyles } from '@material-ui/core/styles';

export const globalStyles = makeStyles((theme) => ({
    addContactCard: {
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    button: {
        flexGrow: 1,
        borderRadius: 0,
        padding: '12px 16px',
        color: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    cardContent: {
        display: 'flex', 
        flexFlow: 'column', 
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    contactCard: {
        minWidth: 240,
        minHeight: 164,
        display: 'flex',
        flexFlow: 'column',
        borderRadius: 2,
    },
    textField: {
        margin: '12px 0'
    },
}));