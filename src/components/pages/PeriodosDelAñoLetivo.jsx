import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useGetPeriodosLetivosQuery } from "../../api/apiSlice"
import calendario from "../pagesImg/calendario.avif";

const PeriodosDelAñoLetivo = () => {
    const {id} = useParams()
    const { data, isLoading, error } = useGetPeriodosLetivosQuery({ idLetivo: id });

    if(isLoading){
        return <div>Loading.....</div>
    }

    if(error){
        <div>{error.message}</div>
    }

    console.log(data);

  return (
    <section className='conten_periodo'>
        <div className="allperiodos">
            {
                data.periodos.map((item) => (
                    <Link to={`/inicio/pages/clases/${item._id}`} key={item._id} className="item_periodos">
                        <div className="image_periodo">
                            <img src={calendario} alt="" />
                        </div>
                        <div className="data_periodo">
                            <h3>{item.nombre}</h3>
                            <h4>clases: <span>{item.clases.length}</span></h4>
                            <p>FECHA DE INICIO : {new Date(item.inicio).toLocaleString()}</p>
                            <p>FECHA DE FIN : {new Date(item.fin).toLocaleString()}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    </section>
  )
}

export default PeriodosDelAñoLetivo