
    import { useTranslation } from "react-i18next"
    import { NavLink } from "react-router-dom"
    export default function MainNavigation(){
        const {t}=useTranslation()
        return(
            <>
            <nav className="w-full flex justify-center gap-6 py-4 bg-white dark:bg-gray-900 shadow-md">
    <NavLink
        to="/"
        className={({ isActive }) =>
        `px-4 py-2 rounded-full text-xl font-semibold transition ${
            isActive
            ? "bg-purple-600 text-white shadow-lg"
            : "text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-700 hover:text-purple-700 dark:hover:text-white"
        }`
        }
    >
        {t("Home")}
    </NavLink>

    <NavLink
        to="/settings"
        className={({ isActive }) =>
        `px-4 py-2 rounded-full text-xl font-semibold transition ${
            isActive
            ? "bg-purple-600 text-white shadow-lg"
            : "text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-700 hover:text-purple-700 dark:hover:text-white"
        }`
        }
    >
        {t("Language")}
    </NavLink>
    </nav>
            </>
        )
    }