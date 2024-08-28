import Footer from 'components/navigations/Footer'
import Navbar from 'components/navigations/Navbar'
import Layouts from 'hocs/layouts/Layouts'
import React from 'react'

const Services = () => {
  return (
    <Layouts>
        <Navbar/>
        <div className='pt-28'>
            Services

        </div>
        <Footer/>
    </Layouts>
  )
}

export default Services