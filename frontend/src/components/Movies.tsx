import { FetchMovie,useMovie } from '@/hooks/useMovie'
import './CSS/Movies.css'
import { useNavigate } from 'react-router';
import useNavDetail from '@/hooks/useNavDetail';

export default function Movies(){
  const {data: movies } = useMovie();
  const {callNav} = useNavDetail();

  const nav = useNavigate()   

  const getRandomMovies = (movies: FetchMovie[], count = 3) =>{
    return movies
      .filter(m => !m.isSerie)
      .sort(() => Math.random() - 0.5)
      .slice(0,count)
  };

  const randomMovies = getRandomMovies(movies);

return(
  <div  className="movie-section">
    <h2>Movies</h2>
    <span onClick={()=>nav("movies-page")}>See more</span>
    <div className="scroll-container" >
      <div className="movie-grid">
        { movies && randomMovies.map((movie) =>
          <div className="movie-box"  key={movie._id} onClick={()=>callNav(movie._id)}> 
            <img src={movie.poster_url} />
            <div>
              <h3>{movie.title}</h3>
              <span>{movie.description}</span>
              <ul>
                {movie.genres.map((g)=>(<li key={g._id}>{g.name}</li>))}
              </ul> 
            </div>
          </div>
        )}
      </div>
    </div> 
  </div>
)
}