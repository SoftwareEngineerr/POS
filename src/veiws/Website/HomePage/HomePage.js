import React from 'react'
import PageContainer from '../../../components/Container/pageContainer'
import { Box, Card, Grid } from '@mui/material'
import Logo from '../../../components/Logo/Logo'
import { useTheme } from '@emotion/react'
import { CustomBtn } from '../../../components/button/button'

const HomePage = props => {
    const theme = useTheme();
    const style = theme.palette.Main.login;
  return (
    <PageContainer  title="Home" description="Home Page">
     <Box  sx={style.mainbox}>
            <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        
            <Grid item
                xs={12}
                sm={12}
                lg={4}
                xl={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%' }}>
                <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
                    <Logo />
                </Box>
                <CustomBtn link='/auth/login' data='Login' />
                </Card>
                </Grid>
            </Grid>
        </Box>
    </PageContainer>
  )
}

HomePage.propTypes = {}

export default HomePage