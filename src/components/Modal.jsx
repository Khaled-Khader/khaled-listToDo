import { createPortal } from "react-dom";
import { useEffect,useRef } from "react";
export default function Modal({children}){
    
    const dialog=useRef()

    useEffect(()=>{
        const end=dialog.current
        end.showModal()
        return ()=>{
            end.close()
        }
    },[])

    return createPortal(
        <dialog  ref={dialog} className="flex flex-col items-center rounded-2xl border  border-purple-500 w-full max-w-xl m-auto py-8 px-6 shadow-lg bg-white dark:bg-gray-900 transition">
            {children}
        </dialog>,
        document.getElementById("modal")
    )
}