import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { EventAvailableOutlined, LoyaltyOutlined, MonetizationOnOutlined, Person2Outlined } from '@mui/icons-material'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoader } from '../../../../redux/actions/loader'

const Details = props => {
    const theme = useTheme()
    const style = theme.palette.Components.dashboard;

    const [suggestions , setSuggestions] = useState();
    const dispatch = useDispatch();
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const url = useSelector((state) => state.Api);

    useEffect(() => {
        try {
          dispatch(ShowLoader('1'))
          console.log('try start here')
          axios.get(url.dashboardTotal, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
          })
          .then((res) => {
          console.log('200 msg')
            if (res.status === 200) {
              console.log(res.data);
              setSuggestions(res.data);
              dispatch(ShowLoader('0'))
            }
          })
          .catch((err) => {
            console.error(err); // Log the error response for debugging
          });
        } catch (err) {
          console.error(err);
        }
      }, []);
  return (
    <div>
        {
            suggestions && (
                <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box>
                        <Typography variant='h3'>
                            Welcome Admin !
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Box sx={style.box}>
                        <Box sx={style.box.underbox}>
                            <Grid container>
                                <Grid item lg={8} md={8} sm={8} xs={8}>
                                    <Typography variant='h5' mb={1}>
                                        Total Products
                                    </Typography>
                                    <Typography variant='h2'>
                                        {
                                            suggestions.inventoryRecords
                                        }
                                    </Typography>

                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <Box sx={style.icon}>
                                    <LoyaltyOutlined sx={style.icon.icon} /> 
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
        
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Box sx={{...style.box}}>
                        <Box sx={{...style.box.underbox , background:'#00bbff6e'}}>
                            <Grid container>
                                <Grid item lg={8} md={8} sm={8} xs={8}>
                                    <Typography variant='h5' mb={1}>
                                        {/* Total Products */}
                                        Product Available 
                                    </Typography>
                                    <Typography variant='h2'>
                                        {
                                            suggestions.AvailableProducts
                                        }
                                    </Typography>

                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <Box sx={style.icon}>
                                    <EventAvailableOutlined sx={style.icon.icon} /> 
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Box sx={{...style.box}}>
                        <Box sx={{...style.box.underbox , background:'#82ff6169'}}>

                            <Grid container>
                                <Grid item lg={8} md={8} sm={8} xs={8}>
                                    <Typography variant='h5' mb={1}>
                                        Khata
                                    </Typography>
                                    <Typography variant='h2'>
                                        {
                                            suggestions.khataRecords
                                        }
                                    </Typography>

                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <Box sx={style.icon}>
                                    <Person2Outlined sx={style.icon.icon} /> 
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Box sx={{...style.box}}>
                        <Box sx={{...style.box.underbox , background:'#ffc0cb70'}}>

                            <Grid container>
                                <Grid item lg={8} md={8} sm={8} xs={8}>
                                    <Typography variant='h5' mb={1}>
                                        Expense
                                    </Typography>
                                    <Typography variant='h2'>
                                        908234
                                    </Typography>

                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <Box sx={style.icon}>
                                    <MonetizationOnOutlined sx={style.icon.icon} /> 
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                </Grid>
            )
        }
    </div>
  )
}

Details.propTypes = {}

export default Details