import React, { useEffect, useState } from 'react'
import '../pagesCss/crearMaterias.css'
import Select from "react-select";
import { materiasOptions } from "./selectOptions/Opcciones";

const CrearMaterias = () => {
    const datosOpciones = ['matematicas', 'español', 'fisica', 'religion', 'ciencia sociales', 'ciencias naturales', 'artistica', 'artistica', 'artistica', 'artistica', 'artistica', 'artistica', 'artistica', 'artistica', 'artistica', 'artistica', 'artistica']
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const opciones = materiasOptions.map((data, index) => ({
            value: index,
            label: data,
            anotherLabel: index
        }))
        setOptions(opciones)
    }, [])

  return (
    <section className='conten_materias'>
        <div className="cabezera_materias">
            <button>
                <span>crear nueva materia</span>
                <i className="bi bi-plus-lg"></i>
            </button>
        </div>
        <div className="ventana_materias">
            <div className="form_materias">
                <i className="bi bi-x"></i>
                <form>
                    <Select 
                        options={options}
                        onChange={setSelectedOption}
                        placeholder='Elije la materia que deseas crear 😊'
                        formatOptionLabel={({ label, anotherLabel }) => (
                            <div className='conten_materias_options'>
                                <span>{anotherLabel}</span>
                                <span>{label}</span>
                            </div>
                        )}
                    />
                    <textarea name="" id="" cols="30" rows="10" placeholder='Ingresa descripcion de la nueva materia'></textarea>
                    <button>Crear materia</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default CrearMaterias