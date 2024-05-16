/* eslint-disable camelcase */
'use client'
import React, { useState, useEffect }  from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import axios from 'axios'
import './Lifetimesales.scss'
import { Card } from './Card'
import Dot from './Dot'

const COLORS = ['#aee9d1', '#fed3d1', '#a4e8f2']
const RADIAN = Math.PI / 180
export default function LifetimeSale({ api }) {

  const [salesData, setSalesData] = useState([])

  const handleGetLifeTimeSale = () => {
    try {
      const options = {
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/statistic/lifetimesales`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      axios
        .request(options)
        .then(function (response) {
          setSalesData(response.data)
        })
        .catch(function (error) {
          console.error(error.response.data)
        })
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  useEffect(() => {
    handleGetLifeTimeSale()
  }, [])

  const chartData = [
    { name: 'Completed', value: salesData?.completedPercentage },
    { name: 'Cancelled', value: salesData?.cancelledPercentage },
    {
      name: 'Others',
      value: 100 - salesData?.completedPercentage - salesData?.cancelledPercentage
    }
  ]
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    ...rests
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
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

  return (
    <div className="w-full h-full space-y-4">
      <Card title="Lifetime Sales">
        <Card.Session>
          <div className="grid grid-cols-1 gap-1">
            <div className="flex space-x-2 items-center">
              <Dot color="#a4e8f2" />
              <div className="self-center text-sm">{salesData?.totalOrders} orders</div>
            </div>
            <div className="flex space-x-2 items-center">
              <Dot color="#a4e8f2" />
              <div className="self-center text-sm">{addDotsToNumber(salesData?.totalSales)}đ lifetime sale</div>
            </div>
            <div className="flex space-x-2 items-center">
              <Dot color="#aee9d1" />
              <div className="self-center text-sm">
                {salesData?.completedPercentage}% of orders completed
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <Dot color="#fed3d1" />
              <div className="self-center text-sm">
                {salesData?.cancelledPercentage}% of orders cancelled
              </div>
            </div>
          </div>
        </Card.Session>
      </Card>
      <Card>
        <Card.Session>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {
                    chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))
                  }
                </Pie>
                <Tooltip labelStyle={{ fontSize: 14 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card.Session>
      </Card>
    </div>
  )
}
