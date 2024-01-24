'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import {
    CloseOutlined,
    PlusOutlined,
    MinusOutlined,
  } from '@ant-design/icons'
  import {Badge} from 'antd';
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { ScrollArea } from "@/components/ui/scroll-area"

const CardItemCart = (props) => {

    const [currentColor, setCurrentColor] = useState(props.productData.color)
    const [currentSize, setCurrentSize] = useState(props.productData.size)

    // console.log(props.productData)

    const groupedByColor = props.productData?.allItemsOfProduct?.reduce((acc, item) => {
        const { productItemId, color, size } = item;
        if (!acc[color]) {
            acc[color] = {
            color,
            size: [],
            productItemId: [],
            };
        }
        acc[color].size = [...new Set([...acc[color].size, size])];
        acc[color].productItemId = [...new Set([...acc[color].productItemId, productItemId])];
        
        return acc;
    }, {});
    
    const colorArray = groupedByColor ? Object.entries(groupedByColor).map(([colorName, colorInfo]) => ({
        color: colorInfo.color,
        productItemId: colorInfo.productItemId,
        size: colorInfo.size
    })) : []
    props.productData.productItemsColor = colorArray

    const increaseProduct = () => {
        props.onNumChange(props.productData.productItemId, props.productData.qty + 1 )
    }
    
    const decreaseProduct = () => {
        if (props.productData.qty > 1) 
            props.onNumChange(props.productData.productItemId, props.productData.qty - 1);
    }
    const deleteProduct = () => {
        props.onDelete(props.productData.productItemId);
    }

    const changeSize = (value) => {
        const indexOfSize = props.productData.productItemsColor[0].size.indexOf(value)
        const newSize = props.productData.productItemsColor[0].productItemId[indexOfSize]
        const oldSize = props.productData.productItemId
        props.onSizeChange(oldSize, newSize)
        setCurrentSize(value)
    }

    const changeColor = (value) => {
        const indexOfColor = props.productData.productItemsColor.findIndex((item) => item.color === value)
        const indexOfSize = props.productData.productItemsColor[indexOfColor].size.indexOf(currentSize)
        const newColor = props.productData.productItemsColor[indexOfColor].productItemId[indexOfSize]
        const oldColor = props.productData.productItemId
        props.onSizeChange(oldColor, newColor)
        setCurrentColor(value)

    }
    const getListSize = () => {
        let listSize = []
        props.productData.productItemsColor.map((item, index) => {
            if (item.color === currentColor) {
                listSize = item.size;
            }
        })
        return listSize
    }

    // console.log(props.productData);

    const addDotsToNumber = (number) => {
        if (number) {
          const numberString = number.toString()
          const length = numberString.length
          let result = ''
          for (let i = 0; i < length; i++) {
            result += numberString[i]
            if ((length - i - 1) % 3 === 0 && i !== length - 1) result += '.'
          }
          return result
        }
      }

    return(
        <div className='w-[100%] flex flex-column'>
             <div className='w-44 h-56 mr-6'>
                <Badge count={props.productData.qty} color='black'>
                    <img className='object-contain rounded-2xl' src={props.productData.img} alt="icon"/>
                </Badge>
            </div>
             
            <div className='w-[100%]'> 
                <p className='font-bold'>{props.productData.name}</p>
                <p className='text-sm'>{props.productData.color} / {props.productData.size}</p>
                <div className='flex flex-column mt-6 gap-1'>
                    <Select defaultValue={props.productData.color} onValueChange={changeColor}> 
                        <SelectTrigger className="w-[100px] h-7 text-xs rounded-lg px-2 border border-black"><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <ScrollArea>
                                <SelectGroup >{props.productData.productItemsColor.map((item, index) => (
                                    <SelectItem className="text-xs" key={index} value={item.color}>{item.color}</SelectItem>))}
                                </SelectGroup>
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                    <Select defaultValue={props.productData.size} onValueChange={changeSize}> 
                        <SelectTrigger className="w-[60px] h-7 text-xs rounded-lg px-2 border border-black"><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <ScrollArea >
                                <SelectGroup>{getListSize().map((itemsize, index) => (
                                    <SelectItem className="text-xs" key={index} value={itemsize}>{itemsize}</SelectItem>))}
                                </SelectGroup>
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                </div>
                <div className="px-2 rounded-lg border border-black inline-block mt-1">
                    <MinusOutlined className="w-3 h-3" onClick={decreaseProduct} />
                    <span className="mx-4 text-sm">{props.productData.qty}</span>
                    <PlusOutlined className="w-3 h-3" onClick={increaseProduct} />
                </div>
                <p className='font-bold mt-3'>{addDotsToNumber(props.productData.price)}đ</p>
            </div>
            <div><CloseOutlined onClick={deleteProduct} /></div>
        </div>

    )
}
export default CardItemCart
