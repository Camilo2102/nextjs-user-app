'use client'

import { NextUIProvider } from '@nextui-org/react'
import { UserConfigProvider } from './context/UserConfigContext'
import { ImagesS3UrlProvider } from './context/ImagesContext'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <NextUIProvider>
        <UserConfigProvider>
          <ImagesS3UrlProvider>
            {children}
          </ImagesS3UrlProvider>
        </UserConfigProvider>
      </NextUIProvider>
  )
}