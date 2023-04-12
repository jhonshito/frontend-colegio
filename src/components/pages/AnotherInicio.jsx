import React, { useEffect, useState } from 'react'
import "../pagesCss/anotherInicio.css"
import { useGetUserQuery } from "../../api/apiSlice";
import Loading from '../Loading';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Secretaria from './Secretaria';
import Cordinador from './Cordinador';
import Retor from './Retor';
import Docente from './Docente';
import Estudiantes from './Estudiantes';

const AnotherInicio = () => {
  const [datos, setDatos] = useState([]);
  const { data: users = [], isLoading, error } = useGetUserQuery();

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error al obtener usuarios: {error.mensaje}</div>
  }
  
  console.log(users.user)


  return (
    <section>
        {
          users.user.role == 'secretaria' ? (<Secretaria user={users.user} />): users.user.role == 'cordinador' ?(<Cordinador />): users.user.role == 'retor' ? (<Retor />): users.user.role == 'profesor' ?(<Docente />): users.user.role == 'estudiante' ?(<Estudiantes />):('')
        }
        <ToastContainer />
    </section>
  )
}

export default AnotherInicio