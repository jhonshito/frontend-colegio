import { useParams } from "react-router-dom";
import { useGetClaseQuery } from "../../api/apiSlice";
import Loading from "../Loading";
import "../pagesCss/clases.css"
import virtuales from "../pagesImg/virtuales.jpg";
import inicio from "../pagesImg/inicio.webp";

const Clases = () => {

  const {id }= useParams()

  const { data, error, isLoading } = useGetClaseQuery({ id });
  
  if (isLoading) {
    return <Loading />
  }
  
  if (error) {
    return <div>Error al cargar la clase</div>;
  }

  console.log(data)

  return (
    <section className="conten_clases">
      <div className="clases">

        {
          data.clases.map((item) => (
            <div key={item._id} className="item_clases">
              <div className="image_clases">
                <img src={virtuales} alt="Esta es la imagen por defecto de las clases" />
              </div>
              <h3>{item.nombre}</h3>
              <p>{item.descripcion}</p>
              <div className="clases_profesor">
                <img src={inicio}alt="" />
                <h4>Profesor : {item.profesor.nombreCompleto}</h4>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Clases