import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { userLogin } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../server/authRedux'
import { setCredentials } from '../redux/authSlice'

function Login() {
  // const userRef = useRef()
  // const errRef = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  // const [error, setError] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = await login({ username, password }).unwrap()
      dispatch(setCredentials({ ...userData, username }))
      setUsername('')
      setPassword('')
      // navigate to dashboard
      navigate('dashboard')
    } catch (err) {
      console.log(err, 'error logging in')
    }
  }
  return (
    <div className="bg-[#111827] flex justify-center w-full items-center h-screen flex-col">
      <h1 className="text-xl mb-4 font-semibold text-white">Login: Invoice App</h1>

      <div className=" flex justify-center  items-center w-full ">
        <form onSubmit={(e) => handleSubmit(e)} className="py-9 px-8 border border-[#1f2937] text-sm w-full max-w-sm text-white bg-[#18212f] rounded-lg flex flex-col gap-4">
          <div className="sc-IeChK hoOqPT">
            <label htmlFor="email" className="mb-4">
              Username
              <div className="mt-1">
                <input name="username" type="text" id="email" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" className="py-1 px-2 w-full rounded-md bg-[#18212f] border  border-[#4b5563]" required />
              </div>
            </label>
          </div>
          <div className="w-full">
            <label htmlFor="password" className="mb-4">
              Password
              <div className="mt-1">
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="py-1 px-2 w-full rounded-md bg-[#18212f] border  border-[#4b5563]" autoComplete="current-password" required />
              </div>
            </label>
          </div>
          <div><button type="submit" className="bg-[#4f46e5] mt-2 w-full py-2 rounded-md">Log in</button></div>
        </form>
      </div>
    </div>
  )
}

export default Login
