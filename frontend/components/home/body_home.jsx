'use client'

import React, { useState } from 'react'
import NewProduct from './UI_component/new_product'
import Banner1 from './UI_component/banner1'
import Banner2 from './UI_component/banner2'
import Banner3 from './UI_component/banner3'
import Banner4 from './UI_component/banner4'

const BodyHome = () => {
  return (
    <div>
      <NewProduct />
      <Banner1 />
      <Banner3 />
      <Banner2 />
      <Banner4 />
    </div>
  )
}
export default BodyHome
