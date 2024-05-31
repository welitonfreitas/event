import React from "react"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useParams } from "react-router-dom"
import { EventType } from "../../../types/collection"
import { get_event } from "../services/event"
import img_test from "../../../assets/085.jpg"
import img_test_patrocionador from "../../../assets/cannondale.jpg"
import { faMedal, faStar } from "@fortawesome/free-solid-svg-icons"


const Event = () => {

    const { id } = useParams()

    const [event, setEvent] = useState<EventType>({} as EventType)

    const categories = [
        "Elite",
        "Sub-30",
        "Junior",
        "Master A1",
        "Master A2",
        "Master B1",
        "Master B2",
        "Master C1",
        "Master C2",
        "Elite Feminino",
        "Master A Feminino",
        "Master B Feminino",
        "Cadete",
        "Amador A",
        "Amador B",
        "Amador Feminino",
    ]

    const lotes = [
        {
            name: "Lote 1",
            date: "De 21 de Maio até 30 de Maio",
            price: "R$ 90,00",
            status: "Encerrado"
        },
        {
            name: "Lote 2",
            date: "De 31 de Maio até 15 de Julho",
            price: "R$ 100,00",
            status: "Aberto"
        },
        {
            name: "Lote 3",
            date: "De 16 de Julho até 25 de Julho",
            price: "R$ 110,00",
            status: "Fechado"
        },
    ]

    const extras = [
        "Medalha de Finisher",
        "Chip e Placa",
        "Fotografo",
        "Kit Atleta",
        "Café da Manhã",
        "Pontos de Hidratação",
        "Pontuação Ranking",
    ]

    const patrocinadores = [
        "Mercado Morte Certa",
        "Bar das almas",
        "Padaria Pào frio",
        "Frigorifico Caner podre",
        "Frigorifico Caner podre",
        "Frigorifico Caner podre",
        
    ]

    useEffect(() => {
        get_event(id as string).then((data) => setEvent(data))
    }, [])

    return (
        event && 
        <div className="flex flex-col gap-4">
            <div className="flex flex-1">
                <img className="" src={img_test} alt={event.title} />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:basis-3/4">
                    <div className="text-3xl font-bold">Morada Nova Ride</div>
                    <div className="text-xs font-medium">
                        <span>28 de Julho de 2023</span> - 
                        <span className="px-1">Morada Nova-CE</span>
                    </div>
                    <div className="py-1 text-xl font-bold">Sobre o evento</div>
                    <div className="text-justify">Venha com a gente explorar todo o potencial que as trilhas de eusébio tem a oferecer. Uma prova criada para explorar o máximo que as trilhas da região a oferecer, junto com uma estrutura de ultima geração pensando para oferecer o melhor do mundo do ciclismo para que todos os ciclistas se sintam em casa</div>
                </div>
                <div className=" p-4 rounded-sm item md:basis-2/4">
                    <div className="text-3xl font-bold text-center">INSCRIÇÕES</div>
                    <div className="flex flex-col gap-3 p-4">
                        {lotes && lotes.map((lote) => (
                            <div className="p-3 flex flex-row justify-between rounded-md bg-gray-200 gap-2">
                                <div>
                                    <div className="text-xl font-medium">{lote.name}</div>
                                    <div className="text-sm text-zinc-500">{lote.date}</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold ">{lote.price}</div>
                                    {lote.status === "Aberto" ? (
                                        <div className="text-green-600 text-center border-green-600 border-2 rounded-md">{lote.status}</div>
                                    ):(
                                    <div className="text-center">{lote.status}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center p-4 bg-green-500 rounded-lg text-white">INCREVER-SE</div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-10 ">
                <div>
                        <div className="font-semibold py-2 text-xl">Categorias</div>
                        <div className="text-gray-500 grid grid-cols-2 gap-2">
                            {categories && categories.map((category) => (
                                <div>
                                    <FontAwesomeIcon icon={faMedal} />
                                    <span className="p-2"> {category}</span>
                                </div>    
                            ))}
                        </div>
                </div>
                <div>
                        <div className="font-semibold py-2 text-xl">Extras do eventos</div>
                    <div className="text-gray-500 grid grid-cols-2 gap-2">
                        {extras && extras.map((extra) => (
                            <div className="flex flex-row gap-2">
                                <FontAwesomeIcon icon={faStar} />
                                <span>{extra}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                    <div className="font-semibold py-2 text-lg">Localização</div>
                    <div >
                        <iframe className="w-96 h-64 md:w-full md:h-96" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.142980273769!2d-38.2749574856539!3d-4.969425696288905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b2f7f4d1c3e1d3%3A0x5f2b3b3f5d3b3d7!2sMorada%20Nova%20-%20CE!5e0!3m2!1spt-BR!2sbr!4v1631912380684!5m2!1spt-BR!2sbr" loading="lazy"></iframe>
                    </div>
            </div>
            <div>
                <div className="font-semibold py-2 text-lg">Patrocinadores</div>
                <div className="flex flex-row gap-3 flex-wrap">
                    {patrocinadores && patrocinadores.map((patrocinador) => (
                        <div className="md:text-center">
                            <img className="w-40" src={img_test_patrocionador} alt={patrocinador} />
                            {/* <span className="text-xs font-medium ">{patrocinador}</span> */}
                        </div>
                    ))}
                </div>
            </div>

        </div>
        
    )
}

export default Event