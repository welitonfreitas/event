import { Outlet } from "react-router-dom"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Appbar } from "./appbar";
import { Grid } from "@mui/material";





const Footer = () => {
    return (
        <div>
            Footer
        </div>
    )
}

const BrowserLayout = () => {
    
    return (
        <>
            <Appbar />
            <Container sx={{height: '100vh'}}>
                <Outlet />
            </Container>
            <Footer />
        </>
    )
}

export default BrowserLayout