import { useState, FormEvent } from "react"
import { Link } from "react-router-dom"
import { Input } from '../../components/Input'

import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from "react-router-dom";


export function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const routeAdm = useNavigate()

    function handleSubmit(e: FormEvent){
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
       
        if(data.email === '' || data.password === ''){
            alert('Preencha todos os campos!')
            return;
        }

        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(()=>{
            alert('Logado com Sucesso!!!')
            routeAdm('/admin', { replace: true })
        })
        .catch((e)=>{
            alert('Erro ao fazer o login!')
            console.error(e);
        })
    }
  

    return(
        <>
            <div className="flex w-full h-screen items-center justify-center flex-col">
                <Link to={"/"}>
                    <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
                        <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                    </h1>
                </Link>
                <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
                    <Input placeholder="Email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <Input placeholder="Senha" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <button type="submit" className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white mt-3">Acessar</button>
                </form>
            </div>
        </>
    )
}