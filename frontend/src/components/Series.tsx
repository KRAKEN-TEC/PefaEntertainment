import { FetchMovie, useMovie } from '@/hooks/useMovie'
import './CSS/Series.css'
import { useNavigate } from 'react-router';
import useNavDetail from '@/hooks/useNavDetail';

export default function Series(){
   const {data: series } = useMovie();
   const {callNav} = useNavDetail();

   const nav = useNavigate()   


   const getRandomSeries = (series: FetchMovie[], count = 3) =>{
        
        return series.filter((s)=> s.isSerie)
        .sort(() => Math.random() - 0.5)
        .slice(0,count)
   };

   const randomSeries = getRandomSeries(series);

    return(
        <div  className="series-section">
            <h2>Series</h2>
            <span onClick={()=>nav("series-page")}>See more</span>
            <div className="series-scroll-container" >

            <div className="series-grid">

            { series && randomSeries.map((s) =>
                     <div className="series-box"  key={s._id} onClick={()=>callNav(s._id)}> 
                        <img src={s.poster_url} />
                        <div>
                          <div className="series-text">
                            <h3>{s.title}</h3>
                            <span>{s.description}</span>
                            <ul>
                              {s.genres.map((g) => (
                                <li key={g._id}>{g.name}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                    </div>
           )}
           </div>
        </div> 
)}
