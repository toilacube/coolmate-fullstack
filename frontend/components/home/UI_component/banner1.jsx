'use client'

import React, { useState} from 'react'
import { Button } from "@/components/ui/button"

const Banner1 = () => {


    return(
        <div className='relative my-12 '> 
            <img src="https://mcdn.coolmate.me/image/September2023/mceclip4_64.jpg" alt="banner"/>
            <span className='absolute font-bold uppercase text-7xl top-12 left-8 w-[300px]'>RUNNING COLLECTION</span>
            <span className='absolute font-semibold text-l top-[230px] left-8 w-[300px]'>Sẵn sàng mặc ngay khi mới mang về</span>
            <span className='absolute font-semibold text-l top-[255px] left-8 w-[300px] text-blue-600'>Mua 2 giảm 10%</span>
            <Button className='absolute top-[300px] font-semibold uppercase left-8 w-52 rounded-full'>Khám phá ngay</Button>
            
        </div>
        

    )
}
export default Banner1
