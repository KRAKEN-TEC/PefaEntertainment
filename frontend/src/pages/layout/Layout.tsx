import NavBar from '@/components/NavBar'
import { Outlet } from 'react-router'

export default function Layout()
{
    return (
        <div>
          <NavBar onSearch={(search) => console.log(search)} />
          <Outlet/>
        </div>
    )
}