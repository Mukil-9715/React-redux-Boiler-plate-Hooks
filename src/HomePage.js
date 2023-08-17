import React from 'react'
import Banner from './Banner'
import NavBar from './NavBar'

function HomePage({name, itemsToNav}) {
  return (
      <>
      {name}
      <Banner/>
      <NavBar items ={itemsToNav}/>
      </>
  )
}


export default HomePage
