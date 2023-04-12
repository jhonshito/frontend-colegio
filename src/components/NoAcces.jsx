import React from 'react'
import "../css/noAcess.css"
import { Link } from "react-router-dom";

const NoAcces = () => {
  return (
    <div className='noContainer'>
        <div className="containerAcess">
            <h3 className='tituloAcess'>sin acceso al aula</h3>
            <h4>tienes que estar autenticado</h4>
            <p>Lo siento, pero para acceder a los contenidos y funciones de este sitio web, es necesario que te autentiques. La autenticación es un proceso de verificación de tu identidad que garantiza que solo los usuarios autorizados puedan acceder a los recursos de este sitio. <br/> Si ya tienes una cuenta, por favor ingresa tus credenciales de autenticación en el formulario del login <Link className='loginAcess' to={'/login'}>Aqui</Link>. Si aún no tienes una cuenta, puedes registrarte siguiendo las instrucciones proporcionadas en la página de registro <Link className='loginAcess' to={'/'}>Aqui</Link>. <br/> Recuerda que la autenticación es importante para garantizar la seguridad de nuestro sitio web y de nuestros usuarios. Si tienes alguna duda o problema, por favor contáctanos para que podamos ayudarte. ¡Gracias por tu comprensión!</p>
        </div>
    </div>
  )
}

export default NoAcces