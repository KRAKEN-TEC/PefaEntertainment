import Movies from "@/components/Movie/Movie";
import NewRealeses from "@/components/NewRealeses";
import Series from "@/components/Series/Series";

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
