'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../../components/header/header'
import Footer from '../../../components/footer/footer'
import NavBar from '../../../components/nav-bar/nav_bar'
import ListItemCart from '../../../components/list_item_cart/list_item_cart'
import { Button } from '@/components/ui/button'
import { UpOutlined } from '@ant-design/icons'

const CartPage = () => {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])
  const [searchComponent, showSearchComponent] = useState(false)

  return (
    <div className="">
      <Header searchComponent={searchComponent} />
      <NavBar
        searchComponent={searchComponent}
        showSearchComponent={() => showSearchComponent(!searchComponent)}
      />
      <ListItemCart />
      <Footer />
      <Button
        className={`fixed font-bold left-8 bottom-4 bg-blue-500 rounded-full ${
          isVisible ? 'block' : 'hidden'
        }`}
        onClick={scrollToTop}
      >
        <UpOutlined />
      </Button>
    </div>
  )
}
export default CartPage
