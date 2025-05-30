/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SuccessImport } from './routes/success'
import { Route as SubmitImport } from './routes/submit'
import { Route as NotFoundImport } from './routes/not-found'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as StoryIdImport } from './routes/story.$id'

// Create/Update Routes

const SuccessRoute = SuccessImport.update({
  id: '/success',
  path: '/success',
  getParentRoute: () => rootRoute,
} as any)

const SubmitRoute = SubmitImport.update({
  id: '/submit',
  path: '/submit',
  getParentRoute: () => rootRoute,
} as any)

const NotFoundRoute = NotFoundImport.update({
  id: '/not-found',
  path: '/not-found',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const StoryIdRoute = StoryIdImport.update({
  id: '/story/$id',
  path: '/story/$id',
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
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/not-found': {
      id: '/not-found'
      path: '/not-found'
      fullPath: '/not-found'
      preLoaderRoute: typeof NotFoundImport
      parentRoute: typeof rootRoute
    }
    '/submit': {
      id: '/submit'
      path: '/submit'
      fullPath: '/submit'
      preLoaderRoute: typeof SubmitImport
      parentRoute: typeof rootRoute
    }
    '/success': {
      id: '/success'
      path: '/success'
      fullPath: '/success'
      preLoaderRoute: typeof SuccessImport
      parentRoute: typeof rootRoute
    }
    '/story/$id': {
      id: '/story/$id'
      path: '/story/$id'
      fullPath: '/story/$id'
      preLoaderRoute: typeof StoryIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/not-found': typeof NotFoundRoute
  '/submit': typeof SubmitRoute
  '/success': typeof SuccessRoute
  '/story/$id': typeof StoryIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/not-found': typeof NotFoundRoute
  '/submit': typeof SubmitRoute
  '/success': typeof SuccessRoute
  '/story/$id': typeof StoryIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/not-found': typeof NotFoundRoute
  '/submit': typeof SubmitRoute
  '/success': typeof SuccessRoute
  '/story/$id': typeof StoryIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/not-found'
    | '/submit'
    | '/success'
    | '/story/$id'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/not-found' | '/submit' | '/success' | '/story/$id'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/not-found'
    | '/submit'
    | '/success'
    | '/story/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  NotFoundRoute: typeof NotFoundRoute
  SubmitRoute: typeof SubmitRoute
  SuccessRoute: typeof SuccessRoute
  StoryIdRoute: typeof StoryIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  NotFoundRoute: NotFoundRoute,
  SubmitRoute: SubmitRoute,
  SuccessRoute: SuccessRoute,
  StoryIdRoute: StoryIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/not-found",
        "/submit",
        "/success",
        "/story/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/not-found": {
      "filePath": "not-found.tsx"
    },
    "/submit": {
      "filePath": "submit.tsx"
    },
    "/success": {
      "filePath": "success.tsx"
    },
    "/story/$id": {
      "filePath": "story.$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
