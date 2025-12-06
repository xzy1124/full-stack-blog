import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
const MainLayout = () => {
    return (
        <div>
            <Navbar />
            {/* 这个代表路由出口，会渲染匹配到的路由组件 */}
            <Outlet />
        </div>
    )
}
export default MainLayout