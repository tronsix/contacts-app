import React from 'react';
import { 
    Switch,
    Route,
    Redirect,
  } from 'react-router-dom';
import { Contacts, CreateEdit, NotFound } from './pages'

// Styling
import { globalStyles } from './Styles';

export default function Routes(props) {
    const globalJSS = globalStyles();

    return (
        <Switch>
            <Redirect exact from="/" to="/contacts" />
            <Route path="/contacts" exact render={(props) => <Contacts {...props} globalJSS={globalJSS} title="Contacts" /> } />
            <Route path="/contacts/new" exact render={(props) => <CreateEdit {...props} globalJSS={globalJSS} title="Create New Contact" /> } />
            <Route path="/contacts/:id" exact render={(props) => <CreateEdit {...props} globalJSS={globalJSS} title="Edit" /> } />
            <Route path="/not-found" exact render={(props) => <NotFound {...props} globalJSS={globalJSS} title="404" /> } />
            <Redirect from="*" to="/not-found" />
        </Switch>
    )
}

