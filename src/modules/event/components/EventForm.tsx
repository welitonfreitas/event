
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { Button, FileInput, Label, Modal, TextInput, Textarea, Datepicker } from "flowbite-react"; 
import { v4 as uuidv4 } from "uuid";
import { create_event, create_event_categories, upload_image } from '../services/event';
import { get_categories } from "../services/categorie";
import { EventTypeInsert, LotsInsert } from '../../../types/collection';
import { useAuth } from '../../auth/hooks/useAuth';
import { create_lots } from '../services/lots';



const EventForm = () => {

    const [error, setError] = useState('')
    const { user } = useAuth()
    const navigate = useNavigate()


    type selectedType = {
        label: string,
        value: number
    }
    const [categories, setCategories] = useState<selectedType[]>([]);

    useEffect(() => {
        get_categories().then((data) => setCategories(data.map((categorie) => ({ label: categorie.description ?? '', value: categorie.id }))))
    }, [])

    const extras = [
        { label: "Medalha de Finisher", value: "1"},
        { label: "Chip e Placa", value: "2"},
        { label: "Fotografo", value: "3"},
        { label: "Kit Atleta", value: "4"},
        { label: "Café da Manhã", value: "5"},
        { label: "Pontos de Hidratação", value: "6"},
        { label: "Pontuação Ranking", value: "7"},
    ]


    const [title, setTitle] = useState('' as string)
    const [description, setDescription] = useState('' as string)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setEventPostArt] = useState('' as string)
    const [eventPostArtFileName, setEventPostArtFileName] = useState('' as string)
    const [eventDate, setEventDate] = useState('' as string)
    const [anddressShort, setAnddressShort] = useState('' as string)
    const [anddressFull, setAnddressFull] = useState('' as string)
    //Categorias e extras
    const [categorySelected, setCategorySelected] = useState<selectedType[]>([]);
    const [extraSelected, setExtraSelected] = useState([]);
    

    //Patrocinadores
    type sponsorType = {
        name: string,
        logo: string,
        filename: string
    }

    const [sposorName, setSposorName] = useState('' as string)
    const [sposorLogo, setSposorLogo] = useState('' as string)
    const [sposorLogoFileName, setSposorLogoFileName] = useState('' as string)
    const [sponsors, setSponsors] = useState<sponsorType[]>([])

    const [openModalSponsor, setOpenModalSponsor] = useState(false);

    //Lotes
    type loteType = {
        evet_id?: number | null,
        title: string,
        start_date: string,
        end_date: string,
        price?: number,
    }

    const [lotes, setLotes] = useState<loteType[]>([])
    const [loteName, setLoteName] = useState('' as string)
    const [loteDateInit, setLoteDateInit] = useState('' as string)
    const [loteDateEnd, setLoteDateEnd] = useState('' as string)
    const [lotePrice, setLotePrice] = useState<number>()
    const [openModalLotes, setOpenModalLotes] = useState(false);


    const createEvent = async (data: EventTypeInsert, lotes: LotsInsert[], categories: selectedType[]) => {

        await create_event(data)
            .then((data) => {
                const event_id = data[0].id
                const lotsWithEventId = lotes.map((lote) => ({ ...lote, event_id: event_id }))
                create_lots(lotsWithEventId)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .then((_) => {
                    const categoriesWithEventId = categories.map((category) => ({ category_id: category.value, event_id: event_id }));
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    create_event_categories(categoriesWithEventId).then((_) => {
                        navigate(`/event/${event_id}`)
                    }).catch((error) => setError(error.message))
                }).catch((error) => setError(error.message))
            }).catch((error) => setError(error.message))
    }

    const onHandleSponsorBrand = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        const fileName = uuidv4();
        upload_image('sponsors-brands', fileName, file)
        setSposorLogoFileName(fileName)
        setSposorLogo(URL.createObjectURL(event.target.files[0]));
    }

    const onHandleEventPostArt = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        const fileName = uuidv4();
        upload_image('event-banner', fileName, file)
        setEventPostArtFileName(fileName)
        setEventPostArt(URL.createObjectURL(file));
    }

    const onCloseModalSponsor = () => {
        setSponsors([...sponsors, { name: sposorName, logo: sposorLogo, filename: sposorLogoFileName}])
        setOpenModalSponsor(false)
        setSposorName('')
        setSposorLogo('')
        setSposorLogoFileName('')
    }

    const onCloseModalLotes = () => {
        setOpenModalLotes(false)
        setLotes([...lotes, {  title: loteName, start_date: loteDateInit, end_date: loteDateEnd, price: lotePrice }])
        setLoteName('')
        setLoteDateInit('')
        setLoteDateEnd('')
        setLotePrice(0)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onValidateEvent = (e: any) => {
        e.preventDefault()

        if (title === '') {
            setError('Titulo não pode ser vazio')
            return
        }
        if (description === '') {
            setError('Descrição não pode ser vazio')
            return
        }
        if (eventDate === '') {
            setError('Data do evento não pode ser vazio')
            return
        }
        if (anddressShort === '') {
            setError('Endereço não pode ser vazio')
            return
        }
        if (anddressFull === '') {
            setError('Endereço completo não pode ser vazio')
            return
        }
        // if (sponsors.length === 0) {
        //     setError('Adicione um patrocinador')
        //     return
        // }
        if (lotes.length === 0) {
            setError('Adicione ao menos 1 lote')
            return
        }
        if (categorySelected.length === 0) {
            setError('Selecione ao menos 1 categoria')
            return
        }
        // if (extraSelected.length === 0) {
        //     setError('Selecione um extra')
        //     return
        // }
        setError('')
    
        console.log(' Tile: ', title)
        console.log(' Description: ', description)
        console.log(' Event Date: ', eventDate)
        console.log(' Anddress Short: ', anddressShort)
        console.log(' Anddress Full: ', anddressFull)
        console.log(' Sponsors: ', sponsors)
        console.log(' Lotes: ', lotes)
        console.log(' Categories: ', categorySelected)
        console.log(' Extras: ', extraSelected)
        
        createEvent({ 
            user_id: user.id,
            title, 
            description,
            banner_url: eventPostArtFileName ?? '',
            event_date: eventDate ?? '', 
            anddress_short: anddressShort ?? '', 
            anddress_full: anddressFull ?? '', 
            extras: JSON.stringify(extraSelected),
            sponsors: JSON.stringify(sponsors.map((sponsor) => { return {title: sponsor.name, logo_url: sponsor.filename}}))}, 
            lotes, 
            categorySelected)

    }

    //TODO
    // REgulamento?
    // Organizador? 
    // Percusos, maps do strava e etc..


    return (
        <>
            <div className="text-xl font-bold p-2 text-center">
                CADASTRAR EVENTO
            </div>
            { error && <div className="text-red-500 text-xl">Erro:  { error } </div> }

            <form className="max-w-sm mx-auto" >
                <div className="mb-5">
                    <Label htmlFor="title" value="Titulo" />
                    <TextInput 
                        id="titulo" 
                        placeholder="" 
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required />
                </div>
                <div className="mb-5">
                    <Label htmlFor="description" value="Descrição" />
                    <Textarea 
                        id="description" 
                        placeholder="Descreva sua Prova..." 
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required 
                        rows={5} />
                </div>
                <div className="mb-5">
                    <Label htmlFor="eventDate" value="Data do evento" />
                    <Datepicker 
                        language="pt-BR" 
                        labelTodayButton="Hoje" 
                        labelClearButton="Limpar" 
                        defaultValue={eventDate} 
                        onSelectedDateChanged={(date) => { setEventDate(date.toISOString().replace('T', ' ').replace('Z', '')) }}
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="post" value="Arte de Capa" />
                    <FileInput 
                        id="eventPostArt" 
                        onChange={onHandleEventPostArt}
                        helperText="" 
                    />
                    
                </div>
                <div className="mb-5">
                    <Label htmlFor="localization" value="Endereço (Cidade e Estado)" />
                    <TextInput 
                        id="localization" 
                        placeholder="ex: Fortaleza-CE" 
                        value={anddressShort}
                        onChange={(event) => setAnddressShort(event.target.value)}
                        required />
                </div>
                <div className="mb-5">
                    <Label htmlFor="localizationMap" value="Endereço Completo" />
                    <TextInput 
                        id="localizationMap" 
                        placeholder="Ex: Jaçanaú, Maracanaú - CE, 61915-380" 
                        value={anddressFull}
                        onChange={(event) => setAnddressFull(event.target.value)}
                        required 
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="lotes" value="Lotes" />
                    <div className="grid grid-cols-2 gap-2 p-2">
                        {lotes.map((lote) => (
                            <div className="border-2 rounded-md flex flex-col align-bottom p-2">
                                <div className="flex flex-row align-baseline gap-4">
                                    <div>{lote.title}</div>
                                    <div>R$ {lote.price}</div>
                                </div>
                                <div className="flex flex-row align-baseline gap-4">
                                    <div>De: {lote.start_date}</div>
                                    <div>Até: {lote.end_date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button onClick={() => setOpenModalLotes(true)}>
                        +
                    </Button>
                    <Modal show={openModalLotes} size="md" onClose={onCloseModalLotes} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Adicionar Patrocinador</h3>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="lote_name" value="Nome" />
                                    </div>
                                    <TextInput
                                        id="lote_name"
                                        placeholder="Lote x"
                                        value={loteName}
                                        onChange={(event) => setLoteName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="lote_data_start" value="Data Inicio" />
                                    </div>
                                    <Datepicker 
                                        id="lote_data_start" 
                                        language="pt-BR" 
                                        labelTodayButton="Hoje" 
                                        labelClearButton="Limpar" 
                                        defaultValue={loteDateInit}
                                        onSelectedDateChanged={(date) => { setLoteDateInit(date.toISOString().replace('T', ' ').replace('Z', '')) }}
                                        required 
                                    />
                                    
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="lote_data_end" value="Data Fim" />
                                    </div>
                                    <Datepicker
                                        id="lote_data_start"
                                        language="pt-BR"
                                        labelTodayButton="Hoje"
                                        labelClearButton="Limpar"
                                        defaultValue={loteDateEnd}
                                        onSelectedDateChanged={(date) => { setLoteDateEnd(date.toISOString().replace('T', ' ').replace('Z', '')) }}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="lote_valor" value="Valor" />
                                    </div>
                                    <TextInput
                                        id="lote_valor"
                                        type='number'
                                        placeholder="R$ 00,00"
                                        value={lotePrice}
                                        onChange={(event) => setLotePrice(parseInt(event.target.value))}
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <Button onClick={onCloseModalLotes}>Cadastrar Lote</Button>
                                </div>

                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="mb-5">
                    <Label htmlFor="Categories" value="Categorias" />
                    <MultiSelect
                        options={categories}
                        value={categorySelected}
                        onChange={setCategorySelected}
                        labelledBy="Categoria"
                    />

                </div>
                <div className="mb-5">
                    <Label htmlFor="extras" value="Extras" />
                    <MultiSelect
                        options={extras}
                        value={extraSelected}
                        onChange={setExtraSelected}
                        labelledBy="Extras"
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="sposors" value="Patrocinadores" />
                    <div className="grid grid-cols-2 gap-2 p-4">
                        {sponsors.map((sponsor) => (
                            <div className="border-2 rounded-md flex flex-row align-bottom">
                                <div>
                                    <span>{sponsor.name}</span>
                                </div>
                                <div className="w-1/3">
                                    <img src={sponsor.logo} alt={sponsor.name} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button onClick={() => setOpenModalSponsor(true)}>
                        +
                    </Button>
                    <Modal show={openModalSponsor} size="md" onClose={onCloseModalSponsor} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Adicionar Patrocinador</h3>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="sponsor_name" value="Nome" />
                                    </div>
                                    <TextInput
                                        id="sponsor_name"
                                        placeholder=""
                                        value={sposorName}
                                        onChange={(event) => setSposorName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="sposorLog" value="Logo" />
                                        <FileInput 
                                            id="sposorLogo" 
                                            helperText="" 
                                            //value={sposorLogo}
                                            onChange={onHandleSponsorBrand}
                                        />
                                    </div>
                                    
                                </div>
                                <div className="w-full">
                                    <Button onClick={onCloseModalSponsor}>Cadastrar Patrocinador</Button>
                                </div>
                                
                            </div>
                        </Modal.Body>
                    </Modal>

                </div>
                <Button type="submit" onClick={onValidateEvent}>Criar Evento</Button>
            </form>
        </>
    );
};
export default EventForm