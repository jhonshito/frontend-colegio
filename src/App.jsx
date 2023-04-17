
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
import Periodos from './components/pages/Periodos'
import Clases from './components/pages/Clases'
import Docente from './components/pages/Docente'
import AñosLetivos from './components/pages/AñosLetivos'
import PeriodosDelAñoLetivo from './components/pages/PeriodosDelAñoLetivo'
import CrearMaterias from './components/pages/CrearMaterias'

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
                <Route path='/inicio/pages/periodos' element={<Periodos />} />
                <Route path='/inicio/pages/listEstudiantes' element={<ListEstudiantes />} />
                <Route path='/inicio/pages/crearSalon' element={<CrearSalon />} />
                <Route path='/inicio/pages/clases/:id' element={<Clases />} />
                <Route path='/inicio/pages/docentes' element={<Docente />} />
                <Route path='/inicio/pages/letivo' element={<AñosLetivos />} />
                <Route path='/inicio/pages/periodosLetivos/:id' element={<PeriodosDelAñoLetivo />} />
                <Route path='/inicio/pages/materias' element={<CrearMaterias />} />
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
