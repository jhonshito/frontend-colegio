import React, { useState, useRef } from 'react'
import "../css/login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [datos, setDatos] = useState({
        role: '',
        tipo_documento: '',
        documento: '',
        contraseña: ''
    });

    const { role, tipo_documento, documento, contraseña } = datos
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const myForm = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos(datos => ({ ...datos, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        switch(true){
            case !role:
                toast.error('El campo del Role es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
            break;

            case role !== 'estudiante'? '': !tipo_documento:
                toast.error('El campo del Tipo de documento es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
            break;

            case !documento:
                toast.error('El campo del Documento es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
            break;
            case !contraseña:
                toast.error('El campo de la Contraseña es requerido !', {
                    position: toast.POSITION.TOP_RIGHT
                });
            break;

            default:
                let url = 'http://localhost:4000/login'

                if(role !== 'estudiante'){

                    const datos = {
                        role,
                        documento,
                        contraseña
                    }

                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datos)
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        if(data.token){
                            console.log(data)
                            localStorage.setItem('token', data.token);
                            toast.success(data.mensaje, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            setTimeout(() => {
                                navigate("/inicio/pages/perfil")
                            }, 2000)
                        }else {
                            console.log(data)
                            toast.error(data.mensaje, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        }
                    })
                    .catch((e) => console.log(e))

                }else {
                    const datos = {
                        role,
                        tipo_documento,
                        documento,
                        contraseña
                    }

                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datos)
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        if(data.token){
                            console.log(data.token);
                            localStorage.setItem('token', data.token);
                            toast.success(data.mensaje, {
                                position: toast.POSITION.TOP_RIGHT
                            });

                            setTimeout(() => {
                                navigate("/inicio/pages/perfil")
                            }, 2000)

                        }else {

                            console.log(data);
                            toast.error(data.mensaje, {
                                position: toast.POSITION.TOP_RIGHT
                            });

                        }
                    })

                }

                myForm.current.reset();
                console.log(datos)
                
            break;
        }

    }

    const handleSee = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }

  return (
    <section className='contenSeccion'>
        <article className='contenLogin'>
            <div className='bgLogin'>
                <div className='blur'>
                    <p className='punto'></p>
                </div>
                <h3 className='title'>Regresa a clases de una forma muy tecnológica</h3>
                <p className='parrafo'>Para nosotros la educacion de los niños y adolecentes es lo mas importante...</p>
                <div className='consejo'>
                Ser un estudiante no es solo ir a la escuela y pasar exámenes. Es un viaje para descubrir tus fortalezas y debilidades, aprender nuevas habilidades y conocimientos, y prepararte para un futuro brillante.
                </div>
            </div>

            <div className='contenFormLogin'>
                <h3 className='tituloLogin'>hola ingresa a tu aula</h3>
                <p className='parrafoLogin'>si ya estas matriculado ingresas los siguientes datos para poder acceder al aula</p>
                <form ref={myForm} onSubmit={handleSubmit} className='formLogin'>
                    <div className='contentLabelLogin'>
                        <div className="obligatorioLogin">
                            <label htmlFor="document">Elije tu Role</label>
                            <span>*</span>
                        </div>
                        <select onChange={handleChange} id='role' name='role'>
                            <option value="role">Cual es tu role</option>
                            <option value="estudiante">Estudiante</option>
                            <option value="profesor">Docente</option>
                            <option value="secretaria">Secretaria</option>
                            <option value="cordinador">Cordinador</option>
                            <option value="retor">Retor</option>
                        </select>
                    </div>

                    {
                        role !== 'estudiante' ? '':
                        <div className='contentLabelLogin'>
                            <div className="obligatorioLogin">
                                <label htmlFor="document">Tipo de documento</label>
                                <span>*</span>
                            </div>
                            <select onChange={handleChange} id='document' name='tipo_documento'>
                                <option value="tipo">Ingresa tipo de documento</option>
                                <option value="CC">Cedula</option>
                                <option value="TJ">Tarjeta de identidad</option>
                            </select>
                        </div>
                    }

                    <div className='contentLabelLogin'>
                        <div className="obligatorioLogin">
                            <label htmlFor="document">Numero del documento</label>
                            <span>*</span>
                        </div>
                        <input type="text" onChange={handleChange} placeholder='Ingresa tu numero de documento' name='documento' />
                    </div>

                    <div className='contenten'>
                        <div className="obligatorioLogin">
                            <label htmlFor="document">Contraseña</label>
                            <span>*</span>
                        </div>
                        <input placeholder='Ingresa tu Contraseña' onChange={handleChange} name='contraseña' type={open == false ? "password" : "text"} />
                        {
                            open == false ? <i onClick={handleSee} className="bi bi-eye-fill"></i> :
                            <i onClick={handleClose} className="bi bi-eye-slash-fill"></i>
                        }
                        <Link to={'/cambiarContraseña'} className='contraseñaOlvidada'>Olvide mi contraseña</Link>
                    </div>

                    <button type='submit' className='botonLogin'>Acceder</button>
                    <p className='sinCuenta'>No estoy matriculado ⬇</p>
                    <Link className='contentArrowLogin' to={'/'}><i className="bi bi-arrow-left-circle-fill"></i></Link>
                </form>
            </div>
        </article>
        <ToastContainer />
    </section>
  )
}

export default Login