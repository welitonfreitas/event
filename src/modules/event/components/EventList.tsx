import { useEffect, useState } from "react"
import { EventType } from "../../../types/collection"
import { get_service, url_image } from "../services/event"
import { Button } from "flowbite-react"; 

import { Link } from "react-router-dom"
import EventComponent from "./Event"

const EventList = () => {

    const [events, setEvent] = useState<EventType[]>([]);

    useEffect(() => {
        get_service().then((data) => {
            const dataProcessd = data.map((event: EventType) => {
                return url_image('event-banner', event.banner_url ?? 'sem_imagem').then((url) => { return { ...event, banner_url: url.publicUrl } })

            })
            Promise.all(dataProcessd).then((dataProcessd) => setEvent(dataProcessd))
        })
    }, [])

    return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {events.map((event) => (
                        <EventComponent event={event} />
                    ))}
                </div>
                <Button>
                    <Link to="/event/new">Adicionar Novo Evento</Link>
                </Button>
            </>
    )
}

export default EventList