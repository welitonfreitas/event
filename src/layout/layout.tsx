import React from "react"
import { Link, Outlet } from "react-router-dom"
import { useAuth } from "../modules/auth/hooks/useAuth"



const BrowserLayout = () => {

    const { session, user, logOut } = useAuth()
    
    return (
        <>
            <header className="flex flex-row items-center justify-between p-4 h-20 fixed w-full top-0 bg-white">
                <Link to="/" className="text-4xl font-bold">BEAPE<span className=" text-green-600">.</span></Link>
                <div className="flex flex-row items-center gap-4 font-normal">
                    <Link to="/events" >EVENTOS</Link>
                    <Link to="/ranking" >RANKING</Link>
                    {!session ? 
                        < Link to="/login" >LOGIN</Link>
                    : 
                        <a onClick={logOut} >LOGOUT</a>}
                    <Link to="/event/new" className="bg-green-600 p-2 text-white rounded-sm hidden" >Criar Evento</Link>
                </div>
            </header>
            <main className="container mx-auto p-5 md:max-w-screen-lg mt-20">
                <Outlet />
            </main>
            <footer className="w-full p-4 bg-slate-700 text-white shadow md:flex md:flex-col md:p-6 mt-auto">
                <div className="flex items-center justify-between p-4">
                    <div className="">
                        <div className="text-2xl font-bold">BEAPE<span className=" text-green-600">.</span></div>
                        <div className="text-xs">Sua plataforma de eventos esportivos</div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Link to="/events" >Eventos</Link>
                        <Link to="/ranking" >Ranking</Link>
                        <Link to="/login" >Login</Link>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row justify-start items-center gap-3 p-4">
                        <div className="text-xs">Powerd by Setor Tecnologia</div>
                        <div className="text-xs">Todos os direitos reservados</div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default BrowserLayout