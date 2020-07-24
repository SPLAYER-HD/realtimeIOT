'use strict'
import React, { Suspense } from 'react'
import { Loader } from './styles/loader'
import { hot } from 'react-hot-loader'
import { GlobalStyle } from './styles/GlobalStyles'
import './App.css'
const Home = React.lazy(() => import('./pages/Home'))

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <GlobalStyle />
      <Home />
    </Suspense>
  )
}
export default hot(module)(App)
