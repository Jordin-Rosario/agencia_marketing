import Footer from 'components/navigations/Footer'
import Navbar from 'components/navigations/Navbar'
import Layouts from 'hocs/layouts/Layouts'
import React, {useEffect, useState} from 'react'
import { getCookie } from 'components/navigations/csrf_token'


const request = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Error en la solicitud');
  }
  const data = await res.json();
  return data
}

const deleteProducto = async (id) => {
  try {
    const csrfToken = getCookie('csrftoken'); 

    const response = await fetch(`http://127.0.0.1:8000/agencia/servicios/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken // Incluye el token CSRF en el encabezado
      },
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    return response; // Devuelve la respuesta de la solicitud
  } catch (error) {
    console.error("Hubo un error al eliminar el usuario:", error);
    throw error; // Lanza el error para que el componente lo maneje
  }
};

const Home = () => {
  const [productos, setProductos] = useState({});
  const [pages, setPages] = useState([]);
  const [pageActive, setPageActive] = useState();

  useEffect(() => {
    let calPages = productos['count'] / 5
    calPages = !calPages % 2 == 0 ? calPages + 1: calPages 
  
    const pages = []
    for (let page = 1; page < calPages; page++) {
      pages.push({
        numberPage:page,
        url:`http://127.0.0.1:8000/agencia/servicios/?page=${page}`
      })
    };

    setPages(pages)
  }, [productos])


  const fetchData = async (url) => {
    setPageActive(url);
    try{
      const data = await request(url);
      setProductos(data);
    }catch(error){
      console.log("Ah ocurrido un error");
    };
  };

  const handleDelete = async (id) => {
    try{
      await deleteProducto(id);
      const dataProductoEliminado = productos['results'].filter((producto) => producto.id != id)
      setProductos((prevState) => ({
        ...prevState,
        results:dataProductoEliminado
      }));
    }catch (err){
      alert('Ah ocurrido un error');
    };
  };

  useEffect(() => {
    fetchData('http://127.0.0.1:8000/agencia/servicios/');
  }, []);

  return (
    <Layouts>
        <Navbar/>
        <div className='pt-14 container mx-auto'>
          <div className='grid grid-cols-4 gap-x-4 gap-y-10'>

            {
              productos['results']?.map((producto)=> (
                <div class="flex flex-col mt-6 text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl w-80">
                  <div
                    class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                    {
                      producto.foto && (
                        <img src={producto.foto} className='object-cover w-full h-full' alt=""/>
                      )
                    }
                  </div>
                  <div class="p-6">
                    <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {producto.nombre}
                    </h5>
                    <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                      {producto.descripcion}
                    </p>
                  </div>
                  <div class="p-6 pt-0">
                    <button
                      class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                      onClick={() => handleDelete(producto.id)}
                    >
                      Eliminar producto
                    </button>
                  </div>
                </div>  
              ))
            }
          </div>
          <div className='text-center py-2 bg-gray-100 my-2 rounded-lg'>
          {
              productos['previous']
              ? 
                <button className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-1.5 px-3 rounded" onClick={() => fetchData(productos['previous'])}>
                  Anterior
                </button>
              :
                <button className="bg-gray-200 hover:bg-gray-100 text-gray-400 font-bold py-1.5 px-3 rounded">
                  Anterior
                </button>
            }
      
            {
              pages.map((page) => (
                <>
                  <button className="hover:underline text-blue-600 font-bold py-2 px-4 rounded" onClick={() => fetchData(page['url'])}>
                    {page['numberPage']}
                  </button>
                </>
              ))
            }
            { 
              productos['next']
              ?
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded" onClick={() => fetchData(productos['next'])}>
                  Siguiente
                </button>
              :
                <button className="bg-gray-200 hover:bg-gray-100 text-gray-400 font-bold py-1.5 px-3 rounded">
                    Siguiente
                </button>
            }

          </div>
          
            
        </div>
        <Footer/>
    </Layouts>
  )
}

export default Home