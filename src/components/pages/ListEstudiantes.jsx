import { useGetEstudiantesQuery } from "../../api/apiSlice";
import "../pagesCss/listEstudiantes.css"
import Loading from '../Loading';
import inicio from "../pagesImg/inicio.webp"
import { useRef, useState } from "react";

const ListEstudiantes = () => {

    const [datos, setDatos] = useState([]);

    const { data, isLoading, isError, error } = useGetEstudiantesQuery();
    const open = useRef(null);

    if (isLoading) {
        return <Loading />;
      }
    
    if (isError) {
        return <div>{error.mensaje}</div>;
    }

    const handleUserOpen = (item) => {
        console.log(item)
        setDatos(item)
        open.current.classList.add('ventana');
        // open.current.style.display = 'block'
        console.log(datos)
    }

    const handleUserClose = () => {
        open.current.classList.remove('ventana');
        console.log(open.current)
        open.current.classList.add('ventanaClose');
    }

    console.log(data)

  return (
    <section className='setTabla'>
        {
            data.user == 0 ? <div className="sinMatricular">no hay estudiantes matriculados</div>:
            <div className="header_fixed">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Foto</th>
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
                                <tr key={item._id}>
                                    <td>{index}</td>
                                    <td><img src={inicio} alt="Esta es su foto" /></td>
                                    <td>{item.nombreCompleto}</td>
                                    <td>{item.correo}</td>
                                    <td>{item.documento}</td>
                                    <td>{item.nivel_academico}</td>
                                    <td>{item.grado}</td>
                                    <td>{item.numero ? item.numero: <p className='sinNumero'>Sin numero</p>}</td>
                                    <td><button onClick={() => handleUserOpen(item)}>Ver</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        }

        <article ref={open}>
            <div className="emergente">
                <div className="ventanaCabezera">
                    {/* <h4>Vista de estudiante</h4> */}
                    <i onClick={() => handleUserClose()} className='bx bx-x'></i>
                </div>

                <div className="imagenVentana">
                    <img src={inicio} alt="esta es la foto del usurio" />
                </div>

                <div className="dataVentana">
                    <span className="role">{datos?.role}</span>
                    <h4>{datos?.nombreCompleto}</h4>

                    <div className="datosVentana">
                        <div className="firstData">
                            <p className="role">Correo: <span className="fistRole">{datos?.correo}</span></p>
                            <p className="role">Dirección: <span className="fistRole">{datos?.direccion}</span></p>
                            <p className="role">Documento: <span className="fistRole">{datos?.documento}</span></p>
                            <p className="role">Fecha de nacimiento: <span className="fistRole">{datos?.nacimiento}</span></p>
                            <p className="role">Grado: <span className="fistRole">{datos?.grado}</span></p>
                            <p className="role">Número: <span className="fistRole">{datos?.numero}</span></p>
                            <p className="role">Tipo de documento: <span className="fistRole">{datos?.tipo_documento}</span></p>
                        </div>
                        <div className="secondData">
                            <p className="role">Nivel academico: <span className="fistRole">{datos?.nivel_academico}</span></p>
                            <p className="role">Nombre del acudiente: <span className="fistRole">{datos?.nombre_acudiente}</span></p>
                            <p className="role">Número del acudiente: <span className="fistRole">{datos?.numero_acudiente}</span></p>
                        </div>
                    </div>
                </div>

            </div>
        </article>
    </section>
  )
}

export default ListEstudiantes