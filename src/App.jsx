import { createBrowserRouter,RouterProvider } from "react-router-dom"
import './i18n'
import RootPage from "./pages/RootLayout"
import ToDoListPage from "./pages/ToDoList"
import SettingsPage from "./pages/Settings"
import { store } from "./redux"
import { Provider } from "react-redux"
export default function App(){

  const router=createBrowserRouter([
    {
      path:'/',
      element:<RootPage/>,
      children:[
        {
          index:true,
          element:<ToDoListPage/>
        },
        {
          path:'/settings',
          element:<SettingsPage/>
        }
      ]
    }
  ])
  return(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    
  )
}