import { useState } from 'react'
import * as XLSX from 'xlsx'
import { GoUpload } from 'react-icons/go'
import { BsFiletypeXlsx } from 'react-icons/bs'
import { useEffect } from 'react'
import { putApi } from '@/lib/fetch'
import { Tooltip, notification } from 'antd'

const ImportExcel = ({ getData }) => {
  const [data, setData] = useState([])
  const [updateData, setUpdateData] = useState([])
  const [excelName, setExcelName] = useState('')
  const [api, contextHolder] = notification.useNotification()
  const openNotification = (description) => {
    api.info({
      message: `Notification`,
      description: description,
      placement: 'topRight',
      duration: 2
    })
  }
  const convertToJson = (headers, data) => {
    const rows = []
    data.forEach((row) => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      })
      rows.push(rowData)
    })
    return rows
  }
  const importExcel = (e) => {
    const file = e.target.files[0]
    setExcelName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: 'binary' })
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      const headers = fileData[0]
      // const heads = headers.map((head) => head.replace(/ /g, '_'))
      const rows = fileData.slice(1)
      const jsonData = convertToJson(headers, rows)
      setData(jsonData)
    }
    return reader.readAsBinaryString(file)
  }
  useEffect(() => {
    if (data) {
      setUpdateData(
        data.map((item) => {
          return { productItemId: item.ID, newQty: item.Quantity }
        })
      )
    }
  }, [data])
  const handleUpdateListProductItems = async () => {
    const res = await putApi({
      endPoint: '/api/productItem/updateQtyOfListItem',
      data: updateData
    })
    if (res.status === 200) {
      openNotification('Cập nhật thành công')
      setUpdateData([])
      getData()
    }
  }
  return (
    <div className="ml-4 flex items-center gap-4">
      {contextHolder}
      <label htmlFor="upload-file" className="cursor-pointer">
        <input
          type="file"
          onChange={importExcel}
          className="hidden"
          name="upload-file"
          id="upload-file"
        />
        <div className="flex cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md items-center border-1 p-2 text-sm">
          Upload Excel
          <GoUpload className="ml-2 h-4 w-4" />
        </div>
      </label>
      {updateData.length > 0 && excelName && (
        <Tooltip title="Update List ProductItems" color="volcano">
          <div
            className="flex items-center text-sm cursor-pointer text-link underline"
            onClick={handleUpdateListProductItems}
          >
            {excelName}
            <BsFiletypeXlsx className="ml-1 h-3 w-3" />
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default ImportExcel
