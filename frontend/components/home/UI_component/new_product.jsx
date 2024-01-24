'use client'

import React, { useState, useEffect } from 'react'
import CollectionList from '../../../app/(pages)/collection/collection-list'
import axios from 'axios'
import CardProductTest from '../../card/card-product-test'
import { Button } from '@/components/ui/button'
import { set } from 'lodash'

const NewProduct = () => {
  const [isNewProduct, setNewProduct] = useState(true)
  const [responseData, setResponseData] = useState({})
  const [responseDataNew, setResponseDataNew] = useState({})
  const handleChangeToNewProduct = () => {
    setNewProduct(false)
  }
  const handleChangeToSale = () => {
    setNewProduct('true')
  }
  const handleGetMacHangNgay = (
    url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/product/mac-hang-ngay`
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
  const handleGetDoTheThao = (
    url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/product/do-the-thao`
  ) => {
    try {
      const options = {
        method: 'GET',
        url: url
      }
      axios
        .request(options)
        .then(function (response) {
          setResponseDataNew({
            ...response.data,
            data: responseDataNew.data
              ? [...responseDataNew.data, ...response.data.data]
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
  useEffect(() => {
    handleGetMacHangNgay()
    handleGetDoTheThao()
  }, [])

  return (
    <div>
      <div className="flex items-center mx-8 mt-8">
        <span
          className={`text-2xl font-bold cursor-pointer ${
            isNewProduct ? 'text-black' : 'text-gray-300'
          } hover:text-black`}
          onClick={handleChangeToSale}
        >
          Sản phẩm mới
        </span>
        <div className="border-[2px] border-gray-300 h-6 mx-4"></div>
        <span
          className={`text-2xl font-bold cursor-pointer ${
            isNewProduct ? 'text-gray-300' : 'text-black'
          } hover:text-black`}
          onClick={handleChangeToNewProduct}
        >
          Bán chạy nhất
        </span>
      </div>
      {isNewProduct ? (
        <>
          <CollectionList data={responseData.data} />
          {responseData.data &&
            responseData.pageNumber !== responseData.totalPages && (
              <div className="flex items-center justify-center flex-col py-[20px] relative mt-[40px] gap-5">
                <Button
                  variant="outline"
                  className="rounded-[1.5rem] bg-black text-white uppercase h-[45px] py-[0.875rem] px-[2.875rem] font-[700] hover:bg-gray-300/60 hover:text-black"
                  onClick={() => handleGetMacHangNgay(responseData.nextPage)}
                >
                  Xem thêm
                </Button>
                <p className="opacity-60 text-xs">
                  Hiển thị 1 - {Object.keys(responseData.data).length} trên tổng
                  số {responseData.totalRecords} sản phẩm
                </p>
              </div>
            )}
        </>
      ) : (
        <>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 grid-cols-2 pt-[45px] max-w-full px-[30px] mx-auto">
            {responseDataNew.data &&
              responseDataNew.data.map((product, index) => {
                return <CardProductTest key={index} product={product} />
              })}
          </div>
          {responseDataNew.data &&
            responseDataNew.pageNumber !== responseDataNew.totalPages && (
              <div className="flex items-center justify-center flex-col py-[20px] relative mt-[40px] gap-5">
                <Button
                  variant="outline"
                  className="rounded-[1.5rem] bg-black text-white uppercase h-[45px] py-[0.875rem] px-[2.875rem] font-[700] hover:bg-gray-300/60 hover:text-black"
                  onClick={() => handleGetDoTheThao(responseDataNew.nextPage)}
                >
                  Xem thêm
                </Button>
                <p className="opacity-60 text-xs">
                  Hiển thị 1 - {Object.keys(responseDataNew.data).length} trên
                  tổng số {responseDataNew.totalRecords} sản phẩm
                </p>
              </div>
            )}
        </>
      )}
    </div>
  )
}
export default NewProduct
