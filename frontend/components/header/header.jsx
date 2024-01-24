'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const Header = ({ searchComponent = false }) => {
  return (
    <header
      className={cn(
        'bg-white-800 text-black py-1',
        !!searchComponent && 'fixed top-0 z-50 bg-white w-full'
      )}
    >
      <nav className="container flex justify-between items-center">
        <div className="text-xl flex items-center">
          <Image
            src="/images/img_logo1.png"
            alt="logo"
            width={100}
            height={40}
          />
          <ul className="ml-5 flex space-x-6">
            <li>
              <a href="#">CM24</a>
            </li>
            <li>
              <a href="#">28PRISING</a>
            </li>
            <li>
              <a href="#">COOLXPRINT</a>
            </li>
          </ul>
        </div>
        <ul className="flex space-x-6">
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Về Coolmate</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Header
