import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
import { TMDB_Access_Key } from '../../config'
 
const Player = (props) => {
  const state = props.location;
  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWE1ZjBiYzMwYmMxN2YzMjI4ZjllNWE5NDllYzBkNSIsIm5iZiI6MTc0Mzg1NDExMi44ODgsInN1YiI6IjY3ZjExYTIwZjVhODBhYTU0NTk5OTQ5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tIKoEyy9oT7eV2V0Bw8h8-D7NAh5H0FW3tdS4iHYiCM'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
    console.log(props);
  },[])
  
  

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{state}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
