import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SingleContent from '../SingleContent/SingleContent'
import CustomPagination from '../Pagination/CustomPagination'

const posterUrl = "https://image.tmdb.org/t/p/w500"
const Trending = () => {
  const [page,setPage] = useState(1);
  const [content,setContent] = useState([]);


  const featchTrending = async () => {
    const {data} =  await axios.get(`
    https://api.themoviedb.org/3/trending/all/week?api_key=10add817467430aa16981cbafe2515d5&page=${page}`);
    

    setContent(data.results)
    
    
  };

  useEffect(()=>{
    featchTrending()
    //eslint-disable-next-line
  },[page])
  return (
    <div>
    <span className='pageTitle' >Trending</span>
    <div className='trending'>
    {
      content && content.map((c)=>
      
      <SingleContent key={c.id} 
      id={c.id}
      poster={posterUrl + c.poster_path}
      title={c.title || c.name}
      data={c.first_air_date || c.release_date}
      media_type={c.media_type}
      vote_average={c.vote_average}
      />
  )}
    
    </div>
    <div>
    <CustomPagination setPage={setPage}/>
    </div>
    </div>
  )
}

export default Trending