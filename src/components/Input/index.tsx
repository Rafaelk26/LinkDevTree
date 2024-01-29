import { InputHTMLAttributes } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: inputProps){
    return(

        <input className="border-0 h-9 rounded-md outline-none px-2 mb-13 mt-3" {...props} />

    )
}