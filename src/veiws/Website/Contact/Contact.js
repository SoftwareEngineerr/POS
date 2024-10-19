import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@emotion/react';
import { Box, Card, Grid } from '@mui/material';
import PageContainer from '../../../components/Container/pageContainer';
import Logo from '../../../components/Logo/Logo';
import { CustomBtn } from '../../../components/button/button';
import { UserInterFace } from '../../../constant/Website';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

const Contact = (props) => {
    const [ data , setData ] = useState(UserInterFace.Contact);
    const theme = useTheme();
    const style = theme.palette.Main.contact;
    console.log('this page is loading');
  return (
    <PageContainer  title="Home" description="Home Page">
     <Box  sx={style.mainbox}>
            <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        
            <Grid item
                xs={12}
                sm={12}
                lg={7}
                xl={7}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%' }}>
                <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
                    <Logo />
                </Box>
                <Box>
                    <Grid className='allBranches' container>
                        {
                            data.menuitems.map((item, ind)=>
                                <Grid item lg={12} key={ind}>
                                    <Link className='Profileitem' to={`${item.Branch}`}>
                                        <Box sx={{background: theme.palette.primary.light , ...style.menuitems}}>
                                            <Box className='spanOne' component="span">
                                                <Box component="img" sx={style.image} src={item.logo} />
                                            </Box>
                                            <Box className='spanTwo' component="span">
                                                {item.name}
                                            </Box>
                                        <ArrowForwardIosIcon sx={style.icon} />
                                        </Box>
                                    </Link>
                                </Grid>
                            )
                        }
                    </Grid>
                </Box>
                </Card>
                </Grid>
            </Grid>
        </Box>
    </PageContainer>
  )
}

Contact.propTypes = {}

export default Contact