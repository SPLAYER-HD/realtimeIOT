'use strict'
import React, { Suspense, useState } from 'react'
import { Loader } from './styles/loader'
import { hot } from 'react-hot-loader'
import './App.css'
const Home = React.lazy(() => import('./pages/Home'))

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  )
}
export default hot(module)(App)
