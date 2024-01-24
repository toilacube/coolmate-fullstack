'use client'
import './Bestsellers.scss'
import { Card } from './Card'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function BestSellers() {

  const router = useRouter()
  const [bestSellerProduct, setBestSellersProduct] = useState([])
  const [products, setProducts] = React.useState([
    {
      id: 1,
      name: 'Product 1',
      price: 19.99,
      qty: 10,
      imageUrl:
        'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80/image/September2023/graphic.spec.14_50.jpg'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 29.99,
      qty: 5
    },
    {
      id: 3,
      name: 'Product 3',
      price: 39.99,
      qty: 8
    },
    {
      id: 4,
      name: 'Product 4',
      price: 49.99,
      qty: 15
    },
    {
      id: 5,
      name: 'Product 5',
      price: 59.99,
      qty: 12
    },
  ])

  const handleGetSaleStatistic = () => {
    try {
      const options = {
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/statistic/bestsellers`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      axios
        .request(options)
        .then(function (response) {
          // console.log(response.data)
          setBestSellersProduct(response.data)
        })
        .catch(function (error) {
          console.error(error.response.data)
        })
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  useEffect(() => {
    handleGetSaleStatistic()
  }, [])


  return (
    <Card
      title="Best Sellers"
      actions={[
        {
          name: 'All products',
          onAction: () => {
            router.push('/admin/products')
          }
        }
      ]}
    >
      <Card.Session>
        <table className="w-full bestsellers">
          <tbody>
            {products.length === 0 && (
              <tr>
                <td align="left">
                  Look like you just started. No bestsellers yet.
                </td>
                <td> </td>
              </tr>
            )}
            {bestSellerProduct?.map((p) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={p.productItemId} className="">
                  <td>
                    <div
                      className="grid-thumbnail text-border border border-divider  rounded flex justify-center"
                      style={{ width: '4.5rem', height: '4.5rem' }}
                    >
                      {p.image && (
                        <Image
                          className="object-cover"
                          alt="Product image"
                          src={p.image}
                          width={120}
                          height={120}
                          // objectFit="fill"
                        />
                      )}
                      {!p.image && (
                        <svg
                          className="self-center"
                          xmlns="http://www.w3.org/2000/svg"
                          width="2rem"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </div>
                  </td>
                  <td>
                    <a
                      href={p.editUrl || ''}
                      className="font-semibold hover:underline text-sm"
                    >
                      {p.name}
                    </a>
                  </td>
                  <td className="text-sm">{p.price}</td>
                  <td className="text-sm">{p.quantity} sold</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card.Session>
    </Card>
  )
}
