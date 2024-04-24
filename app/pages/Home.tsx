
import { useEffect, useState } from "react"
import { EventType } from "../types/collection"
import { get_service } from "../modules/event/services/event"
import { Link } from "react-router-dom"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid"
import Item from "@mui/material/Grid"

const Home = () => {

    const [events, setEvent] = useState<EventType[]>([]);

    useEffect(() => {
        get_service().then((data) => setEvent(data))
    }, [])

    return (
            <>
            <Typography variant="h3" gutterBottom>Eventos</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {events.map((event) => (
                    <Grid key={event.id}>
                        <Item>
                            <Card key={event.id}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                        {event.title}
                                    </Typography>
                                    
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {event.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={`event/${event.id}`}>
                                        <Button variant="contained">Detalhes</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Item>
                    </Grid>
                ))}
                </Grid>
            </>
    )
}

export default Home