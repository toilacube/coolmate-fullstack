'use client'

import Image from 'next/image'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input as InputClient } from 'antd'
import { User, Archive, Box } from 'lucide-react'
// import { Input } from '@/components/ui/input'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { MenuItem } from './UI_component/nav_bar_test'
import { UserDetailIcon } from './UI_component/user_detail_icon'
import SearchNavBar from './UI_component/search_navbar'
import SearchComponent from './UI_component/search_component'
import ShoppingCart from './UI_component/shopping_cart'
import { useEffect } from 'react'

const iconMap = {
  0: <User className="mr-4 w-4 h-4" />,
  1: <Archive className="mr-4 w-4 h-4" />,
  2: <Box className="mr-4 w-4 h-4" />
}
const NavBar = ({ searchComponent, showSearchComponent, isAdmin = false }) => {
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/sign_in')
  }
  const handleHome = () => {
    router.push('/')
  }
  const handleCart = () => {
    router.push('/cart')
  }
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        showSearchComponent()
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])
  return (
    <div>
      {!searchComponent ? (
        <nav className="bg-black py-1">
          <div className="flex justify-between items-center">
            <div className="container mx-auto flex items-center cursor-pointer">
              <Image
                src="/images/img_logo2.png"
                alt="logo"
                width={80}
                height={40}
                onClick={handleHome}
              />
              <MenuItem />
            </div>
            <div className="flex items-center mr-7 gap-3">
              {/* {isAdmin ? (
                <SearchNavBar
                  data={[
                    {
                      label: 'Customers',
                      type: 'customers',
                      data: [
                        {
                          id: 1,
                          name: 'Test1',
                          icon: iconMap[0]
                        }
                      ]
                    },
                    {
                      label: 'Products',
                      type: 'products',
                      data: [
                        {
                          id: 2,
                          name: 'Test',
                          icon: iconMap[1]
                        }
                      ]
                    },
                    {
                      label: 'Orders',
                      type: 'orders',
                      data: [
                        {
                          id: 3,
                          name: 'Test',
                          icon: iconMap[2]
                        }
                      ]
                    }
                  ]}
                />
              ) : ( */}
              <button
                onClick={showSearchComponent}
                className="group px-2 py-2 items-center flex rounded-md gap-x-2 w-[250px] bg-white transition"
              >
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <p
                  className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600
        dark:group-hover:text-zinc-300 transition"
                >
                  Search
                </p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-mute px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                  <span className="text-xs">Ctrl</span> + K
                </kbd>
              </button>

              {/* )} */}
              {/* <ShoppingCart/> */}
              <UserDetailIcon />
              <ShoppingCartOutlined
                onClick={handleCart}
                className="text-white text-3xl"
              />
            </div>
          </div>
        </nav>
      ) : (
        <div className="flex backdrop-brightness-50 w-full h-full fixed top-9 z-50">
          <SearchComponent showSearchComponent={showSearchComponent} />
        </div>
      )}
    </div>
  )
}
export default NavBar
