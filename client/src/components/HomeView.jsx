import React from 'react';

import Container from '@material-ui/core/Container'

const HomeView = () => {
    return (
        <Container>
            <p>Welcome to the home page!</p>
            <p>Here's a cat for your troubles:</p>
            <img src='https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_960_720.jpg' alt='Sitting Cat' style={{ height: 300 }}></img>
        </Container>
    )
}
export default HomeView