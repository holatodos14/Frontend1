/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'wouter'
import { getMyInformation } from '../services/api'
import Loading from '../components/Loading'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const [, setLocation] = useLocation()
  const authToken = localStorage.getItem('authToken')
  const { setUserData } = useContext(AuthContext)
  const { data, isError, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getMyInformation(authToken),
    retry: 1,
    enabled: Boolean(authToken),
  })

  useEffect(() => {
    if (data && !isError && !isLoading) {
      setUserData(data)
    }
  }, [data, isError, setUserData, isLoading])

  useEffect(() => {
    if (!authToken || (isError && !data)) {
      localStorage.removeItem('authToken')
      setLocation('/')
    }
  }, [authToken, isError, data, setLocation])

  if (isLoading) {
    return <Loading />
  }

  return children
}

export default ProtectedRoute
