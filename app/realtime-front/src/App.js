'use strict'
import React, { Suspense, useState } from 'react'
import { Loader } from './styles/loader'
import { hot } from 'react-hot-loader'
import './App.css'
const Graph = React.lazy(() => import('./components/Graph'))


const App = () => {
return (
<Suspense fallback={<Loader />}>
  <Graph/>
  </Suspense>
)
}
export default hot(module)(App)
