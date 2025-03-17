import { RootLayout } from '../componentes/templates'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </React.Fragment>
  )
}