'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../../components/header/header'
import Footer from '../../../components/footer/footer'
import NavBar from '../../../components/nav-bar/nav_bar'
import Ranking from '../../../components/ranking/ranking'
import UserAccount from '../../../components/user-account/user-account'
import { Button } from '@/components/ui/button'
import { UpOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const Account = () => {
  const [isVisible, setIsVisible] = useState(false)
  const user = useSelector((state) => state.user)
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

  return (
    <div className="">
      <Header />
      <NavBar />
      <div className="bg-gray-300 py-12">
        <Ranking />
        <UserAccount />
      </div>
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
export default Account
