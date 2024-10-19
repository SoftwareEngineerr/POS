import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Input, Tab, Tabs, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';
import CustomTable from './components/table';
import { Search, SearchOff } from '@mui/icons-material';
import ProductHistory from './components/ProductHistory';
import AllProductHistory from './components/AllProductHistory';

const ProductAvailable = props => {
  const theme = useTheme();
  const style = theme.palette.Main.Inventory;
  const [inputValue , setInputValue ] = useState();
  const [sendingdata , setSendingdata ] = useState();

  const myfunc = (e) => {
    e.preventDefault();
    console.log(inputValue)
    setSendingdata(inputValue)
  }

  
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const [value, setValue] = React.useState(0);

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
};

  return (
    <div id="Inventory">

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Product Available" {...a11yProps(0)} />
          <Tab label="Product History" {...a11yProps(1)} />
          <Tab label="All Product History" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ProductHistory />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AllProductHistory />
      </CustomTabPanel>
    </Box>
        
    </div>
  )
}

ProductAvailable.propTypes = {}

export default ProductAvailable