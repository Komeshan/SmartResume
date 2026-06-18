import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'
import Logo from './Logo'
import { LogOut, User } from 'lucide-react'

const Navbar = () => {

    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutUser = () => {
        navigate('/')
        dispatch(logout())
    }

  return (
    <div className='border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-slate-800 transition-all'>
            <Link to={user ? '/app' : '/'} className='hover:opacity-90 transition-opacity'>
                <Logo className='h-7' />
            </Link>

            {user && (
                <div className='flex items-center gap-3.5'>
                    {/* User Initials chip */}
                    <div className='flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl max-sm:px-2 shadow-2xs'>
                        <div className='size-7 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm shadow-indigo-600/10 shrink-0'>
                            {user?.name ? user.name.charAt(0).toUpperCase() : <User className='size-3.5' />}
                        </div>
                        <span className='text-xs font-bold text-slate-700 max-sm:hidden'>
                            {user.name}
                        </span>
                    </div>

                    {/* Premium Logout Button */}
                    <button 
                        onClick={logoutUser} 
                        className='flex items-center gap-2 px-4.5 py-1.5 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 rounded-xl text-xs font-bold transition-all duration-200 shadow-xs cursor-pointer active:scale-95'
                    >
                        <LogOut className='size-3.5' />
                        <span className='max-sm:hidden'>Logout</span>
                    </button>
                </div>
            )}
        </nav>
    </div>
  )
}

export default Navbar