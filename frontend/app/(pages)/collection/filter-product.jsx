'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Chip } from '@nextui-org/chip'
import { useState } from 'react'
const FilterProduct = ({ title, filter, setFilter }) => {
  const value = {
    'a-z': 'Mới nhất',
    'z-a': 'Bán chạy',
    'gia-thap-den-cao': 'Giá thấp đến cao',
    'gia-cao-den-thap': 'Giá cao đến thấp'
  }
  return (
    <div className="pt-[27px] px-[36px]">
      <div className=" flex items-center justify-start gap-5">
        <div className="text-[26px] font-medium leading-8">{title}</div>
        <div>
          <Select value={filter} onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="a-z">A - Z</SelectItem>
                <SelectItem value="z-a">Z - A</SelectItem>
                <SelectItem value="gia-thap-den-cao">
                  Giá thấp đến cao
                </SelectItem>
                <SelectItem value="gia-cao-den-thap">
                  Giá cao đến thấp
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div
          className="flex items-center underline whitespace-normal text-[14px] font-medium cursor-pointer"
          onClick={() => setFilter('')}
        >
          Xoá lọc
        </div>
      </div>
      {filter && (
        <div className="flex mt-2">
          <Chip onClose={() => setFilter('')} variant="flat">
            {value[filter]}
          </Chip>
        </div>
      )}
    </div>
  )
}

export default FilterProduct
