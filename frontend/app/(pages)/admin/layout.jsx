'use client'
import { useState } from 'react'
import Footer from '../../../components/footer/footer'
import Header from '../../../components/header/header'
import NavBar from '../../../components/nav-bar/nav_bar'
import SideBar from './side-bar'

const AdminLayout = ({ children }) => {
  const [searchComponent, showSearchComponent] = useState(false)

  return (
    <div>
      <Header searchComponent={searchComponent} />
      <NavBar
        isAdmin={true}
        searchComponent={searchComponent}
        showSearchComponent={() => showSearchComponent(!searchComponent)}
      />
      <div className="flex h-full relative">
        <div className="sticky top-0 left-0 h-screen">
          <SideBar />
        </div>
        <div className=" w-full h-full">{children}</div>
      </div>
      <Footer />
    </div>
  )
}
export default AdminLayout
