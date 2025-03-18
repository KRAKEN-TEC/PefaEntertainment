import Movies from "@/components/Movie/Movie";
import NewRealeses from "@/components/NewRealeses";
import Series from "@/components/Series/Series";
import "./CSS/Home.css";

function Home() {
  return (
    <>
      <div>
        <NewRealeses />
        <Movies />
        <Series />
      </div>
    </>
  );
}

export default Home;
