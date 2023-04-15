import { useState, useEffect, useRef } from 'react'
import { useGetPeriodosQuery, useCreatePeriodoMutation, useGetLetivoQuery } from "../../api/apiSlice";
import { Link } from "react-router-dom";
import Loading from "../Loading"
import "../pagesCss/periodos.css"
import calendario from "../pagesImg/calendario.avif";
import Select from "react-select";
import letivo_año from "../pagesImg/letivo_año.png"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Periodos = () => {

  const { data, isLoading, isError, error, isSuccess } = useGetPeriodosQuery();
  const { data: letivoData, isLoading: letivoLoading, isError: letivoError, error: letivoErrorMsg } = useGetLetivoQuery();
  const [ createPeriodo ] = useCreatePeriodoMutation();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
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
      const res = await createPeriodo({ nombre: formValues.nombre, inicio: formValues.inicio, fin: formValues.fin, idLetivo: selectedOption.value });
      console.log(res)
      if(res.error){
        toast.error(res.error.data.mensaje, {
          position: toast.POSITION.TOP_RIGHT
        })
      }else{
        toast.success(res.data.mensaje, {
          position: toast.POSITION.TOP_RIGHT
        })
        setTimeout(() => {
          conenedor.current.style.display = 'none';
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (letivoData && letivoData.años_letivos) {
      const newOptions = letivoData.años_letivos.map((dato) => ({
        value: dato._id,
        label: dato.nombre,
        otroLabel: dato.jornada,
        image: letivo_año
      }));
      setOptions(newOptions);
    }
  }, [letivoData])

  if(isLoading || letivoLoading){
    return <Loading />
  }

  if(isError){
    <div>{error.message}</div>
  }

  if(letivoError){
    <div>{letivoErrorMsg.message}</div>
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
            <label htmlFor="">Año letivo al que va a pertenecer el periodo</label>
            <Select
              options={options}
              placeholder="Seleccione el año letivo que pertenecera este periodo"
              value={selectedOption}
              onChange={setSelectedOption}
              formatOptionLabel={({ label, image, otroLabel }) => (
                <div className="option_container">
                  <img src={image} alt={label} className="option-image" />
                  <span className="option-label">{label}</span>
                  <span className="option-label">{otroLabel}</span>
                </div>
              )}
            />
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
          data.periodos?.map((item) => (
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