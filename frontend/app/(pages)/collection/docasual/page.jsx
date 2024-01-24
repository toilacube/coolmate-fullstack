'use client'
import { Separator } from '@/components/ui/separator'
import CollectionBanner from '../collection-banner'
import CollectionList from '../collection-list'
import CollectionNewList from '../collection-new-list'
import CollectionActiveSlider from '../collection-active-slider'
import FilterProduct from '../filter-product'
import CasualFilter from '../casual-filter'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'

const categories = [
  {
    image:
      'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80,format=auto/uploads/September2023/Refdfdctangle_178.png',
    imageHover: 'https://mcdn.coolmate.me/image/September2023/mceclip0_81.jpg',
    type: 'Áo các loại',
    description: 'Áo thun, áo Polo và các áo khác',
    slug: 'ao-cac-loai'
  },
  {
    image:
      'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80,format=auto/uploads/September2023/Rectanffffgle_178.png',
    imageHover:
      'https://media2.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2023/23CMCW.QD006.s.1_71.jpg',
    type: 'Quần các loại',
    description:
      'Áo thun, áo Polo và các áo khácQuần shorts, Jogger, Kaki và Jeans',
    slug: 'quan-cac-loai'
  },
  {
    image:
      'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80,format=auto/uploads/September2023/Rectangleftrer_178.png',
    imageHover:
      'https://media2.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/May2023/_CMM8524.jpg',
    type: 'Phụ kiện các loại',
    description: 'Tất/vớ, mũ và phụ kiện khác',
    slug: 'phu-kien-cac-loai'
  }
]
const CasualPage = () => {
  const [slug, setSlug] = useState('mac-hang-ngay')
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

  const handleGetMacHangNgay = (
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
    handleGetMacHangNgay()
  }, [slug, filter])
  return (
    <div className="pb-[30px]">
      <CasualFilter categories={categories} setFilter={handleSetSlug} />
      <Separator />
      <FilterProduct
        title="Đồ mặc hàng ngày"
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
                onClick={() => handleGetMacHangNgay(productData.nextPage)}
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
        handleGetData={handleGetMacHangNgay}
      />
      <CollectionActiveSlider />
      <CollectionBanner imageUrl="https://mcdn.coolmate.me/image/July2022/mceclip0.jpg" />
    </div>
  )
}

export default CasualPage
