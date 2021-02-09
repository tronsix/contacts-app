import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../AppContext';
// Styling
import { makeStyles } from '@material-ui/core/styles';
// Custom Components
import Layout from '../components/Layout';
import CreateContactCard from '../components/CreateContactCard';
import CardActions from '../components/CardActions';
// Material Components
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
// Material Icons
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
// Utility Functions
import { formatPhone } from '../functions/utils';

const localJSS = makeStyles((theme) => ({
    deleteContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        height: 0,
    },
    deleteButton: {
        color: theme.palette.error.dark,
        '&:hover': {
            backgroundColor: theme.palette.error.light,
        },
        height: 48,
        width: 48,
    },
 }));

const initialState = {
    open: false,
    showEmail: [],
    id: null,
};


export default function Contacts(props) {
    const history = useHistory();
    const { appState, setAppState } = React.useContext(AppContext);
    const [state, setState] = React.useState(initialState);
    const Contacts = appState.Contacts;
    // class styles
    const global = props.globalJSS;
    const local = localJSS();
    
    const closeDialog = () => {
        setState({ ...state, open: false, id: null });
    };

    const displayContact = (id) => {
        const contact = Contacts.find(i =>
            i.id === id);
        const fullname = `${contact.firstname} ${contact.lastname}`;
        return fullname;
    }

    const deleteContact = (id) => {
        const updatedContacts = Contacts.filter(contact =>
            contact.id !== id);
            setAppState({...appState, Contacts: updatedContacts});
            closeDialog();
    };

    const isEmailVisible = (id) => {
        const isEmailVisible = state.showEmail.includes(id);
        return isEmailVisible;
    }

    const viewContact = (id) => {
        if (isEmailVisible(id)) {
            let showEmail = state.showEmail.filter(i => i !== id);
            setState({ ...state, showEmail });
            return;
        } 
        state.showEmail.push(id);
        setState({ ...state, showEmail: state.showEmail });
    };

    const editContact = (Contact) => {
        history.push(`/contacts/${Contact.id}`);
    };

    const openDialog = (id) => {
        setState({ ...state, open: true, id });
    };

    return(
        <Layout title={props.title}>
            <Dialog onClose={closeDialog} open={state.open} style={{ bottom: 'inherit', top: 120,}} > 
                <DialogTitle style={{textAlign: 'center', padding: '8px 24px'}}>Contacts</DialogTitle>
                <Divider />
                <DialogContent style={{textAlign: 'center', padding: '24px 24px'}}>
                    <Typography variant="h2">Are you sure you want to delete {state.id && displayContact(state.id)}?</Typography>
                </DialogContent>
                <CardActions>
                    <Button className={local.deleteButton} style={{flexGrow: 1}} onClick={() => deleteContact(state.id)}>Delete</Button>
                </CardActions>
            </Dialog>
            <Grid container spacing={4}>
                <CreateContactCard classes={global} />
                {Contacts.map((Contact) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={Contact.id}>
                        <Card className={global.contactCard}>
                            <div className={local.deleteContainer}>
                                <IconButton aria-label="delete" className={local.deleteButton} onClick={() => openDialog(Contact.id)}>
                                    <DeleteForeverOutlinedIcon />
                                </IconButton>
                            </div>
                            <CardContent aria-label={`${Contact.firstname} ${Contact.lastname}`} className={global.cardContent} >
                                <Typography variant="h2" >{Contact.firstname} {Contact.lastname}</Typography>
                                <Typography variant="body1">{formatPhone(Contact.phone)}</Typography>
                                {isEmailVisible(Contact.id) && <Typography variant="body1">{Contact.email}</Typography>}
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button className={global.button} onClick={() => viewContact(Contact.id)}>
                                    {isEmailVisible(Contact.id) ? 'Hide': 'View'}
                                </Button>
                                <Button className={global.button} onClick={() => editContact(Contact)}>Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    )
}