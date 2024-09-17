import Footer from 'components/navigations/Footer'
import Navbar from 'components/navigations/Navbar'
import Layouts from 'hocs/layouts/Layouts'
import React, {useEffect, useState} from 'react'
import { getCookie } from 'components/navigations/csrf_token'
// import {Button} from "@nextui-org/react";
import {Card, CardHeader, CardBody, Image, Skeleton} from "@nextui-org/react";
import {Pagination} from "@nextui-org/react";
import SkeletonCard from 'components/SkeletonCard'

const request = async (url) => {
  const formData = new FormData();
  formData.append('nombre', 'La para musicar');
  formData.append('descripcion', 'La bomba atomica');
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Error en la solicitud');
  }
  const data = await res.json();


  const csrfToken = getCookie('csrftoken'); 
  
  const r = await fetch(`http://127.0.0.1:8000/agencia/servicios/${1}`,{
    method:'PATCH',
    headers:{
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken // Incluye el token CSRF en el encabezado
    }, body:{

    }
  })
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

  const [pages, setPages] = useState([1]);
  const [pageActive, setPageActive] = useState();

  useEffect(() => {
    let calPages = productos['count'] / 10
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
  useEffect(() => {
    fetchData('http://127.0.0.1:8000/agencia/servicios/');
  }, []);

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


  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    const pageValue = pages.find((item) => item.numberPage === page);
    
    fetchData(pageValue['url'])
    setCurrentPage(page);
    // Aquí puedes añadir lógica adicional para cargar datos de la página seleccionada
  };
  return (
    <Layouts>
        <Navbar/>
        <div className='pt-14 container mx-auto '>
          <div className='text-center mx-10'>
            <div className='flex flex-wrap gap-x-4 gap-y-10 items-center justify-center'>
            {/* <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/> */}
              {
                productos['results']?.map((producto)=> (
                  <Card className="py-4 w-64" key={producto.id}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col ">
                      <Image
                        alt="Card background"
                        className="object-cover rounded-xl h-52"
                        src={producto.foto}
                        width={270}
                      />
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                      <p className="text-tiny uppercase font-bold">{producto.nombre}</p>
                      <small className="text-default-500">{producto.descripcion}</small>
                    </CardBody>
                  </Card>
                ))
              }
            </div>
          </div>


          <div className='text-end py-2 bg-gray-100 my-2 rounded-lg flex justify-center'>
            
            <Pagination
              showControls 
              total={pages.length} 
              initialPage={1}
              page={currentPage} // Página actual
              onChange={handlePageChange} // Función al cambiar de página

            />

          {/* {
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
            } */}

          </div>
          
            
        </div>
        <Footer/>
    </Layouts>
  )
}

export default Home