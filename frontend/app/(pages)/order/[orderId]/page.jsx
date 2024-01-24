'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../../../components/header/header'
import NavBar from '../../../../components/nav-bar/nav_bar'
import Footer from '../../../../components/footer/footer'
import DetailOrder from '../../../../components/detail_order/detail_order'
import { Button } from '@/components/ui/button'
import { UpOutlined } from '@ant-design/icons'

const DetailOrderPage = ({ params }) => {
  const orderData = params
    ? JSON.parse(decodeURIComponent(params.orderId))
    : null
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
    <div>
      <Header searchComponent={searchComponent} />
      <NavBar
        searchComponent={searchComponent}
        showSearchComponent={() => showSearchComponent(!searchComponent)}
      />
      <DetailOrder orderData={orderData} />
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
export default DetailOrderPage
