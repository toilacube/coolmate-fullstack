import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ROOT}`,
  headers: {
    Authorization: `Bearer ${
      typeof window !== 'undefined' && localStorage.getItem('token')
        ? localStorage.getItem('token')
        : ''
    }`
  }
})
