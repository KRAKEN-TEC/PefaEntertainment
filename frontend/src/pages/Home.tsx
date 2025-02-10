
import NavBar from '@/components/NavBar'
import { useUser } from '@/hooks/useUser'

function Home() {
  
  return (
    <>
      <NavBar onSearch={(search) => console.log(search)} />
      <div>Home</div>
    </>
  )
}

export default Home