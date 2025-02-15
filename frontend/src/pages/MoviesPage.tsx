import { FetchMovie,useMovie } from '@/hooks/useMovie'
import './CSS/MoviesPage.css'

export default function MoviesPage(){
   const {data: movies } = useMovie();

   const navigate = () =>{
    console.log("Hello")
   }

  
    return(
        <div  className="MP-section">
            <h2>Movies</h2>
            <div className="MP-scroll-container" >

            <div className="MP-grid">

            { movies && movies.filter((m)=>!m.isSerie).map((movie) =>
                     <div className="MP-box"  key={movie._id} > 
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