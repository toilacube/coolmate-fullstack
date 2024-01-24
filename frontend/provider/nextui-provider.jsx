'use client'
import { NextUIProvider } from '@nextui-org/system'

const NextProvider = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>
}
export default NextProvider
