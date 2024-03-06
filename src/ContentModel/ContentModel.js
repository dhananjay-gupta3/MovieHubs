import * as React from 'react';
import {Backdrop} from '@material-ui/core'
import {Button} from '@material-ui/core'
import {YouTube} from '@material-ui/icons'
import {Modal} from '@material-ui/core'
import {Fade} from '@material-ui/core'
import './ContentModa]el.css'
import {makeStyles} from '@material-ui/core'
import {useState,useEffect} from 'react'
import axios from 'axios';
import {Box} from '@material-ui/core'
import Carousal from './Carousal';

const posterUrl = "https://image.tmdb.org/t/p/w500"





export default function ContentModal({children,media_type,id}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video,setVideo] =useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=10add817467430aa16981cbafe2515d5&language=en-US`
    );

    setContent(data);
     
  };


  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=10add817467430aa16981cbafe2515d5&language=en-US`
    );

    console.log(data);
    setVideo(data.results[0]?.key);
  };


  useEffect(() => {
    fetchData();
    fetchVideo()
    // eslint-disable-next-line
  }, []);


  return (
    <div className='bg'>
    <div
    onClick={handleOpen}
      className='media'
      style={{ cursor: "pointer" }}
        color="inherit"
    >{children}</div>
     
    
      <Modal 
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <div className="modal-size">
        <Fade in={open}>
        <Box >
      
        {
            content && (
                <div >
                <div className="ContentModal">
                <img
                src={
                  content.poster_path
                    ? `${posterUrl}/${content.poster_path}`
                    : ''
                }
                alt={content.name || content.title}
                className="ContentModal__portrait"
              />
                 
                
              <img
                  src={
                    content.backdrop_path
                      ? `${posterUrl}/${content.backdrop_path}`
                      : ''
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
        
                <div className="ContentModal__about">
                <span className="ContentModal__title">
                {
                    content.name || content.title
                }
                (
                    {(
                        content.first_air_date ||
                        content.release_date ||
                        '______'
                    ).substring(0,4)}
                )
                </span>
                {
                  content.tagline && (
                      <i >{content.tagline}</i>
                  )   
                }
                <span className="ContentModal__description">
                {content.overview}
                </span>
                <div>
                <div>
                <Carousal media_type={media_type} id={id} />
                </div>
                <Button
                variant='contained'
                style={{width:'100%'}}
                startIcon={<YouTube/>}
                color='secondary'
                target='_blank'
                href={`https://www.youtube.com/watch?v=${video}`}
                >
                Watch the Trailer
                </Button>
                </div>
                </div>
                </div>
        
                </div>
            )
        }
          
      </Box>
       
        </Fade>
        </div>
      </Modal>
    </div>
  );
}


