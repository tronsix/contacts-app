import React from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from '../AppContext';
// Custom Components
import Layout from '../components/Layout';
import CardActions from '../components/CardActions';
import TextField from '../components/TextField';
// Material Components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
// Utility Functions
import { formatPhone, validateEmail } from '../functions/utils';

const initialState = {
    Contact: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
    },
    Error: {
        phone: true,
        email: true,
    },
};

export default function Create(props) {
    const history = useHistory();
    const { appState, setAppState } = React.useContext(AppContext);
    const [state, setState] = React.useState(initialState);
    const Contacts = appState.Contacts;
    const lastContactId = appState.lastContactId;
    // styles
    const global = props.globalJSS;

    const handleChange = (e) => {
        switch (e.target.id) {
            case 'phone':
                setState({ 
                    ...state, 
                    Contact: { 
                        ...state.Contact, 
                        [e.target.id]: formatPhone(e.target.value) 
                    }, 
                    Error: {
                        ...state.Error,
                        [e.target.id]: e.target.value.length < 12
                    } 
                });
                break;
            case 'email':
                setState({ 
                    ...state, 
                    Contact: { 
                        ...state.Contact, 
                        [e.target.id]: e.target.value 
                    }, 
                    Error: {
                        ...state.Error,
                        [e.target.id]: validateEmail(e.target.value) 
                    } 
                });
            break;
            default:
                setState({ 
                    ...state, 
                    Contact: { 
                        ...state.Contact, 
                        [e.target.id]: e.target.value 
                    }
                });
                break;
        }
    }

    const validateForm = () => {
        let valid = true;
        for (const [key, value] of Object.entries(state.Error)) {
            if (value === true) {
                valid = false;
            }
        };
        return valid;
    }

    const handleSave = () => {
        const valid = validateForm();
        if (valid) {
            state.Contact.id = lastContactId + 1;
            let updatedContacts = [
                ...Contacts, 
                state.Contact
            ];
            history.push('/contacts');
            setAppState({Contacts: updatedContacts, lastContactId: state.Contact.id});
            return;
        }
        alert('Uh oh, there appears to be some invalid fields.');
    }

    return(
        <Layout title={props.title}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={global.contactCard} >
                    <CardContent className={global.cardContent}>
                        <TextField 
                            className={global.textField} 
                            id="firstname" 
                            label="First Name" 
                            onChange={handleChange} 
                            value={state.Contact.firstname} 
                            variant="outlined"
                        />
                        <TextField 
                            className={global.textField} 
                            id="lastname" label="Last Name" 
                            onChange={handleChange} 
                            value={state.Contact.lastname} 
                            variant="outlined"
                        />
                        <TextField 
                            id="phone" 
                            className={global.textField} 
                            error={state.Contact.phone.length < 12}
                            helperText={state.Contact.phone.length < 12 && 'Invalid phone number'}
                            label="Phone" 
                            onChange={handleChange} 
                            type="text" 
                            inputProps={{ maxLength: 12 }}
                            value={formatPhone(state.Contact.phone)} 
                            variant="outlined" 
                        />
                        <TextField 
                           id="email" 
                           className={global.textField} 
                           error={validateEmail(state.Contact.email)}
                           helperText={validateEmail(state.Contact.email) && 'Invalid email'}
                           label="Email" onChange={handleChange} 
                           type="email" 
                           value={state.Contact.email} 
                           variant="outlined" 
                        />
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button className={global.button} onClick={handleSave}>Save</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Layout>
    )
}