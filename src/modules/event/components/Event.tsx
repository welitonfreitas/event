import { Link } from "react-router-dom"
import { formatDate } from "../../../lib/formatters"
import { EventType } from "../../../types/collection";

export default function EventComponent(props: { event: EventType; }) {

    const { event } = props;
    const eventStatusMap = {
        'draft': 'Em Breve',
        'published': 'Aberto',
        'canceled': 'Cancelado',
        'finished': 'Finalizado'
    }

    return (
            <div className="items-center">
                <Link to={`/event/${event.id}`}>
                    <div className="h-auto border-2">
                        <img className='w-full' src={event.banner_url ?? ""} />
                    </div>
                    <div className="my-4">
                        <div className="flex flex-row gap-2 text-sm">
                            <span className="rounded-md border-2">{eventStatusMap[event.status]}</span>
                            {/* <span className="rounded-md border-2 px-2">1 lote</span> */}
                        </div>
                        <div className="text-xl font-semibold">
                            {event.title}
                        </div>
                        <div className="text-xs">
                            {event.address_short} - {formatDate(event.event_date)}
                        </div>
                    </div>
                </Link>
            </div>
        )
}
