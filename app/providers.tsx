'use client'

import { NextUIProvider } from '@nextui-org/react'
import { UserConfigProvider } from './context/UserConfigContext'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <NextUIProvider>
        <UserConfigProvider>
            {children}
        </UserConfigProvider>
      </NextUIProvider>
  )
}