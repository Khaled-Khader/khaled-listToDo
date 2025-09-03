
    import Button from '@mui/material/Button';
    import { useTranslation } from 'react-i18next';

    export default function Settings(){
        const {t,i18n}=useTranslation()
        function handleLang(lang){
            i18n.changeLanguage(lang)
        }
        return(
            <>
                <div className="w-full mt-7 max-w-3xl mx-auto border-2 border-purple-400 dark:border-purple-700 rounded-2xl bg-white dark:bg-gray-900 shadow-md py-8 px-6 flex flex-col gap-6 transition">
                <div className="text-center">
                    <p className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{t("Choose a Language")}</p>
                    
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <Button
                        variant="contained"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition"
                        onClick={() => handleLang("ar")}
                    >
                        Arabic
                    </Button>

                    <Button
                        variant="contained"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition"
                        onClick={() => handleLang("en")}
                    >
                        English
                    </Button>
                    <Button
                        variant="contained"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition"
                        onClick={() => handleLang("gr")}
                    >
                        Germany
                    </Button>

                    <Button
                        variant="contained"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition"
                        onClick={() => handleLang("fr")}
                    >
                        France
                    </Button>

                    <Button
                        variant="contained"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition"
                        onClick={() => handleLang("ch")}
                    >
                        China
                    </Button>

                    <Button
                        variant="contained"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition"
                        onClick={() => handleLang("jp")}
                    >
                        Japan
                    </Button>
                    <Button
                        variant="contained"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition"
                        onClick={() => handleLang("tu")}
                    >
                        Turkey
                    </Button>
                    </div>
                </div>
    </div>

            </>
        )
    }