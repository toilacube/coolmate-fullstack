'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

const CardProduct = () => {
  const [isHover, setIsHover] = useState(false)

  const product = {
    images: [
      {
        name: 'Đen',
        imageColor:
          'https://media.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/October2023/mau_vai_combo-1.jpg',
        image:
          'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80/image/September2023/graphic.spec.14_50.jpg',
        imageHover:
          'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80/image/September2023/graphic.spec.11_1.jpg'
      },
      {
        name: 'Đỏ',
        imageColor:
          'https://media.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/September2023/mau_vai_combo-6.jpg',
        image:
          'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80/image/September2023/graphic.spec.4_21.jpg',
        imageHover:
          'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80/image/September2023/graphic.spec.11_1.jpg'
      }
    ],
    title: 'Đai đeo bụng chạy bộ',
    color: 'Đen',
    size: ['M', 'L', 'XL', '2XL', '3XL', '4XL'],
    price: '299.000đ',
    description: 'new'
  }
  const [isColorCurrent, setIsColorCurrent] = useState(product?.images[0])
  return (
    <AspectRatio ratio={9 / 16}>
      <div className=" flex flex-col h-[485px] w-full">
        <AspectRatio ratio={9 / 16} className="flex flex-col h-full">
          <div className="relative group flex flex-[75%] overflow-hidden rounded-xl mb-[15px]">
            <AspectRatio ratio={3 / 4}>
              <Image
                alt={product.title}
                objectFit="cover"
                width={672}
                height={990}
                src={
                  !isHover ? isColorCurrent?.image : isColorCurrent?.imageHover
                }
                className="cursor-pointer"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              />
            </AspectRatio>
            <div className="absolute top-[0.625rem] left-[0.75rem] z-[2]">
              <div className="flex items-center mx-[-3px]">
                <div>4.8</div>
                <div>
                  <AiFillStar className="w-[12px] h-[10px] mx-[2px]" />
                </div>
                <div className="text-[14px] font-bold tracking-[0.03rem] text-[#2f5acf]">
                  (40)
                </div>
              </div>
            </div>
            <span
              className="absolute top-[0.625rem] right-[0.75rem] text-white bg-[#2f5acf]
          rounded-[5px] px-[10px] font-bold z-[2] text-[0.625rem] h-[22px] justify-center items-center flex capitalize"
            >
              {product.description}
            </span>
            {product?.size ? (
              <div
                className="absolute bottom-[1.5rem] left-[9%] max-w-[calc(100%-3rem)] w-full
            lg:visible opacity-0 backdrop-blur-[20px] group-hover:opacity-100
            rounded-[8px] py-[0.7rem] px-[0.75rem] transition-all invisible z-[2]
            "
                style={{
                  background:
                    'linear-gradient(0deg,rgba(0,0,0,.1),rgba(0,0,0,.1)),hsla(0,0%,100%,.4)'
                }}
              >
                <p className="font-bold text-center mb-2 text-[13px]">
                  Thêm nhanh vào giỏ hàng +
                </p>
                <div className="flex flex-wrap gap-[6px] justify-start items-center mt-2">
                  {product?.size?.map((item, index) => (
                    <div key={index}>
                      <button
                        className="bg-white text-black rounded-[0.5rem] text-[13px] w-[40px] h-[35px] font-[590] hover:text-white hover:bg-gray-300/70"
                        onClick={() => console.log('click')}
                      >
                        {item}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="absolute bottom-[1.5rem] left-[9%] max-w-[calc(100%-3rem)] w-full
            lg:visible opacity-0 backdrop-blur-[20px] group-hover:opacity-100 cursor-pointer
            hover:scale-105 hover:bg-gray-300/70 
            rounded-[16px] pt-[0.7rem] pb-[0.5rem] px-[0.75rem] transition-all invisible z-[2] bg-white
            "
              >
                <p className="font-bold text-center mb-2 px-[3px] text-[13px] text-black ">
                  Thêm nhanh vào giỏ hàng +
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-[25%] flex-col rounded-xl">
            <div className="flex flex-wrap mx-[-2px] mb-[10px]">
              {product.images.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    'relative flex items-center justify-center cursor-pointer h-[26px] w-[41px]',
                    isColorCurrent.imageColor === item.imageColor &&
                      'border border-solid border-[#000] rounded-xl'
                  )}
                  onClick={() => setIsColorCurrent(item)}
                >
                  <Image
                    alt="Product Image Color"
                    className=" rounded-2xl p-[3px] bg-no-repeat bg-[50%] bg-[length:250%]"
                    src={item.imageColor}
                    fill
                  />
                </div>
              ))}
            </div>
            <h3 className="font-[400] text-[14px] mb-[0.75rem] leading-5">
              {product.title}
            </h3>
            <p className="text-sm mx-0 mt-[-10px] mb-[5px] text-[#0009]">
              {isColorCurrent.name}
            </p>
            <div className="flex flex-row-reverse justify-end text-sm font-[400]">
              <span className="text-red-500 ml-[10px]">-8%</span>
              <del className="text-[#c4c4c4]">{product.price}</del>
              <ins className="text-[#000] mr-[14px] font-[700] no-underline">
                {product.price}
              </ins>
            </div>
            <span className="text-[#2f5acf] text-xs italic mt-2 font-[600]">
              Mua 2 giảm thêm 10%
            </span>
          </div>
        </AspectRatio>
      </div>
    </AspectRatio>
  )
}

export default CardProduct
