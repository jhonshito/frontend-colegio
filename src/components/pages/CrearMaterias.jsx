import React, { useEffect, useState, useRef } from 'react'
import '../pagesCss/crearMaterias.css'
import Select from "react-select";
import { materiasOptions, tiposOptiones, asignaturaOptiones } from "./selectOptions/Opcciones";
import { useGetLetivoQuery, useCreateMateriaMutation, useGetMateriasQuery, useCreateAsignaturaMutation, useGetAsignaturasQuery } from "../../api/apiSlice";
import letivo_año from "../pagesImg/letivo_año.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';

const CrearMaterias = () => {

    const { data, isLoading, error } = useGetLetivoQuery();
    const [ createMateria ] = useCreateMateriaMutation();
    const [ createAsignatura ] = useCreateAsignaturaMutation();
    const { data: dataMateria, isLoading: materiaLoading, error: materiaError } = useGetMateriasQuery();
    const { data: dataAsignatura, isLoading: loadingAsignatura, error: asignaturaError } = useGetAsignaturasQuery();

    const [options, setOptions] = useState([]);
    const [tipoOptions, setTipoOptions] = useState([]);
    const [asinaturas, setAsignaturas] = useState([]);
    const [AnotherOptions, setAnotherOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [asignatruaSelectedOption, setAsignaturaSelectedOption] = useState(null);
    const [tiposelectedOption, setTipoSelectedOption] = useState('');
    const [anotherSelectedOption, setAnotherSelectedOption] = useState(null);
    const [formText, setFormText] = useState('');
    const conten = useRef(null);

    useEffect(() => {
        const opciones = materiasOptions.map((data, index) => ({
            value: index,
            label: data,
            anotherLabel: index
        }))
        setOptions(opciones)

        const tipoOpciones = tiposOptiones.map((data, index) => ({
            value: index,
            label: data
        }))
        setTipoOptions(tipoOpciones)

        const asignaturasOptions = asignaturaOptiones.map((data, index) => ({
            value: index,
            label: data.name,
            items: data.items
        }))

        setAsignaturas(asignaturasOptions);
    }, [])

    useEffect(() => {
        if(data && data.años_letivos){

            const anotherOpcciones = data.años_letivos.map((datos) => ({
                value: datos._id,
                label: datos.nombre,
                anotherLabel: datos.jornada,
                image: letivo_año
            }))
            setAnotherOptions(anotherOpcciones)
        }

    }, [data])

    const handleOpen = () => {
        conten.current.classList.add('ventana_materias')
    }

    const handelClose = () => {
        conten.current.classList.remove('ventana_materias')
    }

    const handleDatos = async(e) => {
        e.preventDefault();
        if(tiposelectedOption.label == 'materia'){

            try {
                const res = await createMateria({ nombre: selectedOption.label, idLetivo: anotherSelectedOption.value, descripcion: formText, tipo: tiposelectedOption.label });
                if(res.data.status == 200){
                    toast.success(res.data.mensaje, {
                        position: toast.POSITION.TOP_RIGHT
                    })
    
                    setTimeout(() => {
                        conten.current.classList.remove('ventana_materias')
                    }, 2000)
                }else if(res.data.status == 400){
                    toast.warning(res.data.mensaje, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }else {
                    toast.error(res.data.mensaje, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }else {
            try {
                const res = await createAsignatura({ nombre: asignatruaSelectedOption.label, idLetivo: anotherSelectedOption.value, descripcion: formText, tipo: tiposelectedOption.label, materias: asignatruaSelectedOption.items });
                if(res.data.status == 200){
                    toast.success(res.data.mensaje, {
                        position: toast.POSITION.TOP_RIGHT
                    })
    
                    setTimeout(() => {
                        conten.current.classList.remove('ventana_materias')
                    }, 2000)
                }else if(res.data.status == 400){
                    toast.warning(res.data.mensaje, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }else {
                    toast.error(res.data.mensaje, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
    }

    if(isLoading){
        return <Loading />
    }

    if(error){
        return <div>{error.message}</div>
    }

    if(materiaLoading){
        return <Loading />
    }

    if(materiaError){
        return <div>{materiaError.message}</div>
    }

    if(loadingAsignatura){
        return <Loading />
    }

    if(asignaturaError){
        return <div>{asignaturaError.message}</div>
    }

    console.log(dataAsignatura)
  return (
    <section className='conten_materias'>
        <div className="cabezera_materias">
            <button onClick={handleOpen}>
                <span>crear nueva materia</span>
                <i className="bi bi-plus-lg"></i>
            </button>
        </div>
        <div ref={conten}>
            <div className="form_materias">
                <i onClick={handelClose} className="bi bi-x"></i>
                <form onSubmit={handleDatos}>
                    <Select 
                        options={tipoOptions}
                        onChange={setTipoSelectedOption}
                        placeholder='Elije el tipo'
                    />

                    {
                        tiposelectedOption.label == 'materia' ?
                        (
                        <Select 
                            options={options}
                            onChange={setSelectedOption}
                            placeholder='Elije la materia que deseas crear 😊'
                            formatOptionLabel={({ label, anotherLabel }) => (
                                <div className='conten_materias_options'>
                                    <span>{anotherLabel}</span>
                                    <span>{label}</span>
                                </div>
                            )}
                        />): <Select 
                                options={asinaturas}
                                placeholder='Ingresa la asignatura'
                                onChange={setAsignaturaSelectedOption}
                                formatGroupLabel={({ label, items }) => (
                                    <div className='conten_materias_options'>
                                        <div>
                                            <span>{label}</span>
                                            {
                                                items.map((data, index) => (
                                                    <span key={index}>{data}</span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}
                                />
                    }
                    <Select 
                        options={AnotherOptions}
                        onChange={setAnotherSelectedOption}
                        placeholder='Selecciona el año letivo que pertenecera la materia'
                        formatOptionLabel={({ label, anotherLabel, image }) => (
                            <div className='conten_materias_options'>
                                <img src={image} alt="" />
                                <span>{label}</span>
                                <span>jornada : {anotherLabel}</span>
                            </div>
                        )}
                    />
                    <textarea name="" id="" cols="30" rows="10" onChange={(e) => setFormText(e.target.value)} placeholder='Ingresa descripcion de la nueva materia'></textarea>
                    <button type='submit'>Crear materia</button>
                </form>
            </div>
        </div>
        <div className="card_conten_materias">
            {
                dataMateria.materias.map((item) => (
                    <div key={item._id} className="item_card_materis">
                        <h3>{item.nombre}</h3>
                        <p>{item.descripcion}</p>
                    </div>
                ))
            }
        </div>
        <ToastContainer />
    </section>
  )
}

export default CrearMaterias