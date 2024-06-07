import {  useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { Label, TextInput, Datepicker, Button } from "flowbite-react";
import { useAuth } from '../../auth/hooks/useAuth';
import { formatDate } from '../../../lib/formatters';
import { get_profile, update_profile } from '../services/profile';
import { Profile } from '../../../types/collection';


export default function ProfilePage() {

    const { session, user } = useAuth()

    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [error, setError] = useState<string>('')
    const [profile, setProfile] = useState<Profile>({
        id: "",
        name: "",
        cpf: "",
        birth_date: "",
        gender: "other",
        blod_type: "A+",
        address: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        zip_code: "",
        phone: "",
        phone_emergency: "",
        complement: "",
        team: "",
        created_at: "",
    })


    useEffect(() => {

        session.then((session) => {
            const user = session.data?.session?.user
            if (user){
                get_profile(user.id).then((user) => {
                    setProfile(user)
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ).catch((_) => {
                    setError('Erro ao carregar perfil')
                })
            }
        })


    }, [])

    const genero = [
        { label: "Masculino", value: "male" },
        { label: "Feminino", value: "female" },
    ]

    const grupoSanguinio = [
        { label: "A+", value: "A+" },
        { label: "A-", value: "A-" },
        { label: "B+", value: "B+" },
        { label: "B-", value: "B-" },
        { label: "AB+", value: "AB+" },
        { label: "AB-", value: "AB-" },
        { label: "O+", value: "O+" },
        { label: "O-", value: "O-" },
    ]

    const validadeForm = () => {
        if (!profile.name) {
            setError("Nome é obrigatório")
            return false
        }
        if (!profile.cpf) {
            setError("Cpf é obrigatório")
            return false
        }
        if (!profile.birth_date) {
            setError("Data de Nascimento é obrigatório")
            return false
        }
        if (!profile.gender) {
            setError("Genero é obrigatório")
            return false
        }
        if (!profile.blod_type) {
            setError("Grupo Sanguinio é obrigatório")
            return false
        }

        if (!profile.address) {
            setError("Rua é obrigatório")
            return false
        }
        if (!profile.number) {
            setError("Numero é obrigatório")
            return false
        }
        if (!profile.neighborhood) {
            setError("Bairro é obrigatório")
            return false
        }
        if (!profile.city) {
            setError("Cidade é obrigatório")
            return false
        }
        if (!profile.state) {
            setError("Estado é obrigatório")
            return false
        }
        if (!profile.zip_code) {
            setError("Cep é obrigatório")
            return false
        }
        if (!profile.phone) {
            setError("Telefone é obrigatório")
            return false
        }
        if (!profile.phone_emergency) {
            setError("Telefone de Emergencia é obrigatório")
            return false
        }
        if (!profile.team) {
            setError("Equipe é obrigatório")
            return false
        }
        return true
    }

    const updateProfile = () => {
        if (user) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            update_profile(profile).then((_) => {
                setIsEdit(false)
                alert("Perfil atualizado com sucesso")
            }).catch((error) => {
                setError(error.message)
            })
        }
    }    

    const onHandleClick = () => {
        if (isEdit) {
            if (validadeForm()) {
                updateProfile()
                setIsEdit(false)
            } 

        } else {
            setIsEdit(true)
        }
        
    }

    return (
        <>
            <div className="text-xl font-bold p-2 text-center">
                Dados Pessoais
            </div>
            {error && <div className="text-red-500 text-xl"> {error} </div>}

            <form className="max-w-sm mx-auto" >
                <div className="mb-5">
                    <Label htmlFor="title" value="Nome Completo" />
                    <TextInput
                        id="nome"
                        placeholder=""
                        disabled={!isEdit}
                        value={profile.name ?? ""}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        required />
                </div>
                <div className="mb-5">
                    <Label htmlFor="cpf" value="CPF" />
                    <TextInput
                        id="cpf"
                        placeholder="Cpf"
                        value={profile.cpf ?? ""}
                        onChange={(e) => setProfile({ ...profile, cpf: e.target.value })}
                        disabled={!isEdit}
                        required />
                </div>
                <div className="mb-5">
                    <Label htmlFor="dataNascimento" value="Data de Nascimento" />
                    <Datepicker
                        language="pt-BR"
                        labelTodayButton="Hoje"
                        labelClearButton="Limpar"
                        defaultValue={formatDate(profile.birth_date) ?? ""}
                        disabled={!isEdit}
                        onSelectedDateChanged={(date) => setProfile({ ...profile, birth_date: date.toISOString().replace('T', ' ').replace('Z', '') })}
                        
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="Genero" value="Gênero" />
                    <MultiSelect
                        options={genero}
                        value={genero.filter((item) => item.value === profile.gender)}
                        disabled={!isEdit}
                        disableSearch={true}
                        closeOnChangedValue={true}
                        hasSelectAll={false}
                        labelledBy="Genero"
                        // @ts-expect-error xxx 
                        onChange={(e: string | unknown[]) => setProfile({ ...profile, gender: e.length < 1 ? e[0].value : e[e.length - 1].value })}
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="grupo sanguinio" value="Grupo Sanguinio" />
                    <MultiSelect
                        options={grupoSanguinio}
                        value={grupoSanguinio.filter((item) => item.value === profile.blod_type)}
                        disabled={!isEdit}
                        disableSearch={true}
                        hasSelectAll={false}
                        closeOnChangedValue={true}
                        labelledBy="Grupo Sanguinio"
                        // @ts-expect-error xxx
                        onChange={(e) => setProfile({ ...profile, blod_type: e.length < 1 ? e[0].value : e[e.length - 1].value })}
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="rua" value="Rua" />
                    <TextInput
                        id="rua"
                        placeholder="rua"
                        value={profile.address ?? ""}
                        disabled={!isEdit}
                        required
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="numero" value="Numero" />
                    <TextInput
                        id="numero"
                        placeholder="numero"
                        value={profile.number ?? ""}
                        disabled={!isEdit}
                        required
                        onChange={(e) => setProfile({ ...profile, number: e.target.value })}
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="bairro" value="Bairro" />
                    <TextInput
                        id="bairro"
                        placeholder="bairro"
                        value={profile.neighborhood ?? ""}
                        disabled={!isEdit}
                        required
                        onChange={(e) => setProfile({ ...profile, neighborhood: e.target.value })}
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="cidade" value="Cidade" />
                    <TextInput
                        id="cidade"
                        placeholder="cidade"
                        value={profile.city ?? ""}
                        disabled={!isEdit}
                        required
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="estado" value="Estado" />
                    <TextInput
                        id="estado"
                        placeholder="estado"
                        value={profile.state ?? ""}
                        disabled={!isEdit}
                        required
                        onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="cep" value="cep" />
                    <TextInput
                        id="cep"
                        placeholder="cep"
                        value={profile.zip_code ?? ""}
                        disabled={!isEdit}
                        required
                        onChange={(e) => setProfile({ ...profile, zip_code: e.target.value })}
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="telefone" value="telefone" />
                    <TextInput
                        id="telefone"
                        placeholder="telefone"
                        value={profile.phone ?? ""}
                        disabled={!isEdit}
                        required
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="telefoneEmergencia" value="Telefone Emergencia" />
                    <TextInput
                        id="telefoneEmergencia"
                        placeholder="telefoneEmergencia"
                        value={profile.phone_emergency ?? ""}
                        disabled={!isEdit}
                        required
                        onChange={(e) => setProfile({ ...profile, phone_emergency: e.target.value })}
                    />
                </div>
                <div className="mb-5">
                    <Label htmlFor="equipe" value="Equipe" />
                    <TextInput
                        id="equipe"
                        placeholder="equipe"
                        value={profile.team ?? ""}
                        disabled={!isEdit}
                        required
                        onChange={(e) => setProfile({ ...profile, team: e.target.value })}
                    />
                </div>
                <Button onClick={onHandleClick}>{isEdit ? 'Salvar' : 'Editar'}</Button>
            </form>
            
        </>
    );
}