
import { useEffect, useState } from "react"
import { EventType } from "../types/collection"
import { get_service } from "../modules/event/services/event"
import { Link } from "react-router-dom"

const Home = () => {

    const [events, setEvent] = useState<EventType[]>([]);

    useEffect(() => {
        get_service().then((data) => setEvent(data))
    }, [])

    const homebanner = <div>
        <div className="flex text-fuchsia-500 font-bold">
            SUA PLATAFORMA DE EVENTOS ESPORTIVOS
        </div>
        <div className="flex flex-col text-7xl font-bold gap-3">
            <span className="">Fique por dentro</span>
            <span>dos melhores</span>
            <span className="text-green-500">eventos</span>
        </div>
        <div className="py-5 text-slate-600 text-lg">
            Partipe dos melhores eventos esportivos do Brasil
        </div>

    </div>

    const eventComponent = (event:any) => {
    
    return (
            <a href={`/event/${event.id}`}>
                <div className="flex flex-col gap-2">
                    <div className="h-52 w-56 border-2 p-">
                        imagem
                    </div>
                    <div>
                        <div className="flex flex-row gap-2 text-sm">
                            <span className="rounded-md border-2 px-2">abertas</span>
                            <span className="rounded-md border-2 px-2">1 lote</span>
                        </div>
                        <div className="text-xl font-semibold">
                            {event.title}
                        </div>
                        <div className="text-xs">
                            Morada Nova-CE - 23 de maio de 2024
                        </div>
                    </div>
                </div>
            </a>
        )
    }

    return (
            <>
            {homebanner}
            <div className="p-4">
                <div className="text-4xl py-4">
                    Próximos Eventos
                </div>
                <div className="flex flex-col">
                    {events.map((event) => (
                        eventComponent(event)
                    ))}
                </div>

            </div>
            </>
    )
}

export default Home