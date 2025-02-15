import { useMovie } from '@/hooks/useMovie'
import './CSS/NewRealses.css'

export default function NewRealeses(){
   const {data: movies } = useMovie();
    return(
        <div  className="movie-section">
            <h2>New Realsese</h2>
            <div className="scroll-container" >

            <div className="movie-grid">

            { movies && movies.map((movie) =>
                     <div className="movie-box"  key={movie._id} > 
                        <img src={movie.poster_url} />
                        <div>
                            <h3>{movie.title}</h3>
                            <span>{movie.description}</span>
                            <ul>
                                    {movie.genre.map((g)=>(
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