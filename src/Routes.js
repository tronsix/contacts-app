import React from 'react';
import { 
    Switch,
    Route,
    Redirect,
  } from 'react-router-dom';
import { Contacts, Edit, Create, NotFound } from './pages'

// Styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    addContactCard: {
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    button: {
        flexGrow: 1,
        borderRadius: 0,
        padding: '12px 0',
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

export default function Routes(props) {
    const globalJSS = useStyles();

    return (
        <Switch>
            <Redirect exact from="/" to="/contacts" />
            <Route path="/contacts" exact render={(props) => <Contacts {...props} globalJSS={globalJSS} title="Contacts" /> } />
            <Route path="/contacts/new" exact render={(props) => <Create {...props} globalJSS={globalJSS}title="Create New Contact" /> } />
            <Route path="/contacts/:id" exact render={(props) => <Edit {...props} globalJSS={globalJSS} title="Edit" /> } />
            <Route path="/not-found" exact render={(props) => <NotFound {...props} globalJSS={globalJSS} title="404" /> } />
            <Redirect from="*" to="/not-found" />
        </Switch>
    )
}

