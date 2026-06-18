import { Lock, Mail, User2Icon } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import api from '../configs/api.js'
import toast from 'react-hot-toast'

const Login = () => {

    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get("state")
    const [state, setState] = React.useState(urlState || "login")

    React.useEffect(() => {
        document.title = 'Workspace Login | SMART Resume Builder'
    }, [])

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success()
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-50/50 px-4'>
      <form onSubmit={handleSubmit} className="w-full max-w-[400px] border border-slate-200/80 rounded-2xl p-8 bg-white shadow-xl shadow-slate-100/40">
          <div className="text-center mb-6">
              <h1 className="text-slate-800 text-2xl font-bold tracking-tight">{state === "login" ? "Welcome Back" : "Register Workspace"}</h1>
              <p className="text-slate-500 text-xs mt-1.5">{state === "login" ? "Access your professional CV architect tools." : "Establish your workspace profile to start fresh."}</p>
          </div>

          <div className="space-y-4">
              {state !== "login" && (
                  <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">Name</label>
                      <div className="flex items-center w-full bg-slate-50/50 border border-slate-200 rounded-xl h-11 px-4 gap-3 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                          <User2Icon size={16} className="text-slate-400" />
                          <input type="text" name="name" placeholder="Full name" className="flex-1 bg-transparent border-none outline-none ring-0 text-sm text-slate-700 placeholder-slate-400" value={formData.name} onChange={handleChange} required />
                      </div>
                  </div>
              )}
              <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">Email Address</label>
                  <div className="flex items-center w-full bg-slate-50/50 border border-slate-200 rounded-xl h-11 px-4 gap-3 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                      <Mail size={15} className="text-slate-400" />
                      <input type="email" name="email" placeholder="example@domain.com" className="flex-1 bg-transparent border-none outline-none ring-0 text-sm text-slate-700 placeholder-slate-400" value={formData.email} onChange={handleChange} required />
                  </div>
              </div>
              <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">Password</label>
                  <div className="flex items-center w-full bg-slate-50/50 border border-slate-200 rounded-xl h-11 px-4 gap-3 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                      <Lock size={15} className="text-slate-400" />
                      <input type="password" name="password" placeholder="••••••••" className="flex-1 bg-transparent border-none outline-none ring-0 text-sm text-slate-700 placeholder-slate-400" value={formData.password} onChange={handleChange} required />
                  </div>
              </div>
          </div>

          <div className="mt-4 text-right">
              <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors" type="reset">Forgot password?</button>
          </div>

          <button type="submit" className="mt-6 w-full h-11 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 font-semibold text-sm cursor-pointer shadow-sm shadow-indigo-150 transition-all duration-200 active:scale-[0.98]">
              {state === "login" ? "Sign In to Workspace" : "Generate Account"}
          </button>

          <div className="mt-6 text-center text-xs text-slate-500 border-t border-slate-100 pt-5">
              {state === "login" ? "New to SMART Resume?" : "Already registered?"}{" "}
              <button type="button" onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline ml-1 cursor-pointer">
                  {state === "login" ? "Create an account" : "Sign In"}
              </button>
          </div>
      </form>
    </div>
  )
}

export default Login