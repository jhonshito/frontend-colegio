import React, { useRef } from 'react'
import { useGetGradosQuery } from "../../api/apiSlice";
import Loading from '../Loading';
import '../pagesCss/crearGrados.css'
import gradoImg from '../pagesImg/grado.jpg'
import inicio from '../pagesImg/inicio.webp'

const CrearGrados = () => {

    const { data, isLoading, error } = useGetGradosQuery();
    const body = document.body
    const conten = useRef();

    const handleOpen = () => {
        conten.current.classList.add("emergente_grado")
        body.style.overflowY = 'hidden'
    }

    const handleClose = () => {
        conten.current.classList.remove("emergente_grado")
        body.style.overflowY = 'auto'
    }

    if(isLoading){
        return <Loading />
    }
    
    if(error){
        <div>{error.message}</div>
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
                    <div key={item._id} className="item_grados">
                        <div className="conte_img_grado">
                            <img src={gradoImg} alt="esta es la image que tendran todos los grados" />
                            <div className='conte_name_grado'>
                                <h2>Grado</h2>
                                <p>{item.nombre}</p>
                            </div>
                            <div className="conte_data_docente">
                                <p>Director de grupo</p>
                                <div className="conten_img_director_grado">
                                    <div>
                                        <img src={inicio} alt="esta es la imagen por del director de grupo" />
                                    </div>
                                    <p>{item.director_de_grupo.nombreCompleto}</p>
                                </div>
                                <div className="conte_estudiantes_data">
                                    <p>estudiantes</p>
                                    <p>{item.estudiantes.length}</p>
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
            </div>
        </div>
    </section>
  )
}

export default CrearGrados
