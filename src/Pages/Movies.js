import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import CustomPagination from '../Pagination/CustomPagination';
import SingleContent from '../SingleContent/SingleContent';
import Genres from '../ContentModel/Genres';
import useGenre from '../ContentModel/useGenre';

const posterUrl = "https://image.tmdb.org/t/p/w500"
const Movies = () => {

  const [page,setPage] =useState(1);
  const [content,setContent] = useState([]);
  const [numOfPages,setNumOfPages] = useState();
  const [selectedGenres,setSelectedGenres] =useState([]);
  const [genres,setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);
  
  

  const featchMovies = async () =>{
    const {data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=10add817467430aa16981cbafe2515d5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`)
    
   setContent(data.results)
   setNumOfPages(data.total_pages)
 
  };

useEffect(() =>{
  window.scroll(0,0)
  featchMovies();
},[genreforURL,page])

  return (
    <div>
    <span className='pageTitle' >Movies</span>
    <Genres
    type="movie"
    selectedGenres={selectedGenres}
    setSelectedGenres={setSelectedGenres}
    genres={genres}
    setGenres={setGenres}
    setPage={setPage}
  />
    <div>
    <div className='trending'>
    {
      content && content.map((c)=>
      
      <SingleContent key={c.id} 
      id={c.id}
      poster={posterUrl + c.poster_path}
      title={c.title || c.name}
      data={c.first_air_date || c.release_date}
      media_type='movie'
      vote_average={c.vote_average}
      />
  )}
    
    </div>
    <div>
    {
      numOfPages > 1 && (
        <CustomPagination setPage={setPage}
        numOfPage={numOfPages}
        />

      )
    }
   
    </div>
    </div>
    </div>
  )
}

export default Movies