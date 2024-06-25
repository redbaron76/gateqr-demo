/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ScannerImport } from './routes/scanner'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const ScannerRoute = ScannerImport.update({
  path: '/scanner',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/scanner': {
      id: '/scanner'
      path: '/scanner'
      fullPath: '/scanner'
      preLoaderRoute: typeof ScannerImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({ IndexRoute, ScannerRoute })

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/scanner"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/scanner": {
      "filePath": "scanner.tsx"
    }
  }
}
ROUTE_MANIFEST_END */