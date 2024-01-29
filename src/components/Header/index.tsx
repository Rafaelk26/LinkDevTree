import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebaseConnection'

import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export function Header(){

    const handleLogout = async () =>{
        await signOut(auth);
    }

    return(
        <>
            <header className="w-full max-w-2xl mt-4 px-1">
                <nav className='w-full bg-white h-12 flex items-center justify-between rounded-md px-3'>
                    <div className='flex gap-4 font-medium'>
                        <Link to={"/"}>
                            Home
                        </Link>
                        <Link to={"/admin"}>
                            Links
                        </Link>
                        <Link to={"/network"}>
                            Redes Sociais
                        </Link>
                    </div>

                    <button onClick={handleLogout}>
                        <BiLogOut size={30} color='#db2629'/>
                    </button>
                </nav>
            </header>
        </>
    )
}