'use client'

import React, { useState} from 'react'
import { Button } from "@/components/ui/button"

const Banner3 = () => {


    return(
        <div className='flex flex-row justify-between items-center'> 
           <div className='relative my-12 m-4'> 
                <img src="https://media.coolmate.me/image/September2023/mceclip0_39.jpg" alt="banner"/>
                <span className='absolute font-bold uppercase text-5xl top-40 left-8 w-[400px] text-white'>MOOD BOOSTER 2023</span>
                <span className='absolute font-semibold text-l uppercase top-[120px] left-8 w-[300px] text-white text-opacity-60'>NƯỚC HOA CM24</span>
                <Button className='absolute top-[300px] font-semibold uppercase left-8 w-52 rounded-full text-black bg-white'>Khám phá ngay</Button>
                
            </div>
            <div className='relative my-12 m-4'>
            <img src="https://media.coolmate.me/image/September2023/mceclip1_58.jpg" alt="banner"/>
                <span className='absolute font-bold uppercase text-5xl top-40 left-8 w-[400px] text-white'>DISNEY & FRIENDS</span>
                <span className='absolute font-semibold text-l uppercase top-[120px] left-8 w-[280px] text-white text-opacity-60'>84RISING - STREETWEAR</span>
                <Button className='absolute top-[300px] font-semibold uppercase left-8 w-52 rounded-full text-black bg-white'>Khám phá ngay</Button>
            </div>
            


        </div>
        

    )
}
export default Banner3
