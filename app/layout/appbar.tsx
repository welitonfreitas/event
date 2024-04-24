import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../modules/auth/hooks/useAuth';

export const Appbar = () => {

    const navigate = useNavigate();
    const { session, user, logOut} = useAuth();

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
                    Event
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" onClick={() => navigate ('/events')}>Events</Button>
                    {user && session
                        ? <Button color="inherit" onClick={logOut}>Logout</Button>
                        : <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>}
                    
                </Stack>
            </Toolbar>
        </AppBar>
    )
}