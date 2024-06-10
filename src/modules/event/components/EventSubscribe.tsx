import { ChangeEvent, useEffect, useState } from "react"
import { useAuth } from "../../auth/hooks/useAuth"
import { get_profile } from "../../profille/services/profile"
import { v4 as uuidv4 } from "uuid";
import { redirect, useNavigate, useParams } from "react-router-dom"
import { Category, CategoryEvent, EventType, Lots, ProfileType, SelectedType } from "../../../types/collection"
import { Button, Datepicker, FileInput, Label, Radio, Select, TextInput } from "flowbite-react"
import { formatDate } from "../../../lib/formatters"
import { MultiSelect } from "react-multi-select-component"
import { createSubscription, get_event, setSubscriptionFile, upload_image } from "../services/event"
import { validate } from "uuid"
import { set } from "react-hook-form"


export default function EventSubscribe() {

    const {session, user} = useAuth()
    const navigate = useNavigate()
    const [profile, setProfile] = useState<ProfileType>({} as ProfileType)

    type OneSelectedType = SelectedType & {
        checked: boolean
    }

    const [categories, setCategories] = useState<OneSelectedType[]>([]);

    const [lots, setLots] = useState<OneSelectedType[]>([]);

    const [sucess, setSucess] = useState<boolean>(false)

    const [error, setError] = useState<string>('')

    const [sucessFile, setSucessFile] = useState<boolean>(false)
    const [idSubscription, setIdSubscription] = useState<number>(0)


    const { id } = useParams()    
    useEffect(() => {
        session.then((session) => {
            const user_id = session?.data.session?.user.id
            if (user_id) {
                get_profile(user_id).then((data) => {

                    if (
                        !data.address || 
                        !data.city || 
                        !data.state || 
                        !data.zip_code || 
                        !data.state || 
                        !data.phone || 
                        !data.name || 
                        !data.birth_date || 
                        !data.cpf || 
                        !data.gender || 
                        !data.blod_type ||
                        !data.number ||
                        !data.team ||
                        !data.phone_emergency ||
                        !data.neighborhood) {
                        navigate(`/profile/?redirecTo=/event/${id}/subscribe`)
                    } else {
                        setProfile(data)
                    }
                })
            }
        })
    }
    , [])

    useEffect(() => {
        if(!id) return
        get_event(id).then((data) => {
            if(data.category) {
                // first filter for gender
                // Regra de negocio: Se a categoria for mista, todos podem se inscrever
                let categories = data.category.filter((cat: Category) => cat.gender === profile.gender || cat.gender === 'mixed')

                //Second filter for level
                // Regra de negocio: Iniciantes pode participar de categoria avançada
                categories = categories.filter((cat: Category) => cat.difficulty_level === profile.level || cat.difficulty_level === 'advanced')

                //Third filter for age

                const age = new Date().getFullYear() - new Date(profile.birth_date).getFullYear()

                categories = categories.filter((cat: Category) => cat.minimum_age <= age && cat.maximum_age >= age)
                setCategories(categories.map((cat: Category) => ({ label: cat.description ?? '', value: cat.id, checked: false})))
            }
            if(data.lots) {
                const today = new Date()
                const lots = data.lots.filter((lot: Lots) => new Date(lot.start_date) <= today && new Date(lot.end_date) >= today)
                setLots(lots.map((lot: Lots, i: number) => ({ label: lot.title ?? '', value: lot.id, checked: i === 0})))
            }

        })
    }, [profile])

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

    const validateForm = () => {
        if(categories.filter((cat) => cat.checked).length === 0){
            setError('Selecione uma categoria')
            return
        }
        if (lots.filter((checked) => checked).length === 0){
            setError('Selecione um lote')
            return
        }
        setError('')
        return true
    }

    const onHandleClick = () => {   
        console.log('salvando')
        if(validateForm()) {
            console.log('salvando')
            const data = {
                profile_id: profile.id,
                category_id: categories.filter((checked) => checked)[0].value,
                lot_id: lots.filter((checked) => checked)[0].value,
                event_id: id
            }
            createSubscription(data).then((data) => {
                setError('')
                setSucess(true)
                setIdSubscription(data[0].id)
            }).catch((e) => {
                setError('Erro ao fazer inscrição' + e)
            })
        }
    }

    const onSelectCategory = (e: any) => {
        setCategories(categories.map((cat) => ({...cat, checked: cat.value === parseInt(e.target.value)})))
    }

    const onSelectComprovante = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        const fileName = uuidv4();
        upload_image('comprovantes', fileName, file).then(() => {
            setSubscriptionFile(idSubscription, fileName).then(() => {
                setSucessFile(true)
            }).catch((e) => {
                setError('Erro ao enviar comprovante' + e)
            })
        }).catch((e) => {
            setError('Erro ao enviar comprovante' + e)
        })
    }

    if(sucess) {
        return (
            <div>
                <div className="text-green-500 text-xl">
                    Parabéns {profile.name}! Inscrição realizada com sucesso</div>
                <div className="text-xl font-bold p-2 text-center">
                    Dados da Inscrição
                </div>
                <div className="text-xl  p-2 text-center">
                    <span className="font-bold">Categoria:</span> { categories.filter((cat)=> cat.checked)[0].label}
                </div>
                <div className="text-xl p-2 text-center">
                    <span className="font-bold">Lote:</span> {lots.filter((lot) => lot.checked)[0].label}
                </div>
                <div className="text-xl p-2 text-center">
                    <span className="font-bold">Valor:</span> 00
                </div>
                <div className="text-xl font-bold p-2 text-center">
                    Para Aprovar sua inscrição faça o pagamento e anexe o comprovante aqui
                </div>
                <div className="text-xl font-bold p-2 text-center text-wrap">
                    Pix
                    Chave: xxx-xxxx-xxx-xx
                    Fulano da Silva Sauro
                </div>
                <div className="text-xl font-bold p-2 text-center">
                    <Label htmlFor="comprovante" value="Comprovante" />
                    {sucessFile && <div className="text-green-500 text-xl">Comprovante enviado com sucesso</div>}
                    <FileInput
                        id="comprovante"
                        placeholder="comprovante"
                        onChange={onSelectComprovante}
                        required
                    />
                </div>
                <div className="text-xl font-bold p-2 text-center">
                    <Button onClick={() => navigate('/')}>Conferir Sua inscrição</Button>
                </div>
            </div>
        )
    } else {
        return (
            
            <div>
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
                            disabled={true}
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
                            disabled={true}
                            required />
                    </div>
                    <div className="mb-5">
                        <Label htmlFor="dataNascimento" value="Data de Nascimento" />
                        <Datepicker
                            language="pt-BR"
                            labelTodayButton="Hoje"
                            labelClearButton="Limpar"
                            defaultValue={formatDate(profile.birth_date) ?? ""}
                            disabled={true}
                            onSelectedDateChanged={(date) => setProfile({ ...profile, birth_date: date.toISOString().replace('T', ' ').replace('Z', '') })}

                        />
                    </div>
                    <div className="mb-5">
                        <Label htmlFor="Genero" value="Gênero" />
                        <MultiSelect
                            options={genero}
                            value={genero.filter((item) => item.value === profile.gender)}
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
                            required
                            onChange={(e) => setProfile({ ...profile, team: e.target.value })}
                        />
                    </div>
                    <legend className="mb-4">Dados Da Prova</legend>

                    <div className="mb-5">
                        <Label htmlFor="Categories" value="Categoria" />
                        <Select id='categories' onChange={(e) => onSelectCategory(e)} required >
                            <option value="">Selecione uma categoria</option>
                            {categories.map((cat) => (
                                <option value={cat.value}>{cat.label}</option>
                            ))}
                        </Select>
                    </div>
                    
                    <fieldset className="flex max-w-md flex-col gap-4">
                        <legend className="mb-4">Escolha seu lote</legend>
                        {lots.map((lot: OneSelectedType, ) => (
                            <div className="flex items-center gap-2">
                                <Radio id={lot.label} name={lot.label} value={lot.value} required checked={lot.checked} 
                                    onClick={() => {
                                        setLots(lots.map((l) => ({...l, checked: l.value === lot.value})))
                                    }}
                                />
                                <Label htmlFor={lot.label}>{lot.label}</Label>
                            </div>
                        ))}
                    </fieldset>

                    <Button onClick={onHandleClick}>{'Fazer Inscrição'}</Button>    
                </form>
            </div>
        )
    }
}