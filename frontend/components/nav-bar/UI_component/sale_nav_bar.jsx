'use client'

import Image from 'next/image'
import Link from 'next/link';
import React, { useState} from 'react'
import { useRouter } from 'next/navigation'
import NomalTextNav from './nomal_txt_nav'
import HeaderTextNav from './header_txt_nav'
import ImgTxtNav from './img_txt_nav'
import ImgNav from './img_nav'
import { Avatar, Space } from 'antd';


const SaleNavBar = () => {

    const router = useRouter();

    const handleMove= () => {
        router.push('/')
    }
  
    return(
        <div className="bg-bg_nav mx-10 p-5 flex justify-between">
            

            <div className="flex justify-between">
                <div className="ml-8">
                    <HeaderTextNav content="Theo sản phẩm"/>
                    <NomalTextNav content="Tất cả"/>
                    <NomalTextNav content="Sản phẩm mới"/>
                </div>
                <div className="ml-8">
                    <HeaderTextNav content="Áo nam"/>
                    <NomalTextNav content="Tất cả áo nam"/>
                    <NomalTextNav content="Áo thun"/>
                    <NomalTextNav content="Áo sơ mi"/>
                    <NomalTextNav content="Áo polo"/>
                    <NomalTextNav content="Áo tanktop"/>
                    <NomalTextNav content="Áo thể thao"/>
                </div>
                <div className="ml-8">
                    <HeaderTextNav content="Quần nam"/>
                    <NomalTextNav content="Tất cả quần nam"/>
                    <NomalTextNav content="Quần jogger"/>
                    <NomalTextNav content="Quần dài"/>
                    <NomalTextNav content="Quần short"/>
                    <NomalTextNav content="Quần jean"/>
                </div>
                <div className="ml-8">
                    <HeaderTextNav content="Phụ kiện"/>
                    <NomalTextNav content="Tất cả Phụ kiện"/>
                    <NomalTextNav content="Mũ"/>
                    <NomalTextNav content="Vớ"/>
                </div>
            </div>
            <hr className="border-l border-solid border-black h-40"></hr>
            <div className="flex flex-col items-center">
                <HeaderTextNav content="Sale"/>
                <div>
                    <ImgTxtNav content="Tất cả SALE" src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/March2023/blue_copy.jpg"/>
                    <ImgTxtNav content="SALE áo" src="https://mcdn.coolmate.me/image/October2023/mceclip1_23.png"/>
                </div>
                
               
            </div>
            <hr className="border-l border-solid border-black h-40"></hr>
            <div>
                <div>
                    <ImgNav content="Polo thể thao V2" src="https://mcdn.coolmate.me/image/August2023/mceclip18_10.jpg"/> 
                    <ImgNav content="T-shirt Marvel Captain" src="https://mcdn.coolmate.me/image/August2023/mceclip15_13.jpg"/> 
                </div>
                <ImgNav content="Polo thể thao V1" src="https://mcdn.coolmate.me/image/August2023/mceclip18_10.jpg"/> 
            </div>
            
        </div>

    )
}
export default SaleNavBar
