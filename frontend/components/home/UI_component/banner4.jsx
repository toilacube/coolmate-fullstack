'use client'

import React, { useState} from 'react'
import { Button } from "@/components/ui/button"
import {ArrowRightOutlined} from '@ant-design/icons';

const Banner4 = () => {


    return(
        <div className='flex flex-row justify-between items-center m-2'> 
           <div className='relative my-12 m-2 cursor-pointer'> 
                <img src="https://media.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip1_36.png" alt="banner"/>  
            </div>
            <div className='relative my-12 m-2 cursor-pointer'> 
                <img src="https://media.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip0_40.png" alt="banner"/>  
            </div>
            <div className='relative my-12 m-2 cursor-pointer'> 
                <img src="https://media.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip3_86.png" alt="banner"/>  
            </div>
            <div className='relative my-12 m-2 cursor-pointer'> 
                <img src="https://media.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip4_7.png" alt="banner"/>  
            </div>
            


        </div>
        

    )
}
export default Banner4
