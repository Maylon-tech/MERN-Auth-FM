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
    <main className='relative w-full h-240 flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <img src={Image} alt="auth image" className='hidden opacity-90 ml-70 mt-40 xl:block' />
      </div>

      <div className='relative z-10 bg-[#0e0e0fe3] w-11/12 mx-auto border border-[#292929a1] rounded-2xl px-12 py-10 xl:w-115'>
        <div className='text-center'>
          <SiInfracost className='inline text-2xl' /> 
          <h2 className='text-2xl extralight mt-4 tracking-wider'>COSMO</h2>
          <p className='mt-1 text-zinc-400 font-semibold tracking-widest text-[13px]'>AUTHENTICATION PORTAL</p>
        </div>

        <div className='mt-7 relative border-b border-[#292929a1] flex'>
          <span className={`absolute bottom-0 h-[2px] bg-white transition-all duration-600 ease-in-out 
            ${isLogin ? "left-0 w-1/2" : "left-1/2 w-1/2"}`} />
            <button
              className={`w-1/2 py-3 tracking-wider text-[13px] xl:text-[16px]
                ${isLogin ? "text-white" : "text-zinc-400"}`}
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
              className={`w-1/2 py-3 tracking-wider text-[13px] xl:text-[16px]
                ${isLogin ? "text-white" : "text-zinc-400"}`}
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

        <form onSubmit={handleSubmit} className='mt-2'>
          <p className='text-[#ff6767] text-[14px] h-10 flex justify-center items-center tracking-wider'>{error}</p>

          {
            !isLogin && (
              <div className='flex flex-col mb-2'>
                <label className='text-[13px] text-zinc-400 font-semibold' htmlFor="">FULL NAME</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='John Doe'
                  className={`input ${
                    error ? "border-[#ff6767]! focus:shadow-[0_0_10px_#ff6767]" : ""
                  }`}
                />
              </div>
            )
          }

          <div className='flex flex-col mb-2'>
            <label className='text-[13px] text-zinc-400 font-semibold' htmlFor="">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='john@doe.com'
              className={`input ${
                error ? "border-[#ff6767]! focus:shadow-[0_0_10px_#ff6767]" : ""
              }`}
            />
          </div>

          <div className='flex flex-col mb-3'>
            <label className='text-[13px] text-zinc-400 font-semibold' htmlFor="">PASSWORD</label>
            <div className='relative flex items-center'>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='********'
                className={`w-full input pr-16 ${
                  error ? "border-[#ff6767]! focus:shadow-[0_0_10px_#ff6767]" : ""
              }`}
              />  

              <span
                className='absolute right-4 text-xs font-bold text-zinc-500 hover:text-[#ffe600d3] cursor-pointer select-none'
                onClick={() => setShowPassword(!showPassword)}>
                { showPassword ? "HIDE" : "SHOW" } 
              </span>
            </div>
          </div>

          {
            isLogin && (
              <div className='flex items-center justify-between mt-4 mb-4'>
                <span>
                  <input type="checkbox" id='checkbox' />
                  <label htmlFor="checkbox" className='text-zinc-400 cursor-pointer'>Remember me</label>
                </span>
                <span className='text-zinc-400 cursor-pointer'>
                  Forget Password?
                </span>
              </div>
            )
          }

          <button
            type="submit"
            disabled={loading}
            className='bg-[#ffe600] flex items-center justify-center text-black w-full py-4 mt-4 rounded-[7px] font-semibold tracking-wider'
          >
            {
              loading ? (
                <div className='loader w-5 xl:w-6'></div>
                
              ) : (
                  isLogin ? (
                    "LAUNCH SIGN IN"
                  ) : (
                      "CREATE ACCOUNT"
                  )
              )
            }
          </button>

          <div className='flex items-center justify-between mt-8'>
            <span className='border-b w-full border-[#292929a1]'></span>
            <span className='w-160 flex justify-center px-3 text-zinc-400 text-[13px] tracking-widest'>
              {isLogin ? "OR CONTINUE WITH" : "OR SIGN UP WITH"}
            </span>
            <span className='border-b w-full border-[#292929a1]'></span>
          </div>

          <div className='flex gap-4 mt-8'>
            <span className='social'> <FcGoogle /> Google</span>
            <span className='social'> <FaApple />  Apple </span>
          </div>

          <span className='inline-block border-b w-full border-[#292929a1] mt-8'></span>

          <div className='flex justify-center gap-1 mt-4'>
            <span className='text-zinc-400'>{isLogin ? "Don't have a account?" : "Already have an account"}</span>
            <span
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
                setEmail("")
                setPassword("")
                setUsername("")
              }}
              className='cursor-pointer hover:text-white'
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
