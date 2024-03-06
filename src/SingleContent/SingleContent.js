import React from 'react'
import './SingleContent.css'
import {Badge} from '@material-ui/core'
import ContentModal from '../ContentModel/ContentModel'
const SingleContent = ({id,poster,title,date,media_type,vote_average}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
    <div className='media'>
    <Badge  badgeContent={vote_average}
    color={vote_average > 6 ? 'primary' : 'secondary'}
    />
    
     <img className='poster' src={poster} alt={title} />
    <b className='title'>{title}</b>
   <span className='subTitle'>{media_type === 'tv' ? 'TV Series' : 'Movie'} </span>
    <span className='subTitle'>Rating: {vote_average}</span>
    </div>
    </ContentModal>
  )
}

export default SingleContent