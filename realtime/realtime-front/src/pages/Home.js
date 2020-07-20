import React from 'react'
/*import { Quote } from '../components/Quote'
import { Ads } from '../components/Ads'
import { Layout } from '../components/Layout'
*/
import { Dashboard }  from '../components/Dashboard'
const HomePage = ({ categoryId }) => {
  /*
  <Layout title='Your insurance app' subtitle='Find the best option for your insurance'>
      <Quote />
      <Graph />

    </Layout>
     */
  return (
      <Dashboard />
  )
}

export default React.memo(HomePage, (prevProps, props) => {
  return prevProps.categoryId === props.categoryId
})
