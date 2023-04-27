import React, { useEffect, useState, useRef } from 'react'
import Loading from '../Loading';
import '../pagesCss/docente.css'
import inicio from "../pagesImg/profesores.jpeg"
import Select from "react-select";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useGetMateriasQuery, useGetAsignaturasQuery, usePutMateriaMutation, useGetDocentesQuery, useAgregarAsignaturaMutation } from "../../api/apiSlice";
import { tiposOptiones } from "./selectOptions/Opcciones";
import { Link } from "react-router-dom";

const Docente = () => {

  const [datos, setDatos] = useState([]);
  const [asignaturaDatos, setAsignaturaDatos] = useState([]);
  const [ opciones, setOpciones ] = useState();
  const [ seleccion, setSeleccion ] = useState();
  const [ ids, setIds ] = useState();
  const [ tipo, setTipo ] = useState({
    label: 'materia'
  });
  const conten = useRef();
  const { data, isLoading, isError, error } = useGetDocentesQuery();
  const { data: dataMaterias, isLoading: materiaLoading,  error: materiaError } = useGetMateriasQuery();
  const { data: asignaturaData, isLoading: asignaturaLoading,  error: asignaturaError } = useGetAsignaturasQuery();
  const [ putMateria ] = usePutMateriaMutation();
  const [ agregarAsignatura ] = useAgregarAsignaturaMutation();

  useEffect(() => {
    if(dataMaterias && dataMaterias.materias){
      const nuevoDatos = dataMaterias.materias.map((item) => ({
        value: item._id,
        label: item.nombre
      }))
      setDatos(nuevoDatos)
    }

  }, [dataMaterias])


  useEffect(() => {
    if(asignaturaData && asignaturaData.asignaturas){
      const nuevoDato = asignaturaData.asignaturas.map((item) => ({
        value: item._id,
        label: item.nombre,
        materias: item.materias
      }))
      setAsignaturaDatos(nuevoDato)
    }
  }, [asignaturaData])


  useEffect(() => {
    const tipoOpciones = tiposOptiones.map((data, index) => ({
      value: index,
      label: data
    }))
    setOpciones(tipoOpciones)
  }, [])

  const handleOpen = (id) => {
    conten.current.classList.add('emergente_docentes')
    const body = document.body
    body.style.overflowY = 'hidden'
    setIds(id)
  }

  const handleClose = () => {
    conten.current.classList.remove('emergente_docentes')
    const body = document.body
    body.style.overflowY = 'auto'
  }


  const handleSubmit = async(e) => {
    e.preventDefault();

    if(tipo.label == 'materia'){

      try {
        const res = await putMateria({ docenteId: ids, materiaId: seleccion.value })
        const { data, error } = res
  
        if(data){
          if(data.status == 200){
            toast.success(res.data.mensaje, {
              position: toast.POSITION.TOP_RIGHT
            })
          }
  
          setTimeout(() => {
            conten.current.classList.remove('emergente_docentes')
          }, 1000)
        }
  
        if(error){
          if(error.status == 400){
            toast.warning(res.mensaje, {
              position: toast.POSITION.TOP_RIGHT
            })
          }else {
            toast.error(res.data.mensaje, {
              position: toast.POSITION.TOP_RIGHT
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }else {
      try {
        const res = await agregarAsignatura({ docenteId: ids, asignaturaId: seleccion.value })

        const { data, error } = res
  
        if(data){
          if(data.status == 200){
            toast.success(res.data.mensaje, {
              position: toast.POSITION.TOP_RIGHT
            })
          }
  
          setTimeout(() => {
            conten.current.classList.remove('emergente_docentes')
          }, 1000)
        }
  
        if(error){
          if(error.status == 400){
            toast.warning(res.mensaje, {
              position: toast.POSITION.TOP_RIGHT
            })
          }else {
            toast.error(res.data.mensaje, {
              position: toast.POSITION.TOP_RIGHT
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }


    // console.log(tipo)
    // console.log(seleccion.value)
    // console.log(ids)
  }

  if(isLoading || materiaLoading || asignaturaLoading){
    return <Loading />
  }

  if(isError){
    <div>{error.message}</div>
  }

  if(materiaError){
    <div>{materiaError.message}</div>
  }

  if(asignaturaError){
    <div>{asignaturaError.message}</div>
  }

  console.log(data)
  return (
    <section className='conten_docente'>
      <div className="card_conten_docente">

        {
          data?.usuarios?.map((item) => (
            <div key={item._id} className="item_docente">
              <div className="image_docente">
                <img src={inicio} alt="Este es el inicio" />
              </div>
              <span>{item.role}</span>
              <h3>{item.nombreCompleto}</h3>
              <div className="conctato_docen">
                <h4>Conctatos</h4>
                <h5>CORREO : {item.correo}</h5>
                <h5>CELULAR : {item.numero}</h5>
                {
                  !item.asignatura ? '' :
                  <div className='asignaturas'>
                    <p>{item.asignatura.tipo}: {item.asignatura.nombre}</p>
                    <h5>materias</h5>
                    <article className='asignaturas_materias'>
                      {
                        item.asignatura.materias.map((items, index) => (
                          <span key={index}>{items}</span>
                        ))
                      }
                    </article>
                  </div>
                }
                {item.materias ? <h5>MATERIAS : {item?.materias?.nombre}</h5> : ''}
              </div>
              <hr />
              {
                !item.materias && !item.asignatura ? <button onClick={() => handleOpen(item._id)}>Asignar materia</button> : ''
              }
              {/* aqui va las materias */}
            </div>
          ))
        }

      </div>

      <div ref={conten}>
        <div className="conten_form_docentes">
          <i onClick={handleClose} className="bi bi-x"></i>
          <form onSubmit={handleSubmit}>
            <Select 
              placeholder='Elije el tipo'
              options={opciones}
              onChange={setTipo}
            />
            <Select 
              placeholder={tipo.label == 'materia' ? 'Selecciona materia' : 'Selecciona la asignatura' }
              options={tipo.label == 'materia' ? datos: asignaturaDatos }
              onChange={setSeleccion}
            />
            <button type='submit'>Agregar</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}

export default Docente