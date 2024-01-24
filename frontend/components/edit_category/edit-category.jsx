'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'
import { notification } from 'antd'
import { LeftCircleOutlined } from '@ant-design/icons'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectItem } from '@nextui-org/select'
import axios from 'axios'
import { putApi } from '@/lib/fetch'

const EditCategory = () => {
  const [categories, setCategories] = useState()
  const getAllCategories = (
    url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/category`
  ) => {
    try {
      const options = {
        method: 'GET',
        url: url
      }
      axios
        .request(options)
        .then(function (response) {
          setCategories(response.data)
        })
        .catch(function (error) {
          console.error(error)
        })
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }
  const [parentCategory, setParentCategory] = useState('')
  const data = useSearchParams()

  useEffect(() => {
    getAllCategories()
    if (data.get('parent_category') !== '0') {
      setParentCategory(data.get('parent_category'))
    }
  }, [])
  const param = useParams()

  const [categoryName, setCategoryName] = useState(data.get('name'))

  const [status, setStatus] = useState(!data.get('status') && 'Disabled')
  const [visibility, setVisibility] = useState(
    !data.get('visibility') && 'Not visible'
  )
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, content) => {
    api[type]({
      message: type,
      description: content
    })
  }

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value)
  }

  const handleStatusChange = (value) => {
    setStatus(value)
  }
  const handleVisibilityChange = (value) => {
    setVisibility(value)
  }

  const handleParentCategory = (value) => {
    setParentCategory(value)
  }

  const handleAddCategory = async () => {
    const res = await putApi({
      endPoint: '/api/category/update',
      data: {
        categoryName: categoryName,
        id: Number(param.categoryID)
        // parentCategoryId: parentCategory ? Number(parentCategory) : null
      }
    })
    if (res.status === 200) {
      openNotificationWithIcon('success', 'Update category successfully')
      getAllCategories()
    }
  }
  const router = useRouter()
  return (
    <div className="w-[100%] bg-gray-100 ">
      <div className="w-[100%] flex flex-row">
        {contextHolder}
        <div className="w-[65%] p-8">
          <div
            className="flex flex-row items-center mb-8 cursor-pointer"
            onClick={() => router.push('/admin/categories')}
          >
            <LeftCircleOutlined className="text-black text-2xl" />
            <p className="text-xl font-bold mx-3">Chỉnh sửa category</p>
          </div>
          <div className="shadow-md px-8 py-10 mb-6 bg-white rounded-md">
            <p className="font-bold mb-5">Thông tin chung</p>
            <p className="text-sm mx-2 mb-1 mt-8">Tên category</p>
            <Input
              className="rounded-full px-4"
              type="text"
              placeholder="Nhập tên category"
              value={categoryName}
              onChange={handleCategoryNameChange}
            />
            <p className="text-sm mx-2 mb-1 mt-8">Parent category</p>
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Select
                variant="bordered"
                placeholder="Select parent category"
                selectedKeys={parentCategory}
                className="max-w-xs rounded-full"
                size="sm"
                radius="full"
                onChange={(event) => handleParentCategory(event.target.value)}
              >
                {categories?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.categoryName}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="w-[30%] mt-[92px]">
          <div className="shadow-md px-8 py-10 mb-6 bg-white rounded-md">
            <p className="font-bold mb-4">Trạng thái</p>
            <p className="text-sm mb-3 mt-6">Status</p>
            <RadioGroup
              className="flex flex-row my-4 gap-6"
              defaultValue="Disabled"
              onValueChange={handleStatusChange}
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  className={
                    status === 'Disabled' ? 'border-blue-600 text-blue-600' : ''
                  }
                  value="Disabled"
                  id="Disabled"
                />
                <Label htmlFor="Disabled">Disabled</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  className={
                    status === 'Enabled' ? 'border-blue-600 text-blue-600' : ''
                  }
                  value="Enabled"
                  id="Enabled"
                />
                <Label htmlFor="Enabled">Enabled</Label>
              </div>
            </RadioGroup>
            <p className="text-sm mb-3 mt-6">Visibility</p>
            <RadioGroup
              className="flex flex-row my-4 gap-6"
              defaultValue="Not visible"
              onValueChange={handleVisibilityChange}
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  className={
                    visibility === 'Not visible'
                      ? 'border-blue-600 text-blue-600'
                      : ''
                  }
                  value="Not visible"
                  id="Not visible"
                />
                <Label htmlFor="Not visible">Not visible</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  className={
                    visibility === 'Visible'
                      ? 'border-blue-600 text-blue-600'
                      : ''
                  }
                  value="Visible"
                  id="Visible"
                />
                <Label htmlFor="Visible">Visible</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="w-[100%] bg-gray-100 ">
        <Button
          className="w-[95%] rounded-full p-8 mb-20 ml-8"
          onClick={handleAddCategory}
        >
          Hoàn tất
        </Button>
      </div>
    </div>
  )
}
export default EditCategory
