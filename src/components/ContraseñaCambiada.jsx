
import React, { useState, useRef } from 'react'
import "../css/contraseñaCambiada.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import NoAcces from './NoAcces';

const ContraseñaCambiada = () => {

    const token = localStorage.getItem('token');

    const [datos, setDatos] = useState({
        contraseña: ''
    })

    const [open, setOpen] = useState(false);
    const myForm = useRef(null);
    const navigate = useNavigate();

    const handleChangue = (event) => {
        const { name, value } = event.target;
        setDatos(datos => ({...datos, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!datos.contraseña){
            toast.error('El campo de la nueva contraseña es requerida', {
                position: toast.POSITION.TOP_RIGHT
            })
        }else {
            let url = 'http://localhost:4000/update'

            const { contraseña } = datos
            const token = localStorage.getItem('token');

            fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                },
                body: JSON.stringify({ contraseña: contraseña })
            })
            .then((res) => res.json())
            .then(({mensaje}) => {
                if(mensaje == 'Contraseña actualizada por favor ingresa con tu nueva contraseña'){
                    toast.success(mensaje, {
                        position: toast.POSITION.TOP_RIGHT
                    })

                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                }else {
                    toast.error(mensaje, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
                
            })
            .catch((e) => console.log(e))
            console.log(datos)
        }

        myForm.reset()
    }

    const handleSee = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }


  return(
    <>
        {
            token ?
            <div className='contenPass'>
                <form onSubmit={handleSubmit} ref={myForm} className='formPss'>
                    <h4 className='tituloPass'>Nueva contraseña</h4>
                    <p className='parrafoPass'>Por favor Ingresa tu nueva contraseña</p>
                    <div className='contentLabelLogin'>
                        <div className="obligatorioLogin">
                            <label htmlFor="correo">Ingresa una nueva contraseña</label>
                            <span>*</span>
                        </div>
                        <input onChange={handleChangue} type={open == false ? "password" : "text"} placeholder='Ingresa Nueva contraseña' name='contraseña' />
                        {
                            open == false ? <i onClick={handleSee} className="bi bi-eye-fill"></i> :
                            <i onClick={handleClose} className="bi bi-eye-slash-fill"></i>
                        }
                    </div>
                    <button type='submit' className='botonLogin'>Agregar</button>
                </form>
                <ToastContainer />
            </div>:
            <NoAcces />
        }
    </>
  )
}

export default ContraseñaCambiada