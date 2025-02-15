import { useMovie } from '@/hooks/useMovie'
import './CSS/Movies.css'

export default function Movies(){
   const {data: movies } = useMovie();
   const navigate = () =>{
    console.log("Hello")
   }
    return(
        <div  className="movie-section">
            <h2>Movies</h2>
            <span onClick={()=>navigate()}>See more</span>
            <div className="scroll-container" >

            <div className="movie-grid">

            { movies && movies.filter(m => !m.isSerie).map((movie) =>
                     <div className="movie-box"  key={movie._id} > 
                        <img src={movie.poster_url} />
                        <div>
                            <h3>{movie.title}</h3>
                            <span>{movie.description}</span>
                            <ul>
                                    {movie.genres.map((g)=>(
                                        <li key={g._id}>{g.name}</li>
                                    ))}
                            </ul> 
                        </div>

                   </div>
           )}
           </div>
                 </div> 
            
        </div>
    )
}