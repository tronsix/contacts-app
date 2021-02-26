import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from '../AppContext';
// Styles
import { makeStyles } from '@material-ui/core/styles';
// Custom Components
import Layout from '../components/Layout';
import CardActions from '../components/CardActions';
import TextField from '../components/TextField';
// Material Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// Utility Functions
import { formatPhone, validateEmail } from '../functions/utils';

const localJSS = makeStyles((theme) => ({
    backButton: {
        padding: '8px 16px',
    },
    backIcon: {
        marginRight: 12,
    },
 }));

let initialState = {
    initialRender: true,
    Contact: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
    },
    isValid: {},
};

export default function CreateEdit(props) {
    const history = useHistory();
    let { id } = useParams();
    const { appState, setAppState } = React.useContext(AppContext);
    const [state, setState] = React.useState(initialState);
    const Contacts = appState.Contacts;
    const lastContactId = appState.lastContactId;
    // styles
    const global = props.globalJSS;
    const local = localJSS();

    const handleBack = () => {
        history.push('/contacts');
    }

    const handleBlur = (e) => {
        let valid = true;

        // check for empty field
        if (e.target.value === ''){
            valid = false;
        }
        // validate values by input type
        switch (e.target.id) {
            case 'phone':
                valid = e.target.value.length >= 12;
                break;
            case 'email':
                valid = validateEmail(e.target.value);
                break;
            default:
                break;
        }
        setState({
            ...state, 
            isValid: {
                ...state.isValid,
                [e.target.id]: valid,
            }
        });
        
    }

    const handleChange = (e) => {
        let value;

        e.target.id === 'phone' 
            ? value = formatPhone(e.target.value)
            : value = e.target.value

        setState({
            ...state,
            Contact: {
                ...state.Contact,
                [e.target.id]: value
            },
            isValid: {
                ...state.isValid,
                [e.target.id]: true,
            }
        });
    }

    const validateForm = () => {
        const invalidObj = {};
        let valid = true;
        // check if values are empty
        for (const [key, value] of Object.entries(state.Contact)) {
            if (value === '') {
                // set valid to false to trigger error and helpertext
                invalidObj[key] = false;
                valid = false;
            }
        };
        // check that values are valid
        for (const [key, value] of Object.entries(state.isValid)) {
            if (key && value === false) {
                // set valid to false to maintain state
                invalidObj[key] = false;
                valid = false;
            }
        };
        setState({
            ...state,
            isValid: {
                ...invalidObj
            },
        });
        return valid;
    }

    const handleCancel = () => {
        setState({
            ...state,
            Contact: {
                ...initialState.Contact
            },
            isValid: {
                ...initialState.isValid
            }
        });
    }

    const handleSave = () => {
        const valid = validateForm();
        let updatedContacts;
        if (valid) {
            switch (id) {
                // creating a new contact
                case undefined:
                    state.Contact.id = lastContactId + 1;
                    updatedContacts = [
                        ...Contacts, 
                        state.Contact
                    ];
                    history.push('/contacts');
                    setAppState({Contacts: updatedContacts, lastContactId: state.Contact.id});
                    break;
                // editing an existing contact
                default:
                    updatedContacts = Contacts.map(contact =>
                        contact.id === state.Contact.id
                        ? state.Contact
                        : contact);
                    history.push('/contacts');
                    setAppState({...appState, Contacts: updatedContacts})
                    break;
            }
            return;
        }
        alert('Uh oh, there appears to be some invalid fields.');
    }

    React.useEffect(() => {
        if (state.initialRender === true ) {
            switch (id) {
                // creating a new contact
                case undefined:
                    setState({ ...state, initialRender: false });
                    break;
                // editing an existing contact
                default:
                    // if contact id is a valid id then set contact to respective contact from appstate
                    const isValidContact = Contacts.find(obj => obj.id === parseInt(id));
                    // reset initial state set contact to validated contact for handleCancel form reset
                    initialState = {...initialState, Contact: isValidContact};
                    // update state with validated contact
                    setState({ ...state, initialRender: false, Contact: isValidContact });
                    break;
            }
        }
    }, [state, Contacts, id, setState]);

    return(
        <>
        <Button className={`${global.button} ${local.backButton}`} onClick={handleBack}>
            <ArrowBackIcon className={local.backIcon}/>
            Back to Contacts
        </Button>
        <Layout title={props.title}>
            {state.Contact === undefined 
                ? <Typography variant="h2">No contact exist with this id.</Typography>
                : <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card className={global.contactCard} >
                        <CardContent className={global.cardContent}>
                            <TextField 
                                className={global.textField} 
                                error={state.isValid.firstname === false}
                                helperText={state.isValid.firstname === false && 'This field cannot be empty'}
                                id="firstname" 
                                label="First Name" 
                                onBlur={handleBlur}
                                onChange={handleChange} 
                                value={state.Contact.firstname} 
                                variant="outlined"
                            />
                            <TextField 
                                className={global.textField} 
                                error={state.isValid.lastname === false}
                                helperText={state.isValid.lastname === false && 'This field cannot be empty'}
                                id="lastname" label="Last Name" 
                                onBlur={handleBlur}
                                onChange={handleChange} 
                                value={state.Contact.lastname} 
                                variant="outlined"
                            />
                            <TextField 
                                id="phone" 
                                className={global.textField} 
                                error={state.isValid.phone === false}
                                helperText={state.isValid.phone === false && 'Invalid phone number'}
                                label="Phone" 
                                onBlur={handleBlur}
                                onChange={handleChange} 
                                type="text" 
                                inputProps={{ maxLength: 12 }}
                                value={formatPhone(state.Contact.phone)} 
                                variant="outlined" 
                            />
                            <TextField 
                            id="email" 
                            className={global.textField} 
                            error={state.isValid.email === false}
                            helperText={state.isValid.email === false && 'Invalid email'}
                            label="Email" 
                            onBlur={handleBlur}
                            onChange={handleChange} 
                            type="email" 
                            value={state.Contact.email} 
                            variant="outlined" 
                            />
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button className={global.button} onClick={handleCancel}>Cancel</Button>
                            <Button className={global.button} onClick={handleSave}>Save</Button>
                        </CardActions>
                    </Card>
                </Grid>
            }
        </Layout>
        </>
    )
}