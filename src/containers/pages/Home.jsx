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
    try{
      const data = await request(url);
      setProductos(data);
    }catch(error){
      console.log("Ah ocurrido un error")
    };
  };

  const handleDelete = async (id) => {
    try{
      await deleteProducto(id);
      alert('Se elimino correctamente');
    }catch{
      alert('Ah ocurrido un error');
    };
  };

  useEffect(() => {
    fetchData('http://127.0.0.1:8000/agencia/servicios/');
  }, []);

  return (
    <Layouts>
        <Navbar/>
        <div className='pt-28 container'>
            {
              productos['results']?.map((producto)=> (
                <>
                  <h1 className='text-black'>{producto.nombre}</h1>
                  <p className='text-black'>{producto.descripcion}</p>
                  <button
                    className='underline text-red-600'
                    onClick={() => handleDelete(producto.id)}
                  >
                    Eliminar producto
                  </button>
                </>
              ))
            }
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
        <Footer/>
    </Layouts>
  )
}

export default Home