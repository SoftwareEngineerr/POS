import React from 'react';
import { Grid, Box } from '@mui/material';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import MonthlyEarnings from './components/MonthlyEarnings';
import PageContainer from '../../../components/Container/pageContainer';
import  Notification  from './components/nootification';
import FessStatus from './components/FessStatus';
import Details from './components/Details';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Details />
        </Grid>

            <Grid item xs={12} lg={6}>
                <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Notification />
          </Grid>
          {/* <Grid item xs={12} lg={12}>
            <SalesOverview />
          </Grid> */}
          <Grid item xs={12} lg={12}>
            <FessStatus />
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid> */}
         
          {/* <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;