import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Main } from '../../../../constant';
import { Input } from '../../../../components/input/input';
// import Auth from './components/auth';
import PageContainer from '../../../../components/Container/pageContainer';
import { Box, Card, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import Logo from '../../../../components/Logo/Logo';
import Auth from './components/auth';

const TechRegistration = props => {
  const theme = useTheme();
    const style = theme.palette.Main.login;
    const [data , setData] = useState(Main().TechRegistration);
    return (
       <>
       <PageContainer  title={data.title} description={data.description}>
            <Box  sx={style.mainbox}>
                <Grid container spacing={0} justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', padding:'20px 0px' }}>
           
                <Grid item
                    xs={12}
                    sm={12}
                    lg={10}
                    xl={10}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection= "column"
                >
                    <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '100%' }}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        {/* <Logo /> */}
                    </Box>
                        <Auth />
                    </Card>
                    </Grid>
                </Grid>
            </Box>
       </PageContainer>
       </>
    );
}

// Registration.propTypes = {}

export default TechRegistration