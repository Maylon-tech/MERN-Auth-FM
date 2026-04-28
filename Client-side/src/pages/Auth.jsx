import { useState, useContext } from 'react'
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom'

import { SiInfracost } from "react-icons/si"
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import Image from "../assets/hero.png"

const Auth = () => {
  const { login, register } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (isLogin) {
        await login(email, password)
      } else {
        await register(username, email, password)
      }

      navigate("/dashboard")
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div>
        <img src={Image} alt="auth image" />
      </div>

      <div>
        <div>
          <SiInfracost />
          <h2>COSMO</h2>
          <p>AUTHENTICATION PORTAL</p>
        </div>

        <div>
          <span />
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
                setEmail("")
                setPassword("")
                setUsername("")
              }}
            >
              SIGN IN
            </button>

            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
                setEmail("")
                setPassword("")
                setUsername("")
              }}
            >
              SIGN UP
            </button>          
        </div>

        <form onSubmit={handleSubmit}>
          <p>{error}</p>

          {
            !isLogin && (
              <div>
                <label htmlFor="">FULL NAME</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='John Doe'
                />
              </div>
            )
          }

          <div>
            <label htmlFor="">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='john@doe.com'
            />
          </div>

          <div>
            <label htmlFor="">PASSWORD</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='********'
              />  

              <span onClick={() => setShowPassword(!showPassword)}>
                { showPassword ? "HIDE" : "SHOW" } 
              </span>
            </div>
          </div>

          {
            isLogin && (
              <div>
                <span>
                  <input type="checkbox" id='checkbox' />
                  <label htmlFor="checkbox">Remember me</label>
                </span>
                <span>
                  Forget Password?
                </span>
              </div>
            )
          }

          <button type="submit" disabled={loading}>
            {
              loading ? (
                <div></div>
                
              ) : (
                  isLogin ? (
                    "LAUNCH SIGN IN"
                  ) : (
                      "CREATE ACCOUNT"
                  )
              )
            }
          </button>

          <div>
            <span></span>
            <span>
              {isLogin ? "OR CONTINUE WITH" : "OR SIGN UP WITH"}
            </span>
            <span></span>
          </div>

          <div>
            <span> <FcGoogle /> Google</span>
            <span> <FaApple />  Apple </span>
          </div>

          <span></span>

          <div>
            <span>{isLogin ? "Don't have a account?" : "Already have an account"}</span>
            <span
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
                setEmail("")
                setPassword("")
                setUsername("")
              }}
            >
              { isLogin ? "Sign Up" : "Sign In"}
            </span>
          </div>
        </form>
      </div>
    </main>
  )
}


export default Auth
