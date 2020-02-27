import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {
    useHistory,
    useLocation
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    floatingLabelFocusStyle: {
        
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px'
    }
}));

const InputView = (props) => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('Logging in...')
        props.submitLogin(username, password, () => {
            history.replace(from);
        });
    }
    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            {props.status ? <p>Error logging in</p> : null}
            <form onSubmit={handleLogin} className={classes.form}>
                <FormGroup>
                    <TextField
                        margin="normal"
                        name="username"
                        label="Username"
                        type="username"
                        id="username"
                        variant="outlined"
                        color="primary"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        color="primary"
                        required
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                    <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </FormGroup>
            </form>
            {/* <Button onClick={handleLogin} variant="contained" color="primary">Create Account</Button> */}
        </Container>
    )
}
export default InputView