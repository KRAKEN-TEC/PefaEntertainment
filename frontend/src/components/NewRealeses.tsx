import { useMovie } from '@/hooks/useMovie'
import './CSS/NewRealses.css'

export default function NewRealeses(){
   const {data: newRealses } = useMovie();
    return(
        <div  className="NR-movie-section">
            <h2>New Realsese</h2>
            <div className="NR-scroll-container" >

            <div className="NR-movie-grid">

            { newRealses && newRealses.map((newRealse) =>
                     <div className="NR-movie-box"  key={newRealse._id} > 
                        <img src={newRealse.poster_url} />
                        <div>
                            <h3>{newRealse.title}</h3>
                            <span>{newRealse.description}</span>
                            <ul>
                                    {newRealse.genres.map((genre)=>(
                                        <li key={genre._id}>{genre.name}</li>
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