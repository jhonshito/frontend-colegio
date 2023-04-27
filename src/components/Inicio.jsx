import "../css/inicio.css"
import logo from "../imgs/logo.jpg"
import { useRef, useEffect, useState  } from "react";
// import PagesHome from "./PagesHome";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Inicio = () => {

    const [referencia, setReferencia] = useState({
        pefil: useRef(),
        Inicio: useRef(),
        periodo: useRef(),
        letivo: useRef(),
        materias: useRef()
    })

    const navigate = useNavigate();
    const bodyRef = useRef();
    const sidebarRef = useRef();
    const modeTextRef = useRef();
    // const perfilRef = useRef();
    // const pagesInicioRef = useRef();
    const inicioRef = useRef();
    const location = useLocation();

    const handleClickToggle = () => {
        sidebarRef.current.classList.toggle("close")
        if(sidebarRef.current.classList.contains("close")){
            bodyRef.current.classList.remove("cerrado")
        }else {
            bodyRef.current.classList.add("cerrado")
        }
    }

    const handleClick = () => {
        bodyRef.current.classList.toggle("dark")
        
        if(bodyRef.current.classList.contains("dark")){
            let dark = 'dark'
            localStorage.setItem('darkModel', dark)
            modeTextRef.current.innerText = 'Light Mode'
        }else {
            localStorage.removeItem('darkModel')
            modeTextRef.current.innerText = 'Dark Mode'
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    useEffect(() => {

        bodyRef.current = document.body;
        if(localStorage.getItem('darkModel')){
            bodyRef.current.classList.add('dark')
            modeTextRef.current.innerText = 'Light Mode'
        }else {
            bodyRef.current.classList.remove('dark')
            modeTextRef.current.innerText = 'Dark Mode'
        }

        if(location.pathname == '/inicio/pages/perfil'){
            referencia.pefil.current.classList.add('bg')
        }else {
            referencia.pefil.current.classList.remove('bg')
        }

        if(location.pathname == '/inicio/pages/pagesInicio'){
            referencia.Inicio.current.classList.add('bg')
        }else {
            referencia.Inicio.current.classList.remove('bg')
        }

        if(location.pathname == '/inicio/pages/periodos'){
            referencia.periodo.current.classList.add('bg')
        }else {
            referencia.periodo.current.classList.remove('bg')
        }

        if(location.pathname == '/inicio/pages/letivo'){
            referencia.letivo.current.classList.add('bg')
        }else {
            referencia.letivo.current.classList.remove('bg')
        }

        if(location.pathname == '/inicio/pages/materias'){
            referencia.materias.current.classList.add('bg')
        }else {
            referencia.materias.current.classList.remove('bg')
        }
        
    }, [bodyRef, modeTextRef, location.pathname, referencia.pefil]);

    // const token = localStorage.getItem('token')

    // if(!token){
    //     <div>siii</div>
    // }

  return (
    <main className="body cerrado">
        <section ref={sidebarRef} className="sidebar close">
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src={logo} alt="este es el logo" />
                    </span>

                    <div className="text header-text">
                        <span className="name">Codinglab</span>
                        <span className="profession">Web developer</span>
                    </div>

                    <i onClick={handleClickToggle} className='bx bx-chevron-right toggle'></i>
                </div>
            </header>

            <div className="menu-bar">
                <div className="menu">
                    <li className="search-box">
                        <i className='bx bx-search icon'></i>
                        <input type="search" placeholder="Search..." />
                    </li>
                    <ul className="menu-links">
                        <li className="nav-link">
                            <Link ref={referencia.Inicio} to={'/inicio/pages/pagesInicio'}>
                                <i ref={inicioRef} className='bx bx-home-alt icon' ></i>
                                <span className="text nav-text">Inicio</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link ref={referencia.pefil} to={'/inicio/pages/perfil'}>
                                <i className='bx bxs-user-rectangle icon'></i>
                                <span className="text nav-text">Perfil</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-bell icon' ></i>
                                <span className="text nav-text">Notifications</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <Link ref={referencia.periodo} to={'/inicio/pages/periodos'}>
                                <i className='bx bx-book-bookmark icon'></i>
                                <span className="text nav-text">Periodos</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link ref={referencia.letivo} to={'/inicio/pages/letivo'}>
                                <i className="bi bi-hourglass-split icon"></i>
                                <span className="text nav-text">Años letivos</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link ref={referencia.materias} to={'/inicio/pages/materias'}>
                                <i className='bx bx-wallet icon' ></i>
                                <span className="text nav-text">Materias</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="bottom-content">
                    <li className="">
                        <a onClick={logout} href="#">
                            <i className='bx bx-log-out icon' ></i>
                            <span className="text nav-text">Logout</span>
                        </a>
                    </li>

                    <li className="mode">
                        <div className="moon-sun">
                            <i className='bx bx-moon icon moon' ></i>
                            <i className='bx bx-sun icon sun' ></i>
                        </div>
                        <span ref={modeTextRef} className="mode-text text">Dark Mode</span>

                        <div onClick={handleClick} className="toggle-switch">
                            <span className="switch"></span>
                        </div>
                    </li>
                </div>
            </div>
        </section>
        <Outlet />
    </main>
  )
}

export default Inicio
