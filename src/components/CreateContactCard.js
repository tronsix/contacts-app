import React from 'react';
import { Link } from 'react-router-dom';
// Material Components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography';
// Material Icons
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

export default function CreateContactCard(props) {
    const classes = props.classes;
    return(
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to="/contacts/new" style={{textDecoration: 'none'}} >
                <Card className={`${classes.contactCard} ${classes.addContactCard}`} >
                    <CardContent aria-label="Create Contact" className={classes.cardContent} role="button">
                        <Icon style={{ margin: 12 }}>
                            <AddOutlinedIcon />
                        </Icon>
                        <Typography variant="h2">Create new contact</Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
}