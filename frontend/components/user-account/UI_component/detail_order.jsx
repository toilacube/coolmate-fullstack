'use client'
import React, { useState } from 'react';
import Image from 'next/image'

const DetailOrder = (props) => {

    const addDotsToNumber = (number) => {
        if(number) {
            const numberString = number.toString();
            const length = numberString.length;
            let result = "";
            for (let i = 0; i < length; i++) {
            result += numberString[i];
            if ((length - i - 1) % 3 === 0 && i !== length - 1) 
                result += ".";
            }
            return result;
        }
    }
    return(
        <div className='w-[100%] flex my-6 items-center'>
            <img className='w-24 h-28 object-cover rounded-xl mx-4' src={props.colorChose.imgs} alt="icon"/>
            <div>
                <p className='text-sm font-bold'>{props.name}</p>
                <p className='text-sm'>{props.colorChose.color_name} / {props.sizeChose}</p>
                <p className='text-sm'>x{props.num}</p>
                <p className='text-sm font-bold'>{addDotsToNumber(props.price)}đ</p>
            </div>
           
        </div>

    )
}
export default DetailOrder
