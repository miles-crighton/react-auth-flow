import React from 'react';

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'white',
        position: 'relative',
        top: '100px',
        padding: '20px',
        borderRadius: '10px'
    }
}));

const HomeView = () => {
    const classes = useStyles();
    return (
        <Container className={classes.container} maxWidth='sm' component="main">
            <p>Welcome to the home page!</p>
            <p>Here's a cat for your troubles:</p>
            <img src='https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_960_720.jpg' alt='Sitting Cat' style={{ height: 300 }}></img>
        </Container>
    )
}
export default HomeView