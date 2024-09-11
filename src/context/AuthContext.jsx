import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, useState } from "react"
import { useLocation } from "wouter"
import { getMyInformation, login } from "../services/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [, setLocation] = useLocation()
  const [user, setUser] = useState(null)
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error) => alert(error.response?.data?.message || "Login failed"),
    onSuccess: (data) => {
      if (data && data.token) {
        localStorage.setItem("tokenLogin", data.token)
        queryClient.invalidateQueries('user')
        setLocation('/redirect')  // You might want to adjust this based on your app's flow
      } else {
        console.error("Login response doesn't contain expected data:", data)
        alert("Login successful, but received unexpected data. Please try again.")
      }
    },
  })

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getMyInformation,
    enabled: Boolean(localStorage.getItem("tokenLogin")),
    retry: false,
    onSuccess: (data) => {
      setUser(data)
      setLocation(data.role === 'admin' ? '/admin/dashboard' : '/dashboard')
    },
    onError: (error) => {
      if (error.message === 'No authentication token found') {
        // Silent fail if no token is found
        return
      }
      console.error('Error fetching user data:', error)
      // Handle error (e.g., redirect to login page)
      localStorage.removeItem("tokenLogin")
      setLocation('/login')
    },
  })

  function logout() {
    localStorage.removeItem("tokenLogin")
    setUser(null)
    queryClient.removeQueries('user')
    setLocation('/')
  }

  return (
    <AuthContext.Provider
      value={{
        logout,
        login: loginMutation.mutate,
        loginMutation,
        user,
        isLoading,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}