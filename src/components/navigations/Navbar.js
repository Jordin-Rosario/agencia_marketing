import {connect} from "react-redux";
import  {NavLink} from 'react-router-dom';
import logo from 'assets/image/logoPrueba.png'

const Navbar = () => {
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900 ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 py-3">
            <a to="https://flowbite.com/" class="flex items-center space-x-1 rtl:space-x-reverse">
                <img src={logo} class="h-16" alt="Flowbite Logo" />
                <h1 className="text-[#007fc6] font-semibold text-2xl">AdFusion</h1>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="[&_li]:my-auto [&_li_a]:text-blue-base border font-medium flex flex-col p-4 md:p-0 border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                <NavLink to="/cases"class="block py-3 px-3 text-white rounded md:bg-transparent md:text-blue-base md:p-0 border-b-2 border-blue-base border-b hover:underline duration-500">Casos</NavLink>
                </li>
                <li>
                <NavLink to="/servicios" class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Servicios</NavLink>
                </li>
                <li>
                <NavLink to="/about" class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Nosotros</NavLink>
                </li>
                <li>
                <NavLink to="/carreras" class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Carreras</NavLink>
                </li>
                <li>
                <NavLink to="/blog" class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Blog</NavLink>
                </li>
                <li>
                <NavLink to="/contacto" class="block py-2 px-3 h-full my-auto rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contacto</NavLink>
                </li>
                <button
                    class="select-none rounded-lg bg-blue-base py-2 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                >
                     Hire us!
                </button>
            </ul>
            </div>
        </div>
    </nav>
  )
}

const mapStateToProps=state=>({

})
export default connect(mapStateToProps, {

}) (Navbar);