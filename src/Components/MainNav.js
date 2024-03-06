import React ,{useEffect, useState} from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import {  Movie, Search, Tv, Whatshot } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom'
import {} from 'react-router-dom'


export default function MainNa()  {
    
    const [value, setValue] = useState(0);
    const navigation = useNavigate();


    useEffect(()=>{
        if (value === 0) navigation('/')
        else if (value === 1) navigation('/movies');
        else if (value === 2) navigation('/series');
        else if (value === 3) navigation('/search');
    },[value,navigation])

   
    
  return (
    <div>
    
    <BottomNavigation
    style={{backgroundColor:'darkcyan' , position: "fixed",bottom:0,width:'100%',}}
    showLabels
    value={value}
    onChange={(e,newValue)=>{
        setValue(newValue)
    }}

    
    
    >
    <BottomNavigationAction
    style={{color:"#fff"}}
     label="Trending"
      icon={<Whatshot/>} />

    <BottomNavigationAction
    style={{color:"#fff"}}
     label="Movies" 
     icon={<Movie/>} />

    <BottomNavigationAction
    style={{color:"#fff"}}
     label="TV Series"
      icon={<Tv/>}
       />

       <BottomNavigationAction
    style={{color:"#fff"}}
     label="Search"
      icon={<Search/>}
       />
    
    </BottomNavigation>
    
    
    
    </div>
  )
}
