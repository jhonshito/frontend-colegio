import React, { useEffect, useRef, useState } from 'react'
import { useGetGradosQuery, useGetEstudiantesQuery, useGetDocentesQuery, useCrearGradoMutation } from "../../api/apiSlice";
import Loading from '../Loading';
import '../pagesCss/crearGrados.css'
import gradoImg from '../pagesImg/grado.jpg'
import inicio from '../pagesImg/inicio.webp'
import Select from 'react-select';
import { gradoPrimaria, gradoSecundaria, tipoGrado } from '../pages/selectOptions/Opcciones'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearGrados = () => {

    const { data, isLoading, error } = useGetGradosQuery();
    const { data: estudiantesData, isLoading: estudiantesLoading, error: estudiantesError } = useGetEstudiantesQuery();
    const { data: docentesData, isLoading: docentesLoading, error: docentesError } = useGetDocentesQuery();
    const [ crearGrado ] = useCrearGradoMutation();

    const [ primaria, setPrimaria ] = useState([]);
    const [ secundaria, setSecundaria ] = useState([]);
    const [ tipoGrados, setTipoGrado ] = useState([]);

    const [dataTipo, setDataTipo] = useState('');
    const [estudinates, setEstudinates] = useState([]);
    const [docentes, setDocentes] = useState([]);

    const [grado, setGrado] = useState();
    const [multiEstudiantes, setMultiEstudinate] = useState([]);
    const [selectDocentes, setSelectDocentes] = useState();
    const body = document.body;
    const conten = useRef();

    const handleOpen = () => {
        conten.current.classList.add("emergente_grado")
        body.style.overflowY = 'hidden'
    }

    const handleClose = () => {
        conten.current.classList.remove("emergente_grado")
        body.style.overflowY = 'auto'
    }

    useEffect(() => {
        const optionPrimaria = gradoPrimaria.map((item, index) => ({
            value: index,
            label: item
        }))
        setPrimaria(optionPrimaria)

        const optionSecundaria = gradoSecundaria.map((item, index) => ({
            value: index,
            label: item
        }))
        setSecundaria(optionSecundaria)

        const optionTipoGrado = tipoGrado.map((item, index) => ({
            value: index,
            label: item
        }))
        setTipoGrado(optionTipoGrado)
    }, [])

    useEffect(() => {
        if(estudiantesData && estudiantesData.user){
            const estudiantesFetch = estudiantesData.user.map((item) => ({
                value: item._id,
                image: inicio,
                label: item.nombreCompleto
            }))
            setEstudinates(estudiantesFetch)
        }

    }, [estudiantesData])

    useEffect(() => {
        if(docentesData && docentesData.usuarios){
            const docentesFetch = docentesData.usuarios.map((item) => ({
                value: item._id,
                image: inicio,
                label: item.nombreCompleto
            }))
            setDocentes(docentesFetch)
        }
    }, [docentesData])

    const handleSubmit = async(e) => {
        e.preventDefault();

        let newIds = [];

        multiEstudiantes.map((item) => {
            newIds.push(item.value)
        })

        switch(true){
            case !dataTipo:
                toast.warning('Por favor elije el nivel del grado', {
                    position: toast.POSITION.TOP_RIGHT
                })
                break;
            case !grado:
                toast.warning('Por favor elije el grado', {
                    position: toast.POSITION.TOP_RIGHT
                })
                break;
            case !selectDocentes:
                toast.warning('Por favor elije el director del grado', {
                    position: toast.POSITION.TOP_RIGHT
                })
                break;
            case newIds.length == 0:
                toast.warning('Por favor selecciona a todos los estudiantes que estaran en el grado', {
                    position: toast.POSITION.TOP_RIGHT
                })
                break;

            default:
                try {
                    const res = await crearGrado({ nombre: grado.label, director: selectDocentes.value, estudiantes: newIds })
                    const {data, error} = res
                    if(data){
                        if(data.status == 200){
                            toast.success(res.data.mensaje, {
                                position: toast.POSITION.TOP_RIGHT
                            })
                            setTimeout(() => {
                                conten.current.classList.remove("emergente_grado")
                                body.style.overflowY = 'auto'
                            }, 2000)
                        }
                    }

                    if(error){
                        if(error.data.status == 400){
                            toast.warning(`${res.error.data.mensaje} ${grado.label}`, {
                                position: toast.POSITION.TOP_RIGHT
                            })
                        }else {
                            toast.error(`${res.error.data.mensaje}`, {
                                position: toast.POSITION.TOP_RIGHT
                            })
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
                break;
        }

        // console.log(newIds)
    }

    if(isLoading || estudiantesLoading || docentesLoading){
        return <Loading />
    }
    
    if(error){
        <div>{error.message}</div>
    }

    if(estudiantesError){
        <div>{estudiantesError.message}</div>
    }

    if(docentesError){
        <div>{docentesError.message}</div>
    }

    // console.log(data)

  return (
    <section className='conten_grados'>
        <div className="conte_button_grados">
            <button onClick={handleOpen}>
                <i className="bi bi-plus"></i>
                <span>Crear nuevo grado</span>
            </button>
        </div>

        <div className="conten_card_grados">
            {
                data.grados.map((item) => (
                    <div key={item?._id} className="item_grados">
                        <div className="conte_img_grado">
                            <img src={gradoImg} alt="esta es la image que tendran todos los grados" />
                            <div className='conte_name_grado'>
                                <h2>Grado</h2>
                                <p>{item?.nombre}</p>
                            </div>
                            <div className="conte_data_docente">
                                <p>Director de grupo</p>
                                <div className="conten_img_director_grado">
                                    <div>
                                        <img src={inicio} alt="esta es la imagen por del director de grupo" />
                                    </div>
                                    <p>{item?.director_de_grupo?.nombreCompleto}</p>
                                </div>
                                <div className="conte_estudiantes_data">
                                    <p>estudiantes</p>
                                    <p>{item?.estudiantes.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

        <div ref={conten}>
            <div className="ventana_grado">
                <i onClick={handleClose} className="bi bi-x"></i>
                <form onSubmit={handleSubmit}>
                    <Select 
                        options={tipoGrados}
                        onChange={setDataTipo}
                        placeholder='Elije el nivel academico del nuevo grado'
                    />
                    <Select 
                        options={dataTipo.label == 'primaria' ? primaria : secundaria }
                        placeholder='Elije el nuevo grado'
                        onChange={setGrado}
                    />
                    <Select 
                        options={docentes}
                        formatOptionLabel={({ label, image }) => (
                            <div className='estudiantes_form'>
                                <img src={image} alt="Esta es la imagen por defecto de los estudiantes" />
                                <p>{label}</p>
                            </div>
                        )}
                        placeholder='Elije el docente que sera el director del grado'
                        onChange={setSelectDocentes}
                    />
                    <Select 
                        placeholder='Elije los estudiantes que perteneceran al grado'
                        options={estudinates}
                        formatOptionLabel={({ label, image }) => (
                            <div className='estudiantes_form'>
                                <img src={image} alt="Esta es la imagen por defecto de los estudiantes" />
                                <p>{label}</p>
                            </div>
                        )}
                        isMulti
                        onChange={setMultiEstudinate}
                    />
                    <button type='submit'>Crear grado</button>
                </form>
            </div>
        </div>
        <ToastContainer />
    </section>
  )
}

export default CrearGrados
