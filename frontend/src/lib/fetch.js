import { axiosClient } from './axiosClient'

export const getApi = async ({ endPoint }) => {
  return axiosClient.get(endPoint)
}

export const postApi = async ({ endPoint, data }) => {
  return axiosClient.post(endPoint, data)
}

export const deleteApi = async ({ endPoint }) => {
  return axiosClient.delete(endPoint)
}

export const putApi = async ({ endPoint, data }) => {
  return axiosClient.put(endPoint, data)
}
