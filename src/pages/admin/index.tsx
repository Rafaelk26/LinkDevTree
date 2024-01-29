import { useState, FormEvent, useEffect } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { db } from '../../services/firebaseConnection'; // Importaçõa do banco do firebase criado.

import { 
    addDoc, // Cria id's pelo banco do Firebase
    collection, // Cria uma coleção, uma referência para ser adicionado dados ao banco.
    onSnapshot, // Monitora todos os status do banco em tempo real, quando ocorre um get, post, put ou delete.
    query, // Faz a requisição direta no banco.
    orderBy, // Ordena os dados de maneira 'asc' ou 'desc'.
    doc, // Utiliza-se como parâmetro de função quando se percorre o array da promise vinda do banco, serve para acessar cada objeto unitariamente.
    deleteDoc // Serve para deletar um documento do banco do Firebase.
} from 'firebase/firestore';

import { BiBadgeCheck } from 'react-icons/bi';
import { FiTrash } from "react-icons/fi";

export function Admin(){
    
    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [links, setLinks] = useState<listaProps[]>([]);
    const [textColorInput, setTextColorInput] = useState("#f1f1f1");
    const [bgColorInput, setBgColorInput] = useState("#121212");

    interface listaProps {
        id: string;
        name: string;
        url: string;
        color: string;
        bg: string;
    }

    useEffect(()=>{
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("createdNewDate", "asc"));
        const unSub = onSnapshot(queryRef, (snapshot)=>{
            const lista: listaProps[] = [];

            snapshot.forEach((doc)=> {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    color: doc.data().text,
                    bg: doc.data().bg
                })
            })

            setLinks(lista)
        });

        return ()=> {
            unSub();
        }
    },[])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if(nameInput === '' && urlInput === '' || urlInput === '' || nameInput === ''){
            alert('Preencha todos os campos para cadastrar!');
            return;
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: bgColorInput,
            text: textColorInput,
            createdNewDate: new Date()
        }) 
        .then(()=> {
            console.log('Cadastrado com Sucesso!');
            setNameInput("")
            setUrlInput("")
        })
        .catch((err)=>{
            console.log('Erro ao cadastrar no banco:', err)
        })
        
        return;
    }

    function changeInput() {
        if(urlInput.length === 0){
            setUrlInput("https://");
        }
        return;
    }

    async function handleDelete(id: string){
        const deleteLink = doc(db, "links", id)
        await deleteDoc(deleteLink)
        return;
    }

    return(
        <>
            <div className="flex items-center flex-col min-h-screen pb-7 px-2">
                <Header />

                <form onSubmit={handleSubmit} className="flex flex-col mt-5 mb-1 w-full max-w-xl">

                    <label className="text-white font-medium mt-1 mb-1">Nome do link</label>
                    <Input 
                    placeholder="Digite o nome do link"
                    type="text"
                    onChange={(e)=> setNameInput(e.target.value) }
                    value={nameInput}
                    className="mb-3 rounded-md py-1.5 placeholder: px-2"
                    />

                    <label className="text-white font-medium mt-1 mb-1">URL do link</label>
                    <Input
                    placeholder="Digite a URL do link"
                    type="text"
                    onFocus={changeInput}
                    onChange={(e)=> setUrlInput(e.target.value)}
                    value={urlInput}
                    className="mb-3 rounded-md py-1.5 placeholder: px-2"
                    />

                    <section className="flex my-4 gap-5 ">
                        <div className="flex gap-3">
                            <label className="text-white font-medium mt-1 mb-1">Cor do link</label>
                            <input 
                            type="color"
                            onChange={(e)=> setTextColorInput(e.target.value)}
                            value={textColorInput}
                            className="cursor-pointer" 
                            />
                        </div>
                        <div className="flex gap-3">
                            <label className="text-white font-medium mt-1 mb-1">Fundo do link</label>
                            <input 
                            type="color"
                            onChange={(e)=> setBgColorInput(e.target.value)}
                            value={bgColorInput}
                            className="cursor-pointer" 
                            />
                        </div>
                    </section>
                    
                    {
                    nameInput !== '' ? 
                        <div className="flex items-center justify-start flex-col mb-7 p-1 rounded-md border-gray-100/25 border">
                            <label className="text-white font-medium mt-1 mb-3">Veja como está ficando</label>
                            <article 
                            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded-md py-3 px-1"
                            style={{marginBottom: 8, marginTop: 8, backgroundColor: bgColorInput}}
                            >
                                <p className="font-bold"
                                style={{color: textColorInput}}
                                >
                                    {nameInput}
                                </p>
                            </article>
                        </div> : 
                        <></>
                    }

                    <button
                    type="submit"
                    className="bg-blue-900 rounded-md text-white font-medium gap-2 py-2 flex justify-center items-center mb-7">
                        <BiBadgeCheck size={25} color="#fff"/>
                        Cadastrar
                    </button>

                </form>

                <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2> 
                
                {links.map((item)=>(
                    <article 
                    key={item.id}
                    className="flex items-center justify-between w-11/12 max-w-xl rounded-md py-3 px-3 mb-2"
                    style={{color: item.color , backgroundColor: item.bg}}
                    >
                        <p className="font-medium">{item.name}</p>
                        <div className="flex justify-center">
                            <button onClick={()=> handleDelete(item.id)}>
                                <FiTrash size={18} color="#fff" />
                            </button>
                        </div>
                    </article>
                ))}   

            </div>    
        </>
    )
}