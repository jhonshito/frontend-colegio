import React, { useState, useRef } from 'react'
import "../css/cambiarContraseña.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const CambiarContraseña = () => {

    const [datos, setDatos] = useState({
        role: '',
        correo: ''
    });

    const { role, correo } = datos

    const myForm = useRef(null);

    const handleChangue = (event) => {
        const { name, value } = event.target;
        setDatos(datos => ({...datos, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        switch(true){
            case !role:
                toast.error('El campo del Role es requerido', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case !correo:
                toast.error('El campo del Correo es requerido', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            default:
                let url = 'http://localhost:4000/cambiarContrasena'

                fetch(url, {
                    method:'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                })
                .then((res) => res.json())
                .then((data) => {
                    if(data.mensaje == 'Revisa tu correo'){
                        localStorage.setItem('token', data.token)
                        toast.success(data.mensaje, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        // console.log(data)
                    }else{
                        toast.error(data.mensaje, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                })
                .catch((e) => console.log(e))

                // myForm.reset();
                break;
        }

        // console.log(datos)
    }

  return (
    <div className='contenPassword'>
        <form ref={myForm} onSubmit={handleSubmit} className='formPassword'>
            <h4 className='titlePassword'>Por favor ingresa los siguientes datos</h4>
            <div className='contentLabelLogin'>
                <div className="obligatorioLogin">
                    <label htmlFor="document">Elije tu Role</label>
                    <span>*</span>
                </div>
                <select id='role' name='role' onChange={handleChangue}>
                    <option value="role">Cual es tu role</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="profesor">Docente</option>
                </select>
            </div>

            <div className='contentLabelLogin'>
                <div className="obligatorioLogin">
                    <label htmlFor="correo">Ingresa tu correo</label>
                    <span>*</span>
                </div>
                <input type="email" onChange={handleChangue} placeholder='Ingresa tu correo electronico' name='correo' />
            </div>
            <button type='submit' className='botonLogin'>Acceder</button>
            <Link className='contentArrowPassword' to={'/login'}><i className="bi bi-arrow-left-circle-fill"></i></Link>
        </form>
        <ToastContainer />
    </div>
  )
}

export default CambiarContraseña