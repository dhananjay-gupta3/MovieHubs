import React,{useState,useEffect} from 'react'
import axios from 'axios';

import CustomPagination from '../Pagination/CustomPagination';
import SingleContent from '../SingleContent/SingleContent';
import Genres from '../ContentModel/Genres';
import useGenre from '../ContentModel/useGenre';
const posterUrl = "https://image.tmdb.org/t/p/w500"
const Series = () => {

  const [genres, setGenres] = useState([]);
  const [page,setPage] = useState(1);
  const [content,setContent] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [numOfPages,setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);


  const featchTvShows = async () => {
    const {data} =  await axios.get(`
    https://api.themoviedb.org/3/discover/tv?api_key=10add817467430aa16981cbafe2515d5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
   
    console.log(data.results)
    setContent(data.results)
    setNumOfPages(data.total_pages)
    
    
  };

  useEffect(() =>{
    window.scroll(0, 0);
    featchTvShows();
  },[genreforURL,page])
  return (
    <div>
    <span className='pageTitle' >Series</span>
    <div>
    <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
    <div className='trending'>
    {
      content && content.map((c)=>
      
      <SingleContent key={c.id} 
      id={c.id}
      poster={posterUrl + c.poster_path}
      title={c.title || c.name}
      data={c.first_air_date || c.release_date}
      media_type='tv'
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

export default Series

