import React from 'react'
import'../pagesCss/salones.css'
import { useGetSalonesQuery } from "../../api/apiSlice";
import inicio from '../pagesImg/inicio.webp'

const Salones = () => {

    const { data, isLoading, isError, error } = useGetSalonesQuery();

    if(isLoading){
        <div>loading......</div>
    }

    if(isError){
        error.message
    }

    console.log(data)

  return (
    <section className='conten_salones'>
        <div className="salones">
            {
                data?.datos?.map((item) => (
                    <div key={item?._id} className="item_salones">
                        <div className="salon_imagen">
                            <img src={inicio} alt="" />
                        </div>
                        <div className="salones_data">
                            <h2>Nombre : <span>{item?.nombre}</span></h2>
                            <p>{item?.descripcion}</p>
                            <h3>Director del salon: {item.director.nombreCompleto}</h3>
                            <div className="funciones_salones">
                                <button>
                                    <span>Agregar estudiantes</span>
                                    <i className="bi bi-plus-lg"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Salones