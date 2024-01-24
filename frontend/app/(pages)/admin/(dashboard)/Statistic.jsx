/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import React, { useState, useEffect } from 'react'
import './Statistic.scss'
import { Card } from './Card'
import axios from 'axios'
import { notification } from 'antd'
import { handleDate } from '@/lib/utils'

export default function SaleStatistic() {

  const [data, setData] = useState([])
  const [period, setPeriod] = useState('monthly')
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, content) => {
    api[type]({
      message: 'Lỗi',
      description: content
    })
  }

  const handleGetSaleStatistic = () => {
    try {
      const options = {
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/statistic/salestatistic?period=${period}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      axios
        .request(options)
        .then(function (response) {
          // console.log(period)
          console.log(response.data)
          setData(response.data.data.map((item) => {
            return {...item, time: handleDate(item.time)}
          }))
        })
        .catch(function (error) {
          console.error(error)
          if (error.response.status === 401)
            openNotificationWithIcon('error', `Đăng nhập để tiếp tục`)
          else openNotificationWithIcon('error', error.response.data)
        })
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  useEffect(() => {
    handleGetSaleStatistic()
  }, [])


  useEffect(() => {
    handleGetSaleStatistic()
  }, [period])


  return (
    <Card 
      title="Sale Statistics"
      actions={[
        {
          name: 'Daily',
          onAction: () => setPeriod('daily')
        },
        {
          name: 'Weekly',
          onAction: () => setPeriod('weekly')
        },
        {
          name: 'Monthly',
          onAction: () => setPeriod('monthly')
        }
      ]}
    >{contextHolder}
      <Card.Session>
        {data.length === 0 ? null : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: -25,
                bottom: 5
              }}
            >
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              {/* <Area
                type="monotone"
                dataKey="value"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              /> */}
              <Area
                type="monotone"
                dataKey="count"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card.Session>
    </Card>
  )
}
// }
