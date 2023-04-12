import { useEffect, useRef, useState }from 'react'
import "../pagesCss/crearSalon.css"
import inicio from "../pagesImg/inicio.webp"
import Select from "react-select";

import { useGetDocentesQuery, useCreateSalonMutation } from "../../api/apiSlice";
import Loading from '../Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Salones from './Salones';

const CrearSalon = () => {

  const { data, isLoading, isError, error } = useGetDocentesQuery()
  const [ createSalon ] = useCreateSalonMutation()
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [datos, setDatos] = useState({
    nombre: '',
    descripcion: ''
  });
  const openSalon = useRef(null);

  useEffect(() => {
    if (data && data.usuarios) {
      const newOptions = data.usuarios.map((dato) => ({
        value: dato._id,
        label: dato.nombreCompleto,
        image: inicio
      }));
      setOptions(newOptions);
    }
  }, [data]);

  const handleOpenSalon = () => {
    openSalon.current.classList.add('salon_ventana');
  }

  const handleCloseSalon = () => {
    openSalon.current.classList.remove('salon_ventana');
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setDatos({ ...datos, [name]: value });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();


    try {
      const respuesta = await createSalon({ nombre: datos.nombre, descripcion: datos.descripcion, id: selectedOption.value });
      toast.success(respuesta.data.mensaje, {
        position: toast.POSITION.TOP_RIGHT
      })
      openSalon.current.classList.remove('salon_ventana');
    } catch (error) {
      console.log(error)
    }

  }


  if(isLoading){
    return <Loading />
  }

  if(isError){
    error.mensaje
  }

  return (
    <section className='conten_crear_salon'>
      <div className="cabezera_crear_salon">
        <button className='boton_crear' onClick={() => handleOpenSalon()}>
          <span>Crear salon</span>
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>

      <section ref={openSalon}>
        <div className="salon_emergente">
          <i onClick={() => handleCloseSalon()} className='bx bx-x'></i>

          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Ingresa nombre del nuevo salon' onChange={handleChange} name='nombre' />
            <textarea name="descripcion" id="" cols="30" rows="10" placeholder='Ingresa descripcion al nuevo salon' onChange={handleChange}></textarea>
            <Select 
              options={options} 
              placeholder="Seleccione un docente que sera el director del salon"
              value={selectedOption}
              onChange={setSelectedOption}
              formatOptionLabel={({ label, image }) => (
                <div className="option_container">
                  <img src={image} alt={label} className="option-image" />
                  <span className="option-label">{label}</span>
                </div>
              )}
            />
            <button type='submit'>Crear salon</button>
          </form>
        </div>
      </section>
      <Salones />
      <ToastContainer />
    </section>
  )
}

export default CrearSalon