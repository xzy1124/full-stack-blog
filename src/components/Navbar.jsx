import { useState } from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'
const Navbar = () => {
    const [open, setOpen] = useState(false)
  return (
      <div className='w-full h-16 md:h-20 flex items-center justify-between'>
        {/* logo */}
        <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
            <Image src="logo.png" alt="Ziyan logo" className="w-8 h-8" w={32} h={32} />
            <span>ziyanlog</span>
        </Link>
        {/* mobile menu */}
        <div className="md:hidden">
            <div className='cursor-pointer text-xl' onClick={() => setOpen(!open)}>
                  {open ? "X" : "☰"}
            </div>
            {/* mobile menu items */}
            <div className={`w-full h-screen flex flex-col items-center gap-8 font-medium text-xl justify-center absolute top-16
             transition-all ease-in-out ${open ? "-right-0" : "-right-[100%]"}`}>
                <Link to="/">Home</Link>
                <Link to="/">Trending</Link>
                <Link to="/">Most Popular</Link>
                <Link to="/">About</Link>
                <Link to="">
                    <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 👏</button>
                </Link>
            </div>
        </div>
        {/* desktop menu */}
        <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
            <Link to="/">Home</Link>
            <Link to="/">Trending</Link>
            <Link to="/">Most Popular</Link>
            <Link to="/">About</Link>
            <Link to="">
                <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 👏</button>
            </Link>
        </div>
    </div>
  )
}
export default Navbar
