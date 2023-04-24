import { useEffect, useRef, useState } from 'react'
import "../pagesCss/secretaria.css"
import { SiGoogleclassroom } from "react-icons/si";
import { Link } from "react-router-dom";
import { useGetEstudiantesDeLosUltimosSieteDiasQuery, usePutMatricularMutation, useDeleteMatriculaMutation } from "../../api/apiSlice";
import Loading from '../Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Secretaria = ({user}) => {

    const [datos, setDatos] = useState({
        texto: '',
        matricular : '',
        id: ''
    });

    const [ verDatos, setVerDatos ] = useState([]);
    const [ids, setIds] = useState('');
    const [nuevoids, setNuevoIds] = useState('');
    const body = document.body
    const { texto } = datos

    const { data, isLoading, isError, error } = useGetEstudiantesDeLosUltimosSieteDiasQuery();

    const [ putMatricular ] = usePutMatricularMutation();
    const [ deleteMatricula ] = useDeleteMatriculaMutation();

    const [correo, setCorreo] = useState({
        correo: ''
    });

    const [correoCancelar, setCorreoCancelar] = useState({
        correoCancelar: ''
    });

    const open = useRef(null);
    const openCancelar = useRef(null);
    const openVer = useRef(null);

    if(isLoading){
        return <Loading />
    }

    if(isError){
        <div>{error.mensaje}</div>
    }

    const handleOpenVentana = (item) => {
        open.current.classList.add('primeraVentana');
        setCorreo(item.correo)
        setIds(item._id);
        body.style.overflowY = 'hidden'
        // console.log(ids);
    }

    const handleCloseVentana = () => {
        open.current.classList.remove('primeraVentana');
        setDatos({...datos, texto: '', matricular: '', id: ''});
        body.style.overflowY = 'auto'
    }

    const handleDatos = (event) => {
        const { name, value } = event.target
        setDatos({ ...datos, [name]: value });
    }

    const handelOpenCancelar = (item) => {
        openCancelar.current.classList.add('cancelarVentana');
        setCorreoCancelar({...correoCancelar, correoCancelar: item.correo});
        setNuevoIds(item._id);
        console.log(nuevoids);
        body.style.overflowY = 'hidden'
    }

    const handleCloseCancelar = () => {
        openCancelar.current.classList.remove('cancelarVentana');
        setDatos({...datos, texto: '', matricular: '', id: ''});
        body.style.overflowY = 'auto'
    }

    const handleDatosCancelar = (event) => {
        const { name, value } = event.target
        setDatos({ ...datos, [name]: value });
    }

    const handleOpenVer = (item) => {
        openVer.current.classList.add('verVentana');
        setVerDatos(item)
        body.style.overflowY = 'hidden'
    }

    const handleCloseVer = () => {
        openVer.current.classList.remove('verVentana');
        body.style.overflowY = 'auto'
    }

    const handleSubmitCancelar = async(e) => {
        e.preventDefault();

        try {
            const response = await deleteMatricula({ id: nuevoids, texto: datos.texto });
            toast.success(response.data.mensaje, {
              position: toast.POSITION.TOP_RIGHT
            })
            openCancelar.current.classList.remove('cancelarVentana');
        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    const handleDatosSubmit = async(e) => {
        e.preventDefault();

        if (datos.texto === '') {
          setDatos({
            ...datos,
            secretaria_correo: user.correo,
            aspirante_correo: correo
          });
        }
      
        try {
          const response = await putMatricular({ id: ids, texto: texto });
          toast.success(response.data.mensaje, {
            position: toast.POSITION.TOP_RIGHT
          })
          open.current.classList.remove('primeraVentana');
        } catch (error) {

            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            })
        }

    }

  return (
    <section className='contentSecretaria'>
        <article className='containerSecretaria'>
            <Link to={'/inicio/pages/listEstudiantes'} className='funcionesSecretaria'>
                <i className='bx bxs-book-reader'></i>
                <h4>estudiantes</h4>
            </Link>

            <Link to={'/inicio/pages/docentes'} className='funcionesSecretaria'>
                <i className='bx bxs-book-bookmark'></i>
                <h4>docentes</h4>
            </Link>

            <Link to={'/inicio/pages/crearSalon'} className='funcionesSecretaria'>
                <SiGoogleclassroom className='i' />
                <h4>salones</h4>
            </Link>

            <Link to={'/inicio/pages/grados'} className='funcionesSecretaria'>
                <i className='bx bxs-group'></i>
                <h4>grados</h4>
            </Link>
        </article>
        
        <div className="estudiantesResientes">
            <h4>Aspirantes a matricula de los ultimos 7 dias</h4>
            <span>{data.user.length}</span>
        </div>
        {
            data.user == 0 ? <div className='sinRegistros'>Sin registgros pendientes</div>:
            <article className='tablas'>
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>No. documento</th>
                                <th>Nivel</th>
                                <th>Grado</th>
                                <th>Celular</th>
                                <th>action</th>
                            </tr>
                        </thead>
                            <tbody>
                                {
                                    data.user.map((item, index) => (
                                        <tr className='tr' key={item._id}>
                                            <td>{index}</td>
                                            <td>{item.nombreCompleto}</td>
                                            <td>{item.correo}</td>
                                            <td>{item.documento}</td>
                                            <td>{item.nivel_academico}</td>
                                            <td>{item.grado}</td>
                                            <td>{item.numero ? item.numero: <p className='sinNumero'>Sin numero</p>}</td>
                                            <td>
                                                <div className='containeBottones'>
                                                    <button onClick={() => handleOpenVer(item)}>Ver</button>
                                                    <button onClick={() => handelOpenCancelar(item)} className='cancelar'>cancelar</button>
                                                    <button onClick={() => handleOpenVentana(item)} className='matricular'>matricular</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                    </table>
            </article>
        }

        <section ref={open}>
            <div className="primeraEmergente">
                <div className="cabezeraVentana">
                    <h4>Enviar correo</h4>
                    <i onClick={() => handleCloseVentana()} className='bx bx-x'></i>
                </div>
                <div className="formEmergente">
                    <form onSubmit={handleDatosSubmit}>
                        <label htmlFor="">Tu correo</label>
                        <input type="text" onChange={handleDatos} name='secretaria_correo' value={user?.correo} disabled />
                        <label htmlFor="">Correo del aspirante</label>
                        <input type="text" onChange={handleDatos} name='aspirante_correo' value={correo} disabled />
                        <textarea name="texto" id="textarea" cols="1" rows="10" placeholder='Ingresa mensaje de felicitaciones al nuevo estudiante' onChange={handleDatos}></textarea>

                        <div className="checkbox-wrapper-33">
                            <label className="checkbox">
                                <input onChange={handleDatos} type="checkbox" className="checkbox__trigger visuallyhidden" name='matricular' checked />
                                <span className="checkbox__symbol">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 28 28" height="28px" width="28px" className="icon-checkbox" aria-hidden="true">
                                    <path d="M4 14l8 7L24 7"></path>
                                </svg>
                                </span>
                                <p className="checkbox__textwrapper">matricular</p>
                            </label>
                        </div>

                        <button type='submit' className='bottonEmail'>
                            <p>Enviar correo</p>
                            <i className='bx bxs-envelope'></i>
                        </button>
                    </form>
                </div>
            </div>
        </section>

        <section ref={openCancelar}>
            <div className='emergenteCancelar'>
                <div className="cabezeraCancelar">
                    <i onClick={() => handleCloseCancelar()} className='bx bx-x'></i>
                </div>
                <h3>Rechazar aspirante a matricula</h3>
                <p>En esta sección puedes rechazar al aspirante a matricula que no cumple con los requisitos o por alguna otra razon. también prodras enviarle un correo indicandole porque fue rechazado</p>
                <form onSubmit={handleSubmitCancelar}>
                    <label htmlFor="">correo del aspirante</label>
                    <input type="text" value={correoCancelar.correoCancelar} disabled />
                    <label htmlFor="">Ingresa el mensaje de rechazo</label>
                    <textarea onChange={handleDatosCancelar} name="texto" id="" cols="30" rows="10" placeholder='Mensaje'></textarea>
                    <button type='submit' className='cancelarBotton'>
                        <p>Enviar correo</p>
                        <i className='bx bxs-envelope'></i>
                    </button>
                </form>
            </div>
        </section>

        <section ref={openVer}>
            <div className="verEmergente">
                <div className="verCabezera">
                    <i onClick={() => handleCloseVer()} className='bx bx-x'></i>
                </div>
                <h4>Datos del aspirante a matricula</h4>
                <h6>En esta sección podras ver todos los datos que ingreso el aspirante cuando se registro en nuestra plataforma</h6>
                <div className='verDatos'>
                    <span>{verDatos?.role}</span>
                    <div className="verData">
                        <span>Nombre:</span>
                        <p>{verDatos?.nombreCompleto}</p>
                    </div>

                    <article className='allDatos'>
                        <section className='seccionDatos'>
                            <div className="verData">
                                <span>Correo:</span>
                                <p>{verDatos?.correo}</p>
                            </div>
                            <div className="verData">
                                <span>Dirección:</span>
                                <p>{verDatos?.direccion}</p>
                            </div>
                            <div className="verData">
                                <span>Tipo de documento:</span>
                                <p>{verDatos?.tipo_documento}</p>
                            </div>
                            <div className="verData">
                                <span>No.documento:</span>
                                <p>{verDatos?.documento}</p>
                            </div>
                            <div className="verData">
                                <span>Fecha de registro:</span>
                                <p>{verDatos?.fechaRegistro}</p>
                            </div>
                            <div className="verData">
                                <span>Grado solicitado:</span>
                                <p>{verDatos?.grado}</p>
                            </div>
                        </section>

                        <section className='seccionData'>
                            <div className="verData">
                                <span>Estado de la matricula:</span>
                                <p>{verDatos?.matricula == false ? 'Pendiente': 'Matriculado'}</p>
                            </div>
                            <div className="verData">
                                <span>Fecha de nacimiento:</span>
                                <p>{verDatos?.nacimiento}</p>
                            </div>
                            <div className="verData">
                                <span>Numero del aspirante:</span>
                                <p>{verDatos?.numero}</p>
                            </div>
                            <div className="verData">
                                <span>nivel academico solicitado:</span>
                                <p>{verDatos?.nivel_academico}</p>
                            </div>
                            <div className="verData">
                                <span>Nombre del acudiente:</span>
                                <p>{verDatos?.nombre_acudiente}</p>
                            </div>
                            <div className="verData">
                                <span>Numero del acudiente:</span>
                                <p>{verDatos?.numero_acudiente}</p>
                            </div>
                        </section>
                    </article>

                </div>
            </div>
        </section>
        <ToastContainer />
    </section>
  )
}

export default Secretaria