import { useState, useEffect } from 'react'

export function useFridgesData () {
  const [fridges, setFridges] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    window.fetch('http://localhost:4001/api/fridges')
      .then(res => res.json())
      .then(response => {
        setFridges(response)
        setLoading(false)
      })
  }, [])

  return { fridges, loading }
}
