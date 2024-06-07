import React from "react"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useNavigate, useParams } from "react-router-dom"
import { get_event, url_image } from "../services/event"
import { faMedal, faStar } from "@fortawesome/free-solid-svg-icons"
import { CategoryEvent, EventType } from "../../../types/collection"
import { formatDate, formatPrice } from "../../../lib/formatters"
import { Button } from "flowbite-react"
import { useAuth } from "../../auth/hooks/useAuth"

const Event = () => {

    const navigate = useNavigate()
    
    const { id } = useParams()
    const { session, user } = useAuth()

    const [event, setEvent] = useState<EventType>({} as EventType)
    const [eventBanner, setEventBanner] = useState<string>("")
    const [categories, setCategories] = useState<CategoryEvent[]>([])
    const [mapsUrl, setMapsUrl] = useState<string>("https://www.google.com/maps?q=Morada Nova-CE&output=embed")

    type Sponsor = {
        title: string,
        logo_url: string
    }
    const [sponsor, setSponsor] = useState<Sponsor[]>([])

    type Extra = {
        label: string,
        value: string
    }
    const [extras, setExtras] = useState<Extra[]>([])

    useEffect(() => {
        get_event(id as string).then((data) => {
            setEvent(data)
            url_image('event-banner', data.banner_url ?? 'sem_imagem').then((url) => setEventBanner(url.publicUrl))
            setCategories(data.category)
            setMapsUrl(`https://www.google.com/maps?q=${data.address_full}&output=embed&z=15&hl=pt_BR`)
            if (data.extras)
                setExtras(JSON.parse(data.extras.toString()))
            
            if (data.sponsors){
                const _sposors = JSON.parse(data.sponsors.toString())
                const sponsorProcessd = _sposors.map((_sponsor: Sponsor) => {
                    return url_image('sponsors-brands', _sponsor.logo_url ?? 'sem_imagem').then((url) => { return { ..._sponsor, logo_url: url.publicUrl } })
                })
                Promise.all(sponsorProcessd).then((sponsorProcessd) => setSponsor(sponsorProcessd))
            }
        })
    }, [])

    const handleSubscription = () => {
        //check if user is logged
        //if not redirect to login
        //if logged redirect to subscription
        console.log(session)
        if (!session) {
            navigate(`/login?redirecTo=/event/${id}/subscribe`) 
        } else {
            navigate(`/event/${id}/subscribe`)
        }

    }

    return (
        event && 
        <div className="flex flex-col gap-4">
            <div className="flex flex-1">
                    <img className="" src={eventBanner} alt={event.title} />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:basis-3/4">
                    <div className="text-3xl font-bold">{ event.title }</div>
                    <div className="text-xs font-medium">
                        <span>{ formatDate(event.event_date) }</span> - 
                        <span className="px-1">{ event.address_short }</span>
                    </div>
                    <div className="text-xs font-medium">
                        <span>Organizador</span> - 
                        <span className="px-1">{ event.user_id }</span>
                    </div>
                    
                    <div className="py-1 text-xl font-bold">Sobre o evento</div>
                    <div className="text-justify">{ event.description }</div>
                </div>
                <div className=" p-4 rounded-sm item md:basis-2/4">
                    <div className="text-3xl font-bold text-center">INSCRIÇÕES</div>
                    <div className="flex flex-col gap-3 p-4">
                            {event.lots && event.lots.map((lote) => (
                            <div className="p-3 flex flex-row justify-between rounded-md bg-gray-200 gap-2">
                                <div>
                                    <div className="text-xl font-medium">{lote.title}</div>
                                    <div className="text-sm text-zinc-500">
                                            <span>De {formatDate(lote.start_date, false)}</span> 
                                            <span className="px-1">Até {formatDate(lote.end_date, false)}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold ">{formatPrice(lote.price)}</div>
                                    {lote.status === "Aberto" ? (
                                        <div className="text-green-600 text-center border-green-600 border-2 rounded-md">{lote.status}</div>
                                    ):(
                                    <div className="text-center">{lote.status}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="px-24" color="success" size="xl" onClick={handleSubscription} >
                        INSCREVER-SE
                    </Button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-10 ">
                <div>
                        <div className="font-semibold py-2 text-xl">Categorias</div>
                        <div className="text-gray-500 grid grid-cols-2 gap-2">
                            {categories && categories.map((category) => (
                                <div>
                                    <FontAwesomeIcon icon={faMedal} />
                                    <span className="p-2 text-sm"> {category.description}</span>
                                </div>    
                            ))}
                        </div>
                </div>
                <div>
                    <div className="font-semibold py-2 text-xl">Extras do eventos</div>
                    <div className="text-gray-500 grid grid-cols-2 gap-2">
                            {extras && extras.map((extra:Extra ) => (
                            <div className="flex flex-row gap-2">
                                <FontAwesomeIcon icon={faStar} />
                                <span>{extra.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                    <div className="font-semibold py-2 text-lg">Localização</div>
                    <div >
                        <iframe className="w-96 h-64 md:w-full md:h-96" src={mapsUrl} loading="lazy"></iframe>
                    </div>
            </div>
            <div>
                <div className="font-semibold py-2 text-lg">Patrocinadores</div>
                <div className="flex flex-row gap-3 flex-wrap">
                        {sponsor && sponsor.map((sponsor) => (
                        <div className="md:text-center">
                                <img className="w-40" src={ sponsor.logo_url } alt={sponsor.title} />
                            {/* <span className="text-xs font-medium ">{patrocinador}</span> */}
                        </div>
                    ))}
                </div>
            </div>

        </div>
        
    )
}

export default Event