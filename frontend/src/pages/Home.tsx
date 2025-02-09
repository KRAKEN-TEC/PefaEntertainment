
import NavBar from '@/components/NavBar'

function Home() {
  return (
    <>
      <NavBar onSearch={(search) => console.log(search)} />
      <div>Home</div>
    </>
  )
}

export default Home