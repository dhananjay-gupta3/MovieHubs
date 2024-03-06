
import React from 'react'
import { useState } from 'react'
import {TextField,Tabs,Tab} from '@material-ui/core'
import {Button} from '@material-ui/core'
import {Search} from '@material-ui/icons'
import axios from 'axios'
import { useEffect } from 'react'
import SingleContent from '../SingleContent/SingleContent'
import CustomPagination from '../Pagination/CustomPagination'


const posterUrl = "https://image.tmdb.org/t/p/w500"
const unavailable =
"https://www.movienewz.com/img/films/poster-holder.jpg"
const Searchs = () => {
  const [type,setType] = useState(0);
  const [page,setPage] = useState(1);
  const [searchText,setSerachText] =useState("");
  const [numOfPages,setNumOfPages] = useState();
  const [content,setContent] = useState([])


  const fetchSearch = async () =>{
    try{
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=10add817467430aa16981cbafe2515d5&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    console.log(data)
    setNumOfPages(data.results)
    }catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    window.scroll(0,0);
    fetchSearch();
  },[type,page]);



  return (
    <div>
    
   
    <div style={{display:'flex', margin: '15px 0'}}>
    
    <TextField
    style={{flex:1}}
    className='searchBox'
    label='search'
    varient='filled'
    onChange={(e)=> setSerachText(e.target.value)}
    />
    <Button 
    onClick={fetchSearch}
    variant="contained"
    style={{ marginLeft: 10 }}
    >
    <Search/>
    </Button>
    </div>
    <Tabs
     value={type}
      indicatorColor='primary'
      textColor='primary'
      onChange={(e,newValue)=>{
        setType(newValue);
        setPage(1)
      }}
      style={{ paddingBottom: 5 }}
      aria-label="disabled tabs example"
      >

    <Tab style={{width:'50%'}} label='Search Movies'/>
    
    <Tab style={{width:'50%'}} label='Search TV Series'/>
    
    </Tabs>
    <div className="trending">
    {content &&
      content.map((c) => (
        <SingleContent
          key={c.id}
 
          id={c.id}
          poster={c.poster_path ? `${posterUrl}/${c.poster_path}` : unavailable}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type={type ? "tv" : "movie"}
          vote_average={c.vote_average}
        />
      ))}
    {searchText &&
      !content &&
      (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
  </div>
   
    <div>
    {numOfPages > 1 && (
      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
    )}
    </div>
    </div>
  )
}

export default Searchs