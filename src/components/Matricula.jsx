import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/matricula.css'
import school from '../imgs/school.jpg'
import { Link, useNavigate } from "react-router-dom";

const Matricula = () => {

    const [datos, setDatos] = useState(
        {
            role: '',
            nombreCompleto: '',
            nacimiento: '',
            tipo_documento: '',
            documento: '',
            direccion: '',
            numero: '',
            correo: '',
            nombre_acudiente: '',
            nivel_academico: '',
            años_de_experiencia: '',
            grado: '',
            numero_acudiente: '',
            contraseña: ''
        }
    );

    const { role, nombreCompleto, nacimiento, tipo_documento, documento, direccion, numero, correo, nombre_acudiente, nivel_academico, años_de_experiencia, grado, numero_acudiente, contraseña } = datos

    const navigate = useNavigate();

    const [nivel, setNivel] = useState('');
    const [open, setOpen] = useState(false);
    const myRef = useRef('');
    const nivelAcademico = useRef(null);
    const form = useRef();

    const handleData = (role) => {
        // e.preventDefault()
        setNivel(nivelAcademico.current.value)
    }

    const handleSee = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChangue = (event) => {
        const { name, value } = event.target;
        setDatos(datos => ({ ...datos, [name]: value }));
        // handleData(datos.role)
        // console.log(datos)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        switch(true){
            case !role:
                toast.error('El campo del Role es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                })
                break;
            case !nombreCompleto:
                toast.error('El campo Nombre completo es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                })
                break;
            case role !== 'estudiante' ? '': !tipo_documento :
                toast.error('El campo Tipo de documento es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                })
                break;
            case !documento:
                toast.error('El campo del Documento es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                })
                break;
            case !nacimiento:
                toast.error('El campo de la Fecha de nacimiento es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case !nivel_academico:
                toast.error('El campo del Nivel academico es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case role !== 'estudiante'? '': !grado:
                toast.error('El campo del Grado es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case role !== 'estudiante' ? '': !nombre_acudiente:
                toast.error('El campo Nombre del acudiente es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case role !== 'estudiante' ? !correo: '':
                toast.error('El campo del Correo es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case role !== 'estudiante' ? !numero: '':
                toast.error('El campo del Numero telefonico es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case role !== 'estudiante' ? !años_de_experiencia: '':
                toast.error('El campo de los Años de experiencia es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case !contraseña:
                toast.error('El campo del la Contraseña es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            
            default:

            let url = 'http://localhost:4000/'
                if(role !== 'estudiante'){
                    const objeData = {
                        role,
                        nombreCompleto,
                        nacimiento,
                        documento,
                        direccion,
                        numero,
                        correo,
                        nivel_academico,
                        años_de_experiencia,
                        contraseña
                    }
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(objeData)
                    })
                    .then((res) => res.json())
                    .then((data) => {

                        if(data.token){
                            localStorage.setItem('token', data.token)
                            toast.success(data.mensaje, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            setTimeout(() => {
                                navigate("/inicio/pages/perfil")
                            }, 2000)
                        }else {
                            toast.error(data.mensaje, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        }

                    })
                    .catch((err) => console.log(err))
                    
            }else {

                const objeData = {
                    role,
                    nombreCompleto,
                    nacimiento,
                    tipo_documento,
                    documento,
                    direccion,
                    numero,
                    correo,
                    nombre_acudiente,
                    nivel_academico,
                    grado,
                    numero_acudiente,
                    contraseña
                }

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objeData)
                })
                .then((res) => res.json())
                .then((data) => {
                    if(data.token){
                        localStorage.setItem('token', data.token)
                        toast.success(data.mensaje, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setTimeout(() => {
                            navigate("/inicio/pages/perfil")
                        }, 2000)
                    }else {
                        toast.error(data.mensaje, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                })
                .then((err) => console.log(err))
            }

                // console.log(data)
                form.current.reset();
                break;
        }

        console.log(datos)

    }

  return (
    <main>
    <section className='parentContainer'>
        <div className='containerForm'>
            <div className='form'>
                <h2 className='titulo'>Matricula estudiantil</h2>
                {
                    role !== 'estudiante'?
                    <>
                        <p className='tituloData'>Los campos con el <span className='campo'>*</span> son obligatorio</p>
                        <p className='tituloData'>Por favor ingresa tus datos</p>
                    </>: ''
                }
                <form ref={form} onSubmit={handleSubmit}>
                    <div className='formulario'>

                        <div className='contentLabel'>
                            <div className="obligatorio">
                                <label htmlFor="role">Elije tu Role</label>
                                <span>*</span>
                            </div>
                            <select onChange={handleChangue} id='Role' name='role' ref={myRef}>
                                <option value="role">Cual es tu Role</option>
                                <option value="estudiante">Estudiante</option>
                                <option value="profesor">Docente</option>
                                <option value="secretaria">Secretaria</option>
                                <option value="cordinador">Coridnador</option>
                                <option value="retor">Rector</option>
                            </select>
                        </div>

                        <div className='contentLabel'>
                            <div className="obligatorio">
                                <label htmlFor="nombre">Nombre completo</label>
                                <span>*</span>
                            </div>
                            <input id='nombre' type="text" placeholder='Ingresa tu nombre completo' name='nombreCompleto' onChange={handleChangue} autoComplete='off' />
                        </div>

                        {
                            role !== 'estudiante' ?
                            '':
                            <div className='contentLabel'>
                                <div className="obligatorio">
                                    <label htmlFor="document">Tipo de documento</label>
                                    <span>*</span>
                                </div>
                                <select onChange={handleChangue} id='document' name='tipo_documento' ref={myRef}>
                                    <option value="tipo">Ingresa tipo de documento</option>
                                    <option value="CC">Cedula</option>
                                    <option value="TJ">Tarjeta de identidad</option>
                                </select>
                            </div>
                        }

                        <div className='contentLabel'>
                            <div className="obligatorio">
                                <label htmlFor="documento">Numero del documento</label>
                                <span>*</span>
                            </div>
                            <input id='documento' type="text" placeholder='Ingresa tu numero de documento' name='documento' onChange={handleChangue} autoComplete='off' />
                        </div>

                        <div className='contentLabel'>
                            <div className="obligatorio">
                                <label htmlFor="nacimiento">Fecha de nacimiento</label>
                                <span>*</span>
                            </div>
                            <input id='nacimiento' type="date" placeholder='Ingresa tu numero de documento' onChange={handleChangue} name='nacimiento' autoComplete='off' />
                        </div>

                        <div className="contentLabel">
                            <div className="obligatorio">
                                {
                                    role !== 'estudiante'?
                                    <>
                                        <label htmlFor="correo">Correo</label>
                                        <span>*</span>
                                    </>:
                                    <label htmlFor="correo">Correo</label>
                                }
                            </div>
                            <input id='correo' name='correo' onChange={handleChangue} autoComplete='off' type="email" placeholder='Ingresa tu correo' />
                        </div>

                        <div className="contentLabel">
                            <div className="obligatorio">
                                {
                                    role !== 'estudiante'?
                                    <>
                                        <label htmlFor="celular">Numero de telefono</label>
                                        <span>*</span>
                                    </>:
                                    <label htmlFor="celular">Numero de telefono</label>
                                }
                            </div>
                            <input id='celular' onChange={handleChangue} autoComplete='off' type="text" placeholder='Ingresa tu numero' name='numero' />
                        </div>

                        <div className="contentLabel">
                            <div className="obligatorio">
                                <label htmlFor="">Dirreción</label>
                            </div>
                            <input type="text" onChange={handleChangue} id="direccion" name="direccion" placeholder="Ingrese su dirección aquí" autoComplete='off' />
                        </div>

                        <div className="contentLabel">
                            <div className="obligatorio">
                                <label htmlFor="nivel">Nivel academico</label>
                                <span>*</span>
                            </div>
                            <select onChange={handleChangue} name="nivel_academico" id='nivel' ref={nivelAcademico}>
                                {
                                    role !== 'estudiante'?
                                    <>
                                        <option value="nivel">Ingresa tu nivel profesional</option>
                                        <option value="bachillerato">Bachiller</option>
                                        <option value="tecnico">Tecnico</option>
                                        <option value="tecnologo">Tecnologo</option>
                                        <option value="profesional">Profesional</option>
                                    </>:
                                    <>
                                        <option value="nivel">Ingresa grado a cursar</option>
                                        <option value="primaria">Primaria</option>
                                        <option value="secundaria">Secundaria</option>
                                    </>
                                }
                            </select>
                        </div>

                        {
                            role !== 'estudiante'?
                            <div className="contentLabel">
                                <div className="obligatorio">
                                    <label htmlFor="nivel">Años de experiencia</label>
                                    <span>*</span>
                                </div>
                                <select onChange={handleChangue} name="años_de_experiencia">
                                    <option value="experiencia">Ingresa tus años de experiencia</option>
                                    <option value="1-2">1 a 2</option>
                                    <option value="2-3">2 a 3</option>
                                    <option value="4-5">4 a 5</option>
                                    <option value="6-7">6 a 7</option>
                                    <option value="8-9">8 a 9</option>
                                    <option value="mas">mucho mas</option>
                                </select>
                            </div>:
                            <div className="contentLabel">
                                <div className="obligatorio">
                                    <label htmlFor="grado">Grado</label>
                                    <span>*</span>
                                </div>
                                <select onChange={handleChangue} id='grado' name='grado'>
                                    <option value="cursos">Ingresa tu grado a cursar</option>
                                    {
                                        nivel_academico == null ? '':
                                        <>
                                            <option value={nivel_academico == 'primaria' ? '1-1': '6-1'}>{nivel_academico == 'primaria' ? '1-1': '6-1'}</option>
                                            <option value={nivel_academico == 'primaria' ? '1-2': '6-2'}>{nivel_academico == 'primaria' ? '1-2': '6-2'}</option>
                                            <option value={nivel_academico == 'primaria' ? '1-3': '6-3'}>{nivel_academico == 'primaria' ? '1-3': '6-3'}</option>
                                            <option value={nivel_academico == 'primaria' ? '2-1': '7-1'}>{nivel_academico == 'primaria' ? '2-1': '7-1'}</option>
                                            <option value={nivel_academico == 'primaria' ? '2-2': '7-2'}>{nivel_academico == 'primaria' ? '2-2': '7-2'}</option>
                                            <option value={nivel_academico == 'primaria' ? '2-3': '7-3'}>{nivel_academico == 'primaria' ? '2-3': '7-3'}</option>
                                            <option value={nivel_academico == 'primaria' ? '3-1': '8-1'}>{nivel_academico == 'primaria' ? '3-1': '8-1'}</option>
                                            <option value={nivel_academico == 'primaria' ? '3-2': '8-2'}>{nivel_academico == 'primaria' ? '3-2': '8-2'}</option>
                                            <option value={nivel_academico == 'primaria' ? '3-3': '8-3'}>{nivel_academico == 'primaria' ? '3-3': '8-3'}</option>
                                            <option value={nivel_academico == 'primaria' ? '4-1': '9-1'}>{nivel_academico == 'primaria' ? '4-1': '9-1'}</option>
                                            <option value={nivel_academico == 'primaria' ? '4-2': '9-2'}>{nivel_academico == 'primaria' ? '4-2': '9-2'}</option>
                                            <option value={nivel_academico == 'primaria' ? '4-3': '9-3'}>{nivel_academico == 'primaria' ? '4-3': '9-3'}</option>
                                            <option value={nivel_academico == 'primaria' ? '5-1': '10-1'}>{nivel_academico == 'primaria' ? '5-1': '10-1'}</option>
                                            <option value={nivel_academico == 'primaria' ? '5-2': '10-2'}>{nivel_academico == 'primaria' ? '5-2': '10-2'}</option>
                                            <option value={nivel_academico == 'primaria' ? '5-3': '10-3'}>{nivel_academico == 'primaria' ? '5-3': '10-3'}</option>
                                            <option value={nivel_academico == 'primaria' ? '': '11-1'}>{nivel_academico == 'primaria' ? '': '11-1'}</option>
                                            <option value={nivel_academico == 'primaria' ? '': '11-2'}>{nivel_academico == 'primaria' ? '': '11-2'}</option>
                                            <option value={nivel_academico == 'primaria' ? '': '11-3'}>{nivel_academico == 'primaria' ? '': '11-3'}</option>
                                        </>
                                    }
                                </select>
                            </div>
                        }

                        {
                            role !== 'estudiante' ? 
                            '':
                            <div className="contentLabel">
                                <div className="obligatorio">
                                    <label htmlFor="nombre-acudiente">Nombre del acudiente</label>
                                    <span>*</span>
                                </div>
                                <input onChange={handleChangue} type="text" name='nombre_acudiente' autoComplete='off' placeholder='Nombre completo del acudiente' />
                            </div>
                        }

                        {
                            role !== 'estudiante' ?
                            '':
                            <div className="contentLabel">
                                <div className="obligatorio">
                                    <label htmlFor="numero-acudiente">Numero del acudiente</label>
                                </div>
                                <input onChange={handleChangue} type="text" name='numero_acudiente' autoComplete='off' placeholder='Ingresa numero del acudiente' />
                            </div>
                        }

                        <div className="content">
                            <div className="obligatorio">
                                <label htmlFor="contraseña">Contraseña</label>
                                <span>*</span>
                            </div>
                            <input onChange={handleChangue} name='contraseña' type={open == false ? "password" : "text"} placeholder='Ingresa contraseña' />
                            {
                                open == false ? <i onClick={handleSee} className="bi bi-eye-fill"></i> :
                                <i onClick={handleClose} className="bi bi-eye-slash-fill"></i>
                            }
                        </div>

                    </div>
                    <div className='contentBoton'>
                        <button type='submit' className='boton'>{role == 'profesor'? 'Registrarme': 'Matricularme'}</button>
                    </div>
                </form>
                <p className='span'>{role == 'profesor' ? 'Ya estas registrado ⬇': 'Ya estas matriculado ⬇'}</p>
                <Link to={'/login'} className='contentArrow'><i className="bi bi-arrow-right-circle-fill"></i></Link>
            </div>
            <div className='imagen'>
                <img src={school} alt="BACK TO SCHOOL" />
            </div>
        </div>
    </section>
    <ToastContainer />
    </main>
  )
}

export default Matricula