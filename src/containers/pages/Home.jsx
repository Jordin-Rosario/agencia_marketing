import Footer from 'components/navigations/Footer'
import Navbar from 'components/navigations/Navbar'
import Layouts from 'hocs/layouts/Layouts'
import React from 'react'

const Home = () => {
  return (
    <Layouts>
        <Navbar/>
        <div className='pt-28'>
            Home

        </div>
        <Footer/>
    </Layouts>
  )
}

export default Home