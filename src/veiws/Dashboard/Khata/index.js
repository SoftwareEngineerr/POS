import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Input, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';
import CustomTable from './components/table';
import { Search, SearchOff } from '@mui/icons-material';

const Khata = props => {
  const theme = useTheme();
  const style = theme.palette.Main.Inventory;
  const [inputValue , setInputValue ] = useState();
  const [sendingdata , setSendingdata ] = useState();

  const myfunc = (e) => {
    e.preventDefault();
    console.log(inputValue)
    setSendingdata(inputValue)
  }

  return (
    <div id="Khata">
        <Box>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box sx={style.lable}>
                <Box sx={style.lable.child}>
                  <Typography 
                    variant='p'
                    fontWeight={1000}
                  >
                    Type here for More
                  </Typography>
                  <form onSubmit={myfunc}>
                    <Box sx={style.lable.searchBox}>
                      <Search sx={style.lable.icon} />
                      <Input
                      sx={style.lable.input}
                      type='text'
                      placeholder='Find Your Product Here'
                      onChange={(e)=>setInputValue(e.target.value)}
                      />
                    </Box>
                  </form>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={12}>
            <box sx={{width:'100px' , height: '100px'}}></box>
              {/* <Table /> */}
            </Grid>
            <Grid item lg={12}>
              <br />
              <CustomTable data={sendingdata} />
            </Grid>
          </Grid>
        </Box>
    </div>
  )
}

Khata.propTypes = {}

export default Khata