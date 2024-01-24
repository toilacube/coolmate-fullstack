'use client'
import { useState } from 'react'
import Footer from '../../../components/footer/footer'
import Header from '../../../components/header/header'
import NavBar from '../../../components/nav-bar/nav_bar'

const AuthLayout = ({ children }) => {
  const [searchComponent, showSearchComponent] = useState(false)

  return (
    <div>
      <Header searchComponent={searchComponent} />
      <NavBar
        searchComponent={searchComponent}
        showSearchComponent={() => showSearchComponent(!searchComponent)}
      />
      {children}
      <Footer />
    </div>
  )
}
export default AuthLayout
