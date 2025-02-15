import { useMovie } from '@/hooks/useMovie'
import './CSS/Series.css'

export default function Series(){
   const {data: series } = useMovie();

   const navigate = () =>{
    console.log("Hello")
   }

    return(
        <div  className="series-section">
            <h2>Series</h2>
            <span onClick={()=>navigate()}>See more</span>
            <div className="series-scroll-container" >

            <div className="series-grid">

            { series && series.filter(s => s.isSerie).slice(0,3).map((s) =>
                     <div className="series-box"  key={s._id} > 
                        <img src={s.poster_url} />
                        <div>
                            <h3>{s.title}</h3>
                            <span>{s.description}</span>
                            <ul>
                                    {s.genres.map((g)=>(
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