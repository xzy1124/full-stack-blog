import { useState } from 'react'
import Image from './Image'
const Navbar = () => {
    const [open, setOpen] = useState(false)
  return (
      <div className='w-full h-16 md:h-20 flex items-center justify-between'>
        {/* logo */}
        <div className="flex items-center gap-4 text-2xl font-bold">
            <Image src="logo.png" alt="Ziyan logo" className="w-8 h-8" w={32} h={32} />
            <span>ziyanlog</span>
        </div>
        {/* mobile menu */}
        <div className="md:hidden">
            <div className='cursor-pointer text-xl' onClick={() => setOpen(!open)}>
                  {open ? "X" : "☰"}
            </div>
            {/* mobile menu items */}
            <div className={`w-full h-screen flex flex-col items-center gap-8 font-medium text-xl justify-center absolute top-16
             transition-all ease-in-out ${open ? "-right-0" : "-right-[100%]"}`}>
                <a href="/">Home</a>
                <a href="/">Trending</a>
                <a href="/">Most Popular</a>
                <a href="/">About</a>
                <a href="">
                    <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 👏</button>
                </a>
            </div>
        </div>
        {/* desktop menu */}
        <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
            <a href="/">Home</a>
            <a href="/">Trending</a>
            <a href="/">Most Popular</a>
            <a href="/">About</a>
            <a href="">
                <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 👏</button>
            </a>
        </div>
    </div>
  )
}
export default Navbar
