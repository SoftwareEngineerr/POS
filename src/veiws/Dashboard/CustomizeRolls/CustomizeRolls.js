import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CustomSelect } from '../../../components/select/select'
import PageContainer from '../../../components/Container/pageContainer'
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import CustomForm from '../../../components/form/form'
import { Main } from '../../../constant'
import { CustomBtn } from '../../../components/button/button'
import Staticinputs from './components/staticinputs'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PrivateMessage from './components/privatemessage'
import VeiwAllmemberMessages from './components/veiwallmembermessage'
import Holiday from './components/holidays'
import PublicAnnoc from './components/publicAnnoc'
import Annoucement from './components/annoucement'



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
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const CustomizeRolls = props => {    
        const [value, setValue] = React.useState(0);
  
        const handleChange = (event: React.SyntheticEvent, newValue: number) => {
          setValue(newValue);
        };
  return (
    <>
        <PageContainer  title="Customize Rolls" description="Customize Rolls">
            <Grid container>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Fees and Salary  فیس او معاش" {...a11yProps(0)} />
                        <Tab label="Private Message" {...a11yProps(1)} />
                        <Tab label="Veiw All Member Messages" {...a11yProps(2)} />
                        <Tab label="Public Annoucement عامه اعلان" {...a11yProps(3)} />
                        <Tab label="Holiday رخصتي" {...a11yProps(4)} />
                        <Tab label="Authority کارمنداختیار" {...a11yProps(5)} />
                        {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Grid item lg={12} md={12}>
                            <Annoucement />
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Grid item lg={6} md={6}>
                                <PrivateMessage />
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                            <Grid item lg={6} md={6}>
                                <VeiwAllmemberMessages />
                            </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Grid item lg={6} mt={2}>
                            <PublicAnnoc />
                        </Grid>
                        </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
                        <Grid item lg={12} md={12} mt={2}>
                            <Holiday />
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={5}>
                        <Box >
                            <Stack>
                                <Grid container sx={{maxWidth: '1200px'}}>
                                        <Staticinputs />
                                </Grid>
                            </Stack>
                        </Box>
                    </CustomTabPanel>

                                    
                                   
                                                
                </Box>
            </Grid>
        </PageContainer>
    </>
  )
}

CustomizeRolls.propTypes = {}

export default CustomizeRolls