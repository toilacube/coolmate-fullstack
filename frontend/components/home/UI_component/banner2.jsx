'use client'

import React, { useState} from 'react'
import { Button } from "@/components/ui/button"

const Banner2 = () => {


    return(
        <div className='relative my-12 '> 
            <img src="https://mcdn.coolmate.me/image/September2023/mceclip5_29.jpg" alt="banner"/>
            <span className='absolute font-bold uppercase text-7xl top-12 left-8 w-[500px]'>ĐỒ MẶC HÀNG NGÀY</span>
            <span className='absolute font-semibold text-l top-[230px] left-8'>3 triệu chiếc áo đã đến tủ đồ các chàng</span>
            <span className='absolute font-semibold text-l top-[255px] left-8 text-blue-600'>Mua combo 3 nhận ngay quà tặng</span>
            <Button className='absolute top-[300px] font-semibold uppercase left-8 w-52 rounded-full'>Khám phá ngay</Button>
        </div>
        

    )
}
export default Banner2
