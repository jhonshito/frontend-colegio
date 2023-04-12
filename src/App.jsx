
import './App.css'
import Matricula from './components/Matricula'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import CambiarContraseña from './components/CambiarContraseña'
import ContraseñaCambiada from './components/ContraseñaCambiada'
import Inicio from './components/Inicio'
import PagesHome from './components/PagesHome'
import Perfi from './components/pages/Perfi'
import { Provider } from "react-redux";
import { store} from "./app/store";
import AnotherInicio from './components/pages/AnotherInicio'
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import ListEstudiantes from './components/pages/ListEstudiantes'
import CrearSalon from './components/pages/CrearSalon'

function App() {

  return (
    <div>
      <BrowserRouter>
      <ApiProvider api={apiSlice}>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Matricula />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cambiarContraseña' element={<CambiarContraseña />} />
            <Route path='/contrasenaCambiada/:id' element={<ContraseñaCambiada />} />
            <Route path='/inicio' element={<Inicio />} >
              <Route path='/inicio/pages' element={<PagesHome/>}>
                <Route path='/inicio/pages/perfil' element={<Perfi />} />
                <Route path='/inicio/pages/pagesInicio' element={<AnotherInicio />} />
                <Route path='/inicio/pages/listEstudiantes' element={<ListEstudiantes />} />
                <Route path='/inicio/pages/crearSalon' element={<CrearSalon />} />
              </Route>
            </Route>
          </Routes>
        </Provider>
      </ApiProvider>
      </BrowserRouter> 
    </div>
  )
}

export default App
