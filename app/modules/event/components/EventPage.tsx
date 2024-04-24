import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"
import { EventType } from "../../../types/collection"
import { get_event } from "../services/event"
import Card from '@mui/material/Card';

const Event = () => {

    const { id } = useParams()

    const [event, setEvent] = useState<EventType>({} as EventType)

    useEffect(() => {
        get_event(id as string).then((data) => setEvent(data))
    }, [])

    return (
        event && (<Card>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
        </Card>)
        
    )
}

export default Event