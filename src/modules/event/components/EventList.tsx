import { useEffect, useState } from "react"
import { EventType } from "../../../types/collection"
import { get_service } from "../services/event"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid"
import Item from "@mui/material/Grid"

import { Link } from "react-router-dom"

const EventList = () => {

    const [events, setEvent] = useState<EventType[]>([]);

    useEffect(() => {
        get_service().then((data) => setEvent(data))
    }, [])

    return (
        <Grid container spacing={3}>
            {events.map((event) => (
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
                            <Link to={`/event/${event.id}`}>
                                <Button variant="contained">Detalhes</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Item>
            ))}
            <Item>
                <Button variant="contained" component={Link} to="/event/new">Adicionar</Button>
            </Item>
        </Grid>
    )
}

export default EventList