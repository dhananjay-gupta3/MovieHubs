import React,{useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { useState } from 'react';
import './Carousal.css'


const posterUrl = "https://image.tmdb.org/t/p/w300"
const unavailable =
"https://www.movienewz.com/img/films/poster-holder.jpg"
 

const handleDragStart = (e) => e.preventDefault();




const Carousal= ({media_type, id}) => {
    const [credits,setCredits] = useState([]);



    const items = credits.map((c) => (
        <div className="carouselItem">
          <img
            src={c.profile_path ? `${posterUrl}/${c.profile_path}` : unavailable}
            alt={c?.name}
            onDragStart={handleDragStart}
            className="carouselItem__img"
          />
          <b className="carouselItem__txt">{c?.name}</b>
        </div>
      ));

      const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      };

    
  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=10add817467430aa16981cbafe2515d5&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);



  return (
    <AliceCarousel mouseTracking items={items} 
    infinite
    disableDotsControls
    disableButtonsControls
    responsive={responsive}
    autoPlay
    />
  );
}
export default Carousal