import Movies from "@/components/Movies";
import NewRealeses from "@/components/NewRealeses";
import Series from "@/components/Series";

function Home() {
  return (
    <>
      <div className="home-container">
        <NewRealeses />
        <Movies />
        <Series />
      </div>
    </>
  );
}

export default Home;
