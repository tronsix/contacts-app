import React from 'react';
// Custom Components
import Layout from '../components/Layout';
//MaterialComponets
import Typography from '@material-ui/core/Typography';

export default function Component(props) {
    return(
        <Layout title={props.title} >
            <Typography variant="h2">This is not the page that you are looking for.</Typography>
        </Layout>
    )
}