
import { useForm } from "react-hook-form"
import { create_event } from '../services/event';
import { EventType, EventTypeInsert } from '../../../types/collection';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';


const EventForm = () => {

    const [error, setError] = useState('')
    const { user } = useAuth()
    const navigate = useNavigate()

    const form = useForm<EventType>({
        defaultValues: {
            title: '',
            description: '',
            date_start: ''
        }
    })

    const { register, handleSubmit, formState} = form

    const { errors } = formState

    const onSubmit = async (data: EventTypeInsert) => {

        data.user_id = user.id

        await create_event(data)
            .then((data) => navigate(`/event/${data[0].id}`))
        .catch((error) => setError(error.message))
    }

    return (
        <>
            <div >
                Cadastrar Evento
            </div>
            { error && <div> { error } </div> }

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div spacing={2} width={400} >
                    <div id="title" label="Título" {...register("title", { required: "Título obrigatório"})} error={!!errors.title} helperText={errors.title?.message} />
                    <div id="description" multiline rows={5} label="Descrição"  {...register("description", { required: "Descrição obrigatória" })} error={!!errors.description} helperText={errors.description?.message} />
                    <div type="datetime-local" id="date_start" label="Data do Evento" {...register("date_start", { required: "Data obrigatória" })} error={!!errors.date_start} helperText={errors.date_start?.message} />
                    <div type="submit" variant="contained">
                        Criar evento
                    </div>
                </div>
            </form>
        </>
    );
};
export default EventForm