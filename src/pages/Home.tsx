
import { useEffect, useState } from "react"
import { EventType } from "../types/collection"
import { getOpenEvents, url_image } from "../modules/event/services/event"
import EventComponent from "../modules/event/components/Event"

const Home = () => {

    const [events, setEvent] = useState<EventType[]>([]);

    useEffect(() => {
        getOpenEvents(4).then((data) => {
           
                const dataProcessd = data.map((event: EventType) => {
                    return url_image('event-banner', event.banner_url ?? 'sem_imagem').then((url) => { return {...event, banner_url: url.publicUrl} } )

                })
                Promise.all(dataProcessd).then((dataProcessd) => setEvent(dataProcessd))
        })
    }, [])

    useEffect(() => {
       
    },[])

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



    return (
            <>
            {homebanner}
            <div className="p-4">
                <div className="text-4xl py-4">
                    Próximos Eventos
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {events.map((event) => (
                        <EventComponent event={event} key={event.id}/>
                    ))}
                </div>

            </div>
            </>
    )
}

export default Home