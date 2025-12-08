import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
const MainLayout = () => {
    return (
        <div className='px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64'>
            <Navbar />
            {/* 这个代表路由出口，会渲染匹配到的路由组件 */}
            <Outlet />
        </div>
    )
}
export default MainLayout