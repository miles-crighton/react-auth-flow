import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import {
    Container,
    Button
} from '@material-ui/core'

import {
    useHistory,
} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'white',
        position: 'relative',
        top: '100px',
        padding: '20px',
        borderRadius: '10px'
    },
    logout: {

    }
}));



const DashView = (props) => {
    const [userData, setUserData] = useState([]);
    const [user, setUser] = useState('');
    const classes = useStyles();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('api/user/get-data');
                console.log(res)
                if (res.status === 200) {
                    setUserData(res.data.data)
                    setUser(res.data.user)
                }
            } catch (e) {
                console.log(e);
            }
        }
        getData()
    }, []);

    return (
        <Container className={classes.container} maxWidth='sm' component="main">
            <h1>Welcome to your dashboard {user}!</h1>
            {userData.map((val) => {
                return <div key={val}>{val}</div>
            })}
            <LogoutButton logout={props.logout} className={classes.logout}/>
        </Container>
    )
}
export default DashView

const LogoutButton = (props) => {
    let history = useHistory()

    const handleLogout = () => {
        props.logout(() => { history.push("/") })
    }

    return (
        <Button onClick={handleLogout} color="primary" variant="contained" className={props.className}>Logout</Button>
    )
}