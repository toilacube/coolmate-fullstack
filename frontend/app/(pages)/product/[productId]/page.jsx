'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../../../components/header/header'
import NavBar from '../../../../components/nav-bar/nav_bar'
import Footer from '../../../../components/footer/footer'
import DetailProduct from '../../../../components/detail_product/detail_product'
import ListComment from '../../../../components/list_comment/list_comment'
import { Button } from '@/components/ui/button'
import { UpOutlined } from '@ant-design/icons'

const DetailProductPage = ({ params }) => {
  const [isVisible, setIsVisible] = useState(false)
  const productId = params
  ? JSON.parse(decodeURIComponent(params.productId))
  : null

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
      <DetailProduct productId={productId} />
      <ListComment productId={productId} />
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
export default DetailProductPage
