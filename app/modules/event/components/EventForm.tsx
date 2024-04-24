
import { Button, Typography, TextField, Stack } from '@mui/material';
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
            <Typography variant="h4" gutterBottom>
                Cadastrar Evento
            </Typography>
            { error && <Typography color="error" variant="subtitle1" gutterBottom> { error } </Typography> }

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} width={400} >
                    <TextField id="title" label="Título" {...register("title", { required: "Título obrigatório"})} error={!!errors.title} helperText={errors.title?.message} />
                    <TextField id="description" multiline rows={5} label="Descrição"  {...register("description", { required: "Descrição obrigatória" })} error={!!errors.description} helperText={errors.description?.message} />
                    <TextField type="datetime-local" id="date_start" label="Data do Evento" {...register("date_start", { required: "Data obrigatória" })} error={!!errors.date_start} helperText={errors.date_start?.message} />
                    <Button type="submit" variant="contained">
                        Criar evento
                    </Button>
                </Stack>
            </form>
        </>
    );
};
export default EventForm