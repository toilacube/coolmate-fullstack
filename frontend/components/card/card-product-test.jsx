'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { notification } from 'antd'

const CardProductTest = (props) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState(false)
  const { product } = props
  const [productItem, setProductItem] = useState(product.productItems[0])
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, content) => {
    api[type]({
      message: type,
      description: content
    })
  }

  // console.log(product)
  const handleAddCart = (item, productItemId) => {
    console.log(productItem)
    try {
      const options = {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/cart/add`,
        data: {
          productItemId: productItemId,
          quantity: 1
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      axios
        .request(options, {})
        .then(function (response) {
          console.log(response.data)
          openNotificationWithIcon(
            'success',
            <div
              className="cursor-pointer"
              onClick={() => router.push('/cart')}
            >
              <b>Đã thêm vào giỏ hàng</b>
              <div className="flex flex-row mt-2">
                <img
                  className="rounded-[10px] w-20"
                  src={productItem?.productItemImages[0]}
                  alt={`img ${product.name}`}
                />
                <div>
                  <b className="ml-4">{product.name}</b>
                  <p className="text-blue-500 ml-4">
                    {productItem.color}/{item}
                  </p>
                  <p className="ml-4">{productItem.priceStr}</p>
                  <p className="ml-4">Số lượng: 1</p>
                </div>
              </div>
            </div>
          )
        })
        .catch(function (error) {
          console.log(error)
          if (error.response.status === 401)
            openNotificationWithIcon('error', `Đăng nhập để tiếp tục`)
          else openNotificationWithIcon('error', error.response.data)
        })
    } catch (error) {
      console.log('Error')
    }
  }

  const handleDetailProduct = () => {
    router.push(
      `/product/${encodeURIComponent(
        JSON.stringify({
          productId: product.id
        })
      )}`
    )
  }

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

  // console.log(productItem)

  return (
    <AspectRatio ratio={9 / 16}>
      {contextHolder}
      <div className=" flex flex-col h-[485px] w-full">
        <AspectRatio ratio={9 / 16} className="flex flex-col h-full">
          <div className="relative group flex flex-[75%] overflow-hidden rounded-xl mb-[15px]">
            <AspectRatio ratio={3 / 4}>
              <Image
                alt={product.name}
                objectFit="cover"
                width={672}
                height={990}
                src={
                  !isHover
                    ? productItem?.productItemImages[0]
                    : productItem?.productItemImages[1]
                }
                className="cursor-pointer"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              />
            </AspectRatio>

            <span
              className="absolute top-[0.625rem] right-[0.75rem] text-white bg-[#2f5acf]
          rounded-[5px] px-[10px] font-bold z-[2] text-[0.625rem] h-[22px] justify-center items-center flex capitalize"
            >
              Mới
            </span>
            {productItem?.sizes ? (
              <div
                className="absolute bottom-[1.5rem] left-[9%] max-w-[calc(100%-3rem)] w-full
            lg:visible opacity-0 backdrop-blur-[20px] group-hover:opacity-100
            rounded-[8px] py-[0.7rem] px-[0.75rem] transition-all z-[2] 
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
                  {productItem.sizes.map((item, index) => (
                    <div key={index}>
                      <button
                        className="bg-white text-black rounded-[0.5rem] text-[13px] w-[40px] h-[35px] font-[590] hover:text-white hover:bg-gray-300/70"
                        // onClick={() => console.log('click')}
                        onClick={() =>
                          handleAddCart(item, productItem.itemIds[index])
                        }
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
                <p className="font-bold text-center mb-2 px-[3px] text-[13px] text-black cursor-pointer">
                  Thêm nhanh vào giỏ hàng +
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-[25%] flex-col rounded-xl">
            <div className="flex flex-wrap mx-[-2px] mb-[10px]">
              {product.productItems.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    'relative flex items-center justify-center cursor-pointer h-[26px] w-[41px]',
                    productItem.id === item.id &&
                      'border border-solid border-[#000] rounded-xl'
                  )}
                  onClick={() => setProductItem(item)}
                >
                  <Image
                    alt="Product Image Color"
                    className=" rounded-2xl p-[3px] bg-no-repeat bg-[50%] bg-[length:250%]"
                    src={item.colorImage}
                    fill
                  />
                </div>
              ))}
            </div>
            <h3
              className="font-[400] text-[14px] mb-[0.75rem] leading-5 cursor-pointer"
              onClick={() => handleDetailProduct()}
            >
              {product.name}
            </h3>
            <p className="text-sm mx-0 mt-[-10px] mb-[5px] text-[#0009]">
              {productItem.color}
            </p>
            <div className="flex flex-row-reverse justify-end text-sm font-[400]">
              <span className="text-red-500 ml-[10px]">-0%</span>
              <del className="text-[#c4c4c4]">
                {addDotsToNumber(product.priceInt)}đ
              </del>
              <ins className="text-[#000] mr-[14px] font-[700] no-underline">
                {addDotsToNumber(product.priceInt)}đ
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

export default CardProductTest
