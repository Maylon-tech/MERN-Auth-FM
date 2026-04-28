import { createContext, useEffect, useState } from "react"
import API from "../services/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loaderUser = async () => {
      if (token) {
        try {
          const res = await API.get("/users/profile")
          setUser(res.data.data)
        } catch (error) {
          logOut()
        }
      }
      setLoading(false)
    }

    loaderUser()
  }, [token])

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password })
    
    const token = res.data.data.token
    const user = res.data.data.user
  
    localStorage.setItem("token", token)

    setToken(token)
    setUser(user)
  }

  const register = async (username, email, password) => {
    const res = await API.post("/auth/register", {
      username, 
      email, 
      password,
    })

    return res.data
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{
      user, 
      token,
      loading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
  
}