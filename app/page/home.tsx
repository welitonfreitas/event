
import { useEffect, useState } from "react"
import { EventType } from "../types/collection"
import get_service from "../service/event"

const Home = () => {

    const [events, setEvent] = useState<EventType[]>([]);

    useEffect(() => {
        get_service().then((data) => setEvent(data))
    }, [])

    return (
        <div>
            {events.map((event) => (
                <li key={event.id}>{event.title}</li>
            ))}
        </div>
    )
}

export default Home