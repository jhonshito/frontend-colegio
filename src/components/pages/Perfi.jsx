import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { usuarios } from '../feacture/Usuarios'
import "../pagesCss/perfil.css"
import imgDefault from '../pagesImg/inicio.webp'
import { useGetUserQuery } from "../../api/apiSlice";

const Perfi = () => {

  const [foto, setFoto] = useState();
  const myInput = useRef(null);

  const handleClick = () => {
    myInput.current.click();
    console.log(myInput.current.files[0])
    setFoto(myInput.current.files[0])
  }

  const dispatch = useDispatch();
  let url = 'http://localhost:4000/user'
  const token = localStorage.getItem('token');
  useEffect(() => {
      fetch(url, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "x-access-token": token
          }
      })
      .then((res) => res.json())
      .then((data) => {
        dispatch(usuarios(data.user))
      })
      .catch((e) => console.log(e))
  }, []);


  const users = useSelector(state => state.users.estudiantes)
  useEffect(() => {
    console.log(users)
  }, []);

  const { data: user, isLoading, isError, error } = useGetUserQuery
  console.log(user)

  return (
    <section className='contetPerfil'>
      <h3 className='titlePerfil'>Bienvenido a tu perfil</h3>
      <article className='subContetPerfil'>
        <div className='contenImgPerfil'>
          <img src={foto ? foto : imgDefault} alt="" />

          <div className="upload-btn">
            <i onClick={handleClick} className='bx bxs-camera-plus'></i>
            <input ref={myInput} type="file" id="file-input" />
          </div>

        </div>

      </article>

      {
        users.role == 'estudiante'?

        <> 
          <span className='rolePerfil'>{users.role}</span>
          <h4 className='namePerfil'>{users.nombreCompleto}</h4>
          <section className='dataPerfil'>

            <div className="datosPerfil">
              <span>Datos del estudiantes</span>
              <p className='documento'><span className='span'>tipo de documento</span> {users.tipo_documento}</p>

              <p className='documento'><span className='span'>documento</span> {users.documento}</p>

              <p className='documento'><span className='span'>dirección</span> {users.direccion}</p>

              <p className='documento'><span className='span'>nivel academico</span> {users.nivel_academico}</p>

              <p className='documento'><span className='span'>grado</span> {users.grado}</p>

              <p className='documento'><span className='span'>correo</span> {users.correo}</p>

              <p className='documento'><span className='span'>fecha de nacimiento</span> {users.nacimiento}</p>

              <p className='documento'><span className='span'>numero de telefono</span> {users.numero}</p>
            </div>

            <div className='perfilTutor'>
              <span>Datos del acudiente</span>
                <p className='cudiente'><span className='span'>nombre del acudiente</span> {users.nombre_acudiente}</p>

                <p className='documento'><span className='span'>numero del acudiente</span> {users.numero_acudiente}</p>
            </div>
          </section>
        </>:

         <> 
          <span className='rolePerfil'>{users.role}</span>
          <h4 className='namePerfil'>{users.nombreCompleto}</h4>
          <section className='dataPerfil'>
  
            <div className="datosPerfil">
              <span>Datos del Docente</span>
  
              <p className='documento'><span className='span'>documento</span> {users.documento}</p>
  
              <p className='documento'><span className='span'>dirección</span> {users.direccion}</p>
  
              <p className='documento'><span className='span'>nivel academico</span> {users.nivel_academico}</p>
  
              <p className='documento'><span className='span'>correo</span> {users.correo}</p>
  
              <p className='documento'><span className='span'>fecha de nacimiento</span> {users.nacimiento}</p>
  
              <p className='documento'><span className='span'>numero de telefono</span> {users.numero}</p>

              <p className='documento'><span className='span'>años de experiencia</span> {users.años_de_experiencia}</p>
            </div>
  
            {/* <div className='perfilTutor'>
              <span>Datos del acudiente</span>
                <p className='cudiente'><span className='span'>nombre del acudiente</span> {users.nombre_acudiente}</p>
  
                <p className='documento'><span className='span'>numero del acudiente</span> {users.numero_acudiente}</p>
            </div> */}
          </section>
         </>
      }


    </section>

  )
}

export default Perfi
