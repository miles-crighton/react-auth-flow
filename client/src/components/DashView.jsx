import React from 'react'

import {
    Container,
    Button
} from '@material-ui/core'

import {
    useHistory,
} from 'react-router-dom'

const DashView = (props) => {
    return (
        <Container>
            <h1>Welcome to your dashboard!</h1>
            <LogoutButton logout={props.logout} />
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
        <Button onClick={handleLogout}>Logout</Button>
    )
}