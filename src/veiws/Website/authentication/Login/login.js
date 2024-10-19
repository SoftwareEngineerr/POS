import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Main } from '../../../../constant';
import { Input } from '../../../../components/input/input';
import Auth from './components/auth';
import PageContainer from '../../../../components/Container/pageContainer';
import { Box, Card, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import Logo from '../../../../components/Logo/Logo';

const Login = (props) => {
    const theme = useTheme();
    const style = theme.palette.Main.login;
    return (
       <>
       <PageContainer  title="Login" description="this is Dashboard">
            <Box  sx={style.mainbox}>
                <Grid container spacing={0} justifyContent="center" sx={{ minHeight: '100vh' }}>
           
                <Grid item
                    xs={12}
                    sm={12}
                    lg={4}
                    xl={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', width: '700px' }}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Logo />
                    </Box>
                        <Auth />
                    </Card>
                    </Grid>
                </Grid>
            </Box>
       </PageContainer>
       </>
    );
};

Login.propTypes = {};

export default Login;
