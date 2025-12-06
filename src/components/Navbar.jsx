const Navbar = () => {
  return (
    <div className=''>
        {/* logo */}
        <div className="">
            <img src="./logo.png" className="w-8 h-8" alt="" />
            <span>ziyanlog</span>
        </div>
        {/* mobile menu */}
        <div className="md:hidden">M</div>
        {/* desktop menu */}
        <div className="hidden md:flex">D</div>
    </div>
  )
}
export default Navbar
