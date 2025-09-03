import { useTranslation } from "react-i18next"
import Button from '@mui/material/Button';
import { useState } from "react";
export default function TaskForm({children,onSubmit,defaultValues}){
    const {t}=useTranslation()
    const [error,setError]=useState(false)
    function handleSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        if(data.title==='' || data.description===''){
            setError(true)
        }
        else{
            const edit={
            ...defaultValues,
            ...data
        }
        onSubmit(edit)
        }
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-3 items-center  ">
                        { error && <p className="text-red-700 text-center"> please enter a title || descreption</p>}
                        <input
                            name="title"
                            type="text"
                            maxLength={50}
                            defaultValue={defaultValues?.title}
                            placeholder={t("Enter a Title")}
                            className="flex-1 border border-purple-400 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm text-gray-800 dark:text-gray-100 dark:bg-gray-800"
                        />
                        <input
                            name="description"
                            type="text"
                            maxLength={50}
                            defaultValue={defaultValues?.description}
                            placeholder={t("Enter a Description")}
                            className="flex-1 border border-purple-400 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm text-gray-800 dark:text-gray-100 dark:bg-gray-800"
                        />
                        </div>
                        <div className=" flex gap-4 mt-4">
                            {children}
                        </div>
                
            </form>
        </>
    )
}