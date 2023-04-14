import React from 'react'
import { useGetDocentesQuery } from "../../api/apiSlice";
import Loading from '../Loading';
import '../pagesCss/docente.css'
import inicio from "../pagesImg/inicio.webp"

const Docente = () => {

  const { data, isLoading, isError, error } = useGetDocentesQuery();

  if(isLoading){
    return <Loading />
  }

  if(isError){
    <div>{error.message}</div>
  }


  return (
    <section className='conten_docente'>
      <div className="card_conten_docente">

        {
          data.usuarios.map((item) => (
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
              </div>
              <hr />
              {/* aqui va las materias */}
            </div>
          ))
        }

      </div>
    </section>
  )
}

export default Docente