import React from 'react'
import {} from '@material-ui/core/TablePagination'
import {Pagination} from '@material-ui/lab'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const darkTheme = createMuiTheme({
  palette:{
    type:'dark',
  },
});
const CustomPagination = ({setPage,numOfPage = 10}) => {

  const handlePageChange = (page) =>{
    setPage(page);
    window.scroll(0,0);
  };
  return (
    <div 
    style={{
      width:"100%",
      display: "flex",
      justifyContent:"center",
      marginTop:10,
    }}
    >
    <ThemeProvider theme={darkTheme}>
   <Pagination 
   count={numOfPage}
    onChange={(e)=>handlePageChange(e.target.textContent)}
    hideNextButton
    hidePrevButton
    color='primary'
    />
    
   </ThemeProvider>
    
    </div>
  )
}

export default CustomPagination