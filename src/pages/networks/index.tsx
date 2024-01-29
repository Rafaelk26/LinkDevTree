import { useState, FormEvent, useEffect} from 'react'
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { db } from '../../services/firebaseConnection'
import {
  setDoc,
  doc,
  getDoc
 } from 'firebase/firestore'

export function Networks(){
  const [linkedin, setLinkedin] = useState("")
  const [telegram, setTelegram] = useState("")
  const [github, setGitHub] = useState("")


  useEffect(() => {
    function loadLinks(){
      const docRef = doc(db, "social", "link")
      getDoc(docRef)
      .then((snapshot) => {
        if(snapshot.data() !== undefined){
          setLinkedin(snapshot.data()?.linkedin)
          setTelegram(snapshot.data()?.telegram)
          setGitHub(snapshot.data()?.github)
        }

      })
    }

    loadLinks();
  }, [])

  function handleRegister(e: FormEvent){
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      linkedin: linkedin,
      github: github,
      telegram: telegram
    })
    .then(()=> {
      console.log("CADASTRADOS COM SUCESSO!")
    })
    .catch((error) => {
      console.log("ERRO AO SALVAR" + error)
    })

  }

  return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header/>

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-2">Link do LinkedIn</label>
        <Input
          type="url"
          placeholder="Digite a url do LinkedIn..."
          value={linkedin}
          onChange={ (e) => setLinkedin(e.target.value) }
        />

        <label className="text-white font-medium mt-2 mb-2">Link do Telegram</label>
        <Input
          type="url"
          placeholder="Digite a url do Telegram..."
          value={telegram}
          onChange={ (e) => setTelegram(e.target.value) }
        />

        <label className="text-white font-medium mt-2 mb-2">Link do GitHub</label>
        <Input
          type="url"
          placeholder="Digite a url do GitHub..."
          value={github}
          onChange={ (e) => setGitHub(e.target.value) }
        />

        <button 
        type="submit"
        className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
        >
          Salvar links
        </button>
      </form>
    </div>
  )
}