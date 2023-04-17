import { useRef, useState } from 'react'
import "../pagesCss/añoLetivo.css"
import letivo_año from "../pagesImg/letivo_año.png"
import { useGetLetivoQuery, useCrearLetivoMutation } from "../../api/apiSlice";
import Loading from "../Loading"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const AñosLetivos = () => {

    const { data, isLoading, isError, error } = useGetLetivoQuery();
    const [ crearLetivo ] = useCrearLetivoMutation();
    const [form, setForm] = useState({
        nombre: '',
        inicio: '',
        fin: '',
        jornada: ''
    });
    const conten = useRef(null);

    const handleOpen = () => {
        conten.current.style.display = 'flex';
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await crearLetivo({ nombre: form.nombre, inicio: form.inicio, fin: form.fin, jornada: form.jornada });
            conten.current.style.display = 'none';

            if(res.data.status == 200){
                toast.success(res.data.mensaje, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }else {
                toast.error(res.data.mensaje, {
                    position: toast.POSITION.TOP_RIGHT
                }) 
            }

        } catch (error) {
            
            console.log(error);
        }
    }

    if(isLoading){
        return <Loading />
    }

    if(isError){
        <div>{error.message}</div>
    }

    console.log(data)

  return (
    <section className='conten_letivo'>
        <button onClick={() => handleOpen()} className='button_letivo'>
            <span>Crear año letivo</span>
            <i className="bi bi-plus-lg"></i>
        </button>

        <div ref={conten} className='form_letivo'>
            <form onSubmit={handleSubmit}>
                <div className="input_letivo">
                    <label htmlFor="">Ingresale un nombre al nuevo año letivo</label>
                    <input type="text" placeholder='Ingresa nombre' name='nombre' onChange={handleChange} />
                </div>
                <div className="input_letivo">
                    <label htmlFor="">Ingresa inicio del año letivo</label>
                    <input type="date" name='inicio' onChange={handleChange} />
                </div>
                <div className="input_letivo">
                    <label htmlFor="">Ingresa fin del año letivo</label>
                    <input type="date" name='fin' onChange={handleChange} />
                </div>
                <div className="input_letivo">
                    <label htmlFor="">Ingresa jornada letiva</label>
                    <select name="jornada" onChange={handleChange} >
                        <option value="jornada_letiva">Elije jornada</option>
                        <option value="mañana">Mañana</option>
                        <option value="tarde">Tarde</option>
                    </select>
                </div>
                <div className='input_letivo'>
                    <button type='submit'>agregar</button>
                </div>
            </form>
        </div>

        <div className="content_card_letivo">
            {
                data.años_letivos.map((items) => (
                    <Link to={`/inicio/pages/periodosLetivos/${items._id}`} key={items._id} className="item_letivo">
                        <div className="image_letivo">
                            <img src={letivo_año} alt="" />
                        </div>
                        <div className="data_letivo">
                            <h2>{items.nombre}</h2>
                            <h3>jornada {items.jornada}</h3>
                            <h3>Fecha de inicio: <span>{new Date(items.inicio).toDateString()}</span></h3>
                            <h3>Fecha de fin: <span>{new Date(items.fin).toDateString()}</span></h3>
                            <hr />
                            <h3>Periodos: <span>{items.periodos.length}</span></h3>
                            <h3>Estudiantes: <span>{items.estudiantes.length}</span></h3>
                        </div>
                    </Link>
                ))
            }
        </div>

        <ToastContainer />
    </section>
  )
}

export default AñosLetivos