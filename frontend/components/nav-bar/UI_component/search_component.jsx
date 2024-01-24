/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Separator } from '@/components/ui/separator'
import { MdClose } from 'react-icons/md'

import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../app/hooks/useDebounce'
import SearchProduct from './search_product'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SearchComponent = ({ showSearchComponent }) => {
  const router = useRouter()

  const [responseData, setResponseData] = useState([])
  const [value, setValue] = useState('')
  const searchDebounce = useDebounce(value, 500)
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ROOT}/api/product/search?searchTerm=${searchDebounce}`
      )
      setResponseData(res.data)
    }
    fetchData()
  }, [searchDebounce])
  const handleDetailProduct = (product) => {
    router.push(
      `/product/${encodeURIComponent(
        JSON.stringify({
          productId: product.id
        })
      )}`
    )
  }
  return (
    <div className="w-full h-full flex flex-col backdrop-brightness-50">
      <Separator />
      <div className=" w-full min-h-[100px] flex items-center justify-center bg-white">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          prefix={<SearchOutlined className="mx-2" />}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="max-w-md p-2 rounded-3xl"
        />
        <MdClose
          className="h-6 w-6 ml-[30px] cursor-pointer"
          onClick={showSearchComponent}
        />
      </div>
      <div className="h-full w-[1000px] bg-white rounded-md place-self-center mt-3 pt-[40px] px-[80px]">
        {!searchDebounce && (
          <div className="w-full h-fit mb-5">
            <div className="text-base font-medium">
              Từ khóa nổi bật ngày hôm nay
            </div>
            <div className="flex flex-wrap items-center justify-start gap-3 py-4">
              <span
                className="border py-2 px-3 rounded-2xl font-medium text-xs capitalize cursor-pointer border-teal-400"
                onClick={() => setValue('Polo')}
              >
                Polo
              </span>
              <span
                className="border py-2 px-3 rounded-2xl font-medium text-xs capitalize cursor-pointer border-teal-400"
                onClick={() => setValue('T-shirt')}
              >
                T-shirt
              </span>
              <span
                className="border py-2 px-3 rounded-2xl font-medium text-xs capitalize cursor-pointer border-teal-400"
                onClick={() => setValue('Jeans')}
              >
                Jeans
              </span>
              <span
                className="border py-2 px-3 rounded-2xl font-medium text-xs capitalize cursor-pointer border-teal-400"
                onClick={() => setValue('Gym')}
              >
                Gym
              </span>
            </div>
          </div>
        )}
        <div className="flex w-full h-full flex-col">
          <div className="text-xl font-bold">Sản phẩm tìm kiếm</div>
          <div className="w-full h-full pt-[10px]">
            {!!responseData.length ? (
              <ScrollShadow className="w-full h-[500px] flex flex-wrap gap-4 justify-start pt-4 pb-2">
                {responseData.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="w-[190px] h-[340px] mb-5 cursor-pointer"
                      onClick={() => handleDetailProduct(product)}
                    >
                      <SearchProduct product={product} />
                    </div>
                  )
                })}
              </ScrollShadow>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-zinc-400 capitalize">Not found this!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchComponent
