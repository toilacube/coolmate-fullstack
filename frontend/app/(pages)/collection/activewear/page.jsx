'use client'
import { Separator } from '@/components/ui/separator'
import CollectionBanner from '../collection-banner'
import CollectionFilter from '../collection-filter'
import CollectionList from '../collection-list'
import CollectionNewList from '../collection-new-list'
import CollectionActiveSlider from '../collection-active-slider'
import FilterProduct from '../filter-product'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import axios from 'axios'

const imageUrl =
  'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=80,format=auto/uploads/October2023/ac161920-x-475.jpg'
const categories = [
  {
    imageUrl: 'https://mcdn.coolmate.me/image/August2023/mceclip1_71.png',
    slug: 'combo'
  },
  {
    imageUrl: 'https://mcdn.coolmate.me/image/March2023/mceclip3_52.jpg',
    slug: 'ao-the-thao'
  },
  {
    imageUrl: 'https://mcdn.coolmate.me/image/August2022/mceclip3_67.png',
    slug: 'quan-the-thao'
  },
  {
    imageUrl: 'https://mcdn.coolmate.me/image/August2022/mceclip4_32.png',
    slug: 'phu-kien-the-thao'
  },
  {
    imageUrl: 'https://mcdn.coolmate.me/image/March2023/mceclip2_27.jpg',
    slug: 'chay-bo'
  },
  {
    imageUrl: 'https://mcdn.coolmate.me/image/June2023/mceclip0_3.png',
    slug: 'gym'
  }
]
const ActiveWearPage = () => {
  const [slug, setSlug] = useState('do-the-thao')
  const [filter, setFilter] = useState('')
  const handleSetSlug = (newslug) => {
    if (newslug !== slug) {
      setProductData([])
      setSlug(newslug)
    }
  }
  const handleSetFilter = (newFilter) => {
    if (newFilter !== filter) {
      setProductData([])
      setFilter(newFilter)
    }
  }
  const [productData, setProductData] = useState([])

  const handleGetDoTheThao = (
    url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/product/${slug}`
  ) => {
    try {
      const options = {
        method: 'GET',
        url: filter ? `${url}?filter=${filter}` : url
      }
      axios
        .request(options)
        .then(function (response) {
          setProductData({
            ...response.data,
            data: productData.data
              ? [...productData.data, ...response.data.data]
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
    handleGetDoTheThao()
  }, [slug, filter])
  return (
    <div className="pb-[30px]">
      <CollectionBanner imageUrl={imageUrl} />
      <div className="flex flex-col items-center text-center justify-center py-8">
        <h1 className="font-bold text-[32px]">Coolmate Active</h1>
        <div className="max-w-[1100px] text-[16pt] py-5">
          Dòng sản phẩm thể thao ứng dụng các chất liệu và thiết kế mới với
          nhiều tính năng ưu việt giúp bạn thoải mái và tập trung hơn vào các
          chuyển động của mình.
        </div>
      </div>
      <Separator />
      <CollectionFilter categories={categories} setSlug={handleSetSlug} />
      <Separator />
      <FilterProduct
        title="Đồ thể thao"
        filter={filter}
        setFilter={handleSetFilter}
      />
      <>
        <CollectionList data={productData.data} />
        {productData.data &&
          productData.pageNumber !== productData.totalPages && (
            <div className="flex items-center justify-center flex-col py-[20px] relative mt-[40px] gap-5">
              <Button
                variant="outline"
                className="rounded-[1.5rem] bg-black text-white uppercase h-[45px] py-[0.875rem] px-[2.875rem] font-[700] hover:bg-gray-300/60 hover:text-black"
                onClick={() => handleGetDoTheThao(productData.nextPage)}
              >
                Xem thêm
              </Button>
              <p className="opacity-60 text-xs">
                Hiển thị 1 - {Object.keys(productData.data).length} trên tổng số{' '}
                {productData.totalRecords} sản phẩm
              </p>
            </div>
          )}
      </>
      <CollectionNewList
        data={productData.data}
        response={productData}
        handleGetData={handleGetDoTheThao}
      />
      <CollectionActiveSlider />
      <CollectionBanner imageUrl="https://mcdn.coolmate.me/image/July2022/mceclip0.jpg" />
    </div>
  )
}

export default ActiveWearPage
