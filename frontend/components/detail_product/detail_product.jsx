/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  MinusOutlined,
  ShoppingOutlined
} from '@ant-design/icons'
import { Button } from '@/components/ui/button'
import { Rate } from 'antd'
import axios from 'axios'
import { notification, Space } from 'antd'

const DetailProduct = ({ productId }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [countProduct, setCountProduct] = useState(1)
  const [currentColor, setCurrentColor] = useState(0)
  const [currentSize, setCurrentSize] = useState(0)
  const [responseData, setResponseData] = useState({})
  const [responseReviewData, setResponseReviewData] = useState({})
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, content) => {
    api[type]({
      message: type,
      description: content
    })
  }

  const handleGetDetailProduct = (
    url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/product/get/${productId.productId}`
  ) => {
    try {
      const options = {
        method: 'GET',
        url: url
      }
      axios
        .request(options)
        .then(function (response) {
          setResponseData({
            ...response.data,
            data: responseData.data
              ? [...responseData.data, ...response.data.data]
              : response.data.data
          })
        })
        .catch(function (error) {
          console.error(error)
        })
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  const handleGetReview = (
    url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/review/getOfProduct?productId=${productId.productId}`
  ) => {
    try {
      const options = {
        method: 'GET',
        url: url
      }
      // console.log(options)
      axios
        .request(options)
        .then(function (response) {
          setResponseReviewData(response.data)
        })
        .catch(function (error) {
          console.error(error)
        })
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  useEffect(() => {
    handleGetDetailProduct()
    handleGetReview()
  }, [])

  const groupedByColor = responseData?.productItems?.reduce((acc, item) => {
    const { id, color, colorImage, size, productItemImages, qtyInStock } = item
    if (!acc[color]) {
      acc[color] = {
        color,
        colorImage,
        productItemImages,
        size: [],
        id: [],
        qtyInStock: []
      }
    }
    acc[color].size = [...new Set([...acc[color].size, size])]
    acc[color].id = [...new Set([...acc[color].id, id])]
    acc[color].qtyInStock = [...new Set([...acc[color].qtyInStock, qtyInStock])]

    return acc
  }, {})

  const colorArray = groupedByColor
    ? Object.entries(groupedByColor).map(([colorName, colorInfo]) => ({
        color: colorInfo.color,
        colorImage: colorInfo.colorImage,
        id: colorInfo.id,
        productItemImages: colorInfo.productItemImages,
        qtyInStock: colorInfo.qtyInStock,
        size: colorInfo.size
      }))
    : []
  responseData.productItemsColor = colorArray
  const resultArray = responseData.description
    ? responseData.description.split('|').map((item) => item.trim())
    : []
  responseData.descriptionArray = resultArray

  const increaseProduct = () => {
    setCountProduct(countProduct + 1)
  }

  const decreaseProduct = () => {
    if (countProduct > 0) setCountProduct(countProduct - 1)
  }

  const handleNext = () => {
    setCurrentImage(
      currentImage ===
        responseData?.productItemsColor[currentColor]?.productItemImages
          .length -
          1
        ? 0
        : currentImage + 1
    )
  }

  const handlePrev = () => {
    setCurrentImage(
      currentImage === 0
        ? responseData?.productItemsColor[currentColor]?.productItemImages
            .length - 1
        : currentImage - 1
    )
  }
  const handleChangeCurrentColor = (index) => {
    setCurrentColor(index)
    setCurrentImage(0)
  }

  const handleAddCart = () => {
    const currentQty =
      responseData?.productItemsColor[currentColor]?.qtyInStock[currentSize]
    if (countProduct <= currentQty) {
      try {
        const options = {
          method: 'POST',
          url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/cart/add`,
          data: {
            productItemId:
              responseData.productItemsColor[currentColor].id[currentSize],
            quantity: countProduct
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        axios
          .request(options, {})
          .then(function (response) {
            openNotificationWithIcon(
              'success',
              <div className="">
                <b>Đã thêm vào giỏ hàng</b>
                <div className="flex flex-row mt-2">
                  <img
                    className="rounded-[10px] w-20"
                    src={
                      responseData?.productItemsColor[currentColor]
                        ?.productItemImages[0]?.url
                    }
                    alt={`img ${responseData.name}`}
                  />
                  <div>
                    <b className="ml-4">{responseData.name}</b>
                    <p className="text-blue-500 ml-4">
                      {responseData?.productItemsColor[currentColor]?.color}/
                      {
                        responseData?.productItemsColor[currentColor]?.size[
                          currentSize
                        ]
                      }
                    </p>
                    <p className="ml-4">{responseData.priceStr}</p>
                    <p className="ml-4">Số lượng: {countProduct}</p>
                  </div>
                </div>
              </div>
            )
          })
          .catch(function (error) {
            if (error.response.status === 401)
              openNotificationWithIcon('error', `Đăng nhập để tiếp tục`)
            else
              openNotificationWithIcon('error', `Không thể thêm vào giỏ hàng`)
          })
      } catch (error) {
        console.log('Error:', error)
      }
    } else {
      openNotificationWithIcon(
        'error',
        `Không đủ số lượng sản phẩm, số lượng còn lại là: ${currentQty}`
      )
    }
  }


  return (
    <div className="p-4">
      {contextHolder}
      <span className="text-[12px] text-gray-500 hover:text-blue-500">
        Trang chủ
      </span>
      <span className="text-[12px] mx-2">/</span>
      <span className="text-[12px] hover:text-blue-500 cursor-pointer">
        {responseData?.categoryId}
      </span>

      <div className="flex flex-row">
        <div className="relative w-1/2">
          <div className="flex flex-row justify-center mt-4 mb-4">
            {responseData?.productItemsColor[
              currentColor
            ]?.productItemImages?.map((image, index) => (
              <span
                key={index}
                className={`h-1 w-10 inline-block rounded-full mx-2 ${
                  currentImage === index ? 'bg-black' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentImage(index)}
              ></span>
            ))}
          </div>
          <div className="relative flex items-center">
            <LeftOutlined
              className="text-black text-3xl absolute left-4"
              onClick={handlePrev}
            />
            <img
              loading="lazy"
              className="rounded-[20px]"
              src={
                responseData?.productItemsColor[currentColor]
                  ?.productItemImages[currentImage]?.url
              }
              alt={`Slide ${currentImage + 1}`}
            />
            <RightOutlined
              className="text-black text-3xl absolute right-4"
              onClick={handleNext}
            />
          </div>
          <div className="absolute top-16">
            {responseData?.productItemsColor[
              currentColor
            ]?.productItemImages.map((image, index) => (
              <img
                key={index}
                loading="lazy"
                className={`w-12 h-12 object-cover m-3 rounded-[15px] cursor-pointer border border-black 
                            ${
                              currentImage === index
                                ? ''
                                : 'opacity-50 border border-gray-400'
                            }`}
                src={image.url}
                alt={`Slide ${currentImage + 1}`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>
        <div className="mx-20 my-12">
          <p className="text-4xl font-bold mb-6">{responseData.name}</p>
          <Rate
            disabled
            defaultValue={0}
            value={Math.round(responseReviewData?.rating)}
          />
          <span className="ml-2 text-sm">({responseReviewData.total})</span>
          <p className="text-2xl font-bold mb-8 mt-4">
            {responseData.priceStr}
          </p>
          <p className="mb-2 text-sm">
            Màu sắc:{' '}
            <span className="font-bold">
              {responseData?.productItemsColor[currentColor]?.color}
            </span>
          </p>
          <div className={`flex flex-row`}>
            {responseData?.productItemsColor?.map((color, index) => (
              <img
                key={index}
                className={`w-12 h-8 p-[1px] object-cover rounded-full mb-8 mr-4 
                ${
                  currentColor === index
                    ? 'border border-solid border-2 border-blue-500 '
                    : ''
                }`}
                src={color.colorImage}
                alt={`Màu ${color.color}`}
                onClick={() => handleChangeCurrentColor(index)}
              />
            ))}
          </div>
          <p className="mb-2 text-sm">
            Kích thước Quần:{' '}
            <span className="font-bold">
              {responseData?.productItemsColor[currentColor]?.size[currentSize]}
            </span>
          </p>
          {responseData?.productItemsColor[currentColor]?.size.map(
            (size, index) => (
              <Button
                key={index}
                className={`rounded-[15px] p-6 mr-4 bg-gray-300 text-black mb-8 hover:text-white`}
                onClick={() => setCurrentSize(index)}
              >
                {size}
              </Button>
            )
          )}
          <div className="flex flex-row items-center gap-4 mt-4">
            <div className="p-2 rounded-full border border-black">
              <MinusOutlined className="mx-2" onClick={decreaseProduct} />
              <span className="font-bold mx-4">{countProduct}</span>
              <PlusOutlined className="mx-2" onClick={increaseProduct} />
            </div>
            <div>
              <Button
                className="px-12 py-[21px] rounded-full"
                onClick={() => handleAddCart()}
              >
                <ShoppingOutlined className="mx-2" />
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
          <hr className="my-12"></hr>
          <div>
            <p className="mb-6 text-sm font-bold">Đặc điểm nổi bật:</p>
            {responseData?.descriptionArray.map((feature, index) => (
              <p key={index} className={`my-4 text-sm`}>
                {feature}
              </p>
            ))}
          </div>
        </div>
      </div>
      <hr className="mt-12"></hr>
    </div>
  )
}
export default DetailProduct
