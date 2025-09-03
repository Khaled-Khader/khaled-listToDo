import { Outlet } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"
export default function RootPage(){
    return(
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-all">
            <MainNavigation/>
            <Outlet/>
        </div>
    )
}