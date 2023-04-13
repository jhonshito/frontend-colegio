import { useState, useEffect, useRef } from 'react'
import { useGetPeriodosQuery, useCreatePeriodoMutation } from "../../api/apiSlice";
import { Link } from "react-router-dom";
import Loading from "../Loading"
import "../pagesCss/periodos.css"
import calendario from "../pagesImg/calendario.avif";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Periodos = () => {

  const { data, isLoading, isError, error } = useGetPeriodosQuery();
  const [ createPeriodo ] = useCreatePeriodoMutation();
  const conenedor = useRef(null);
  const [formValues, setFormValues] = useState({
    nombre: "",
    inicio: "",
    fin: "",
  });

  const handleOpen = () => {
    conenedor.current.style.display = 'flex';
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(formValues);
    try {
      const res = await createPeriodo({ nombre: formValues.nombre, inicio: formValues.inicio, fin: formValues.fin });
      // console.log(res)
      toast.success(res.data.mensaje, {
        position: toast.POSITION.TOP_RIGHT
      })
      setTimeout(() => {
        conenedor.current.style.display = 'none';
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  };

  if(isLoading){
    return <Loading />
  }

  if(isError){
    console.log(error.message)
  }

  return (
    <section className='conten_periodo'>

      <div className="crear_periodo">
        <button onClick={handleOpen}>
          <span>Crear nuevo periodo</span>
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>

      <div ref={conenedor} className='oculto_periodo'>
        <form onSubmit={handleSubmit}>
          <div className='conten_labol'>
            <label htmlFor="">Nombre</label>
            <input name='nombre' onChange={handleInputChange} type="text" placeholder='Ingresa nombre del periodo' />
          </div>
          <div className='conten_labol'>
            <label htmlFor="">Inicio del periodo</label>
            <input name='inicio' onChange={handleInputChange} type="date" />
          </div>
          <div className='conten_labol'>
            <label htmlFor="">Fin del periodo</label>
            <input name='fin' onChange={handleInputChange} type="date" />
          </div>
          <div className='conten_labol'>
            <button type='submit'>crear periodo</button>
          </div>
        </form>
      </div>
      
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
      <ToastContainer />
    </section>
  )
}

export default Periodos