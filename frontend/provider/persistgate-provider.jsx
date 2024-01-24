'use client'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '../redux/store'
export const PersistGateProvider = ({ children }) => {
  return <PersistGate persistor={persistor}>{children}</PersistGate>
}
