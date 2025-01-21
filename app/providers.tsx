'use client'

import { NextUIProvider } from '@nextui-org/react'
import { UserConfigProvider } from './context/UserConfigContext'
import { ImagesS3UrlProvider } from './context/ImagesContext'
import { AuthProvider } from './context/AuthContext'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <NextUIProvider>
        <UserConfigProvider>
          <ImagesS3UrlProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ImagesS3UrlProvider>
        </UserConfigProvider>
      </NextUIProvider>
  )
}