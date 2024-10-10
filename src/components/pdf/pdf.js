// src/Receipt.js
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Box, Grid, Typography } from '@mui/material';

const Receipt = (props) => {
    console.log(props.data)
    const [data , setData] = useState(props.data)
  return (
    <div id="Receipt">
        {
            props.data ? 
            <Box>
                <Box textAlign='center'>
                    <Typography variant='h2' sx={{margin:'0'}}>
                        {data.OwenrDetails.Shop_Name}
                    </Typography>
                    <Typography variant='p'>
                        {data.OwenrDetails.Address}
                    </Typography>
                    <br />
                    <Typography variant='p'>
                        Phone: {data.OwenrDetails.customerMobile}
                    </Typography>
                    <hr />
                </Box>
                <Box>
                    <Typography variant='b' sx={{margin:'0'}}>
                        Bill No : {data.bill_id}
                    </Typography>
                    <br />
                    <Typography variant='b' sx={{margin:'0'}}>
                        Date : 2024-10-1
                    </Typography>

                        <div class="border"></div>
                    <table >
                        <thead>
                            <tr>
                                <td>
                                    Item
                                </td>
                                <td>
                                    Qty
                                </td>
                                <td>
                                    Rate
                                </td>
                                <td>
                                    Dis
                                </td>
                                <td>
                                    Amt
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.fakedata.map((item , ind)=>
                                    <tr>
                                        <td>
                                            {ind+1}. {item.Name}
                                        </td>
                                        <td>
                                            {item.Quantity}
                                        </td>
                                        <td>
                                            {item.Sell_Price}
                                        </td>
                                        <td>
                                            Dis
                                        </td>
                                        <td>
                                            {item.Sell_Price * item.Quantity}
                                        </td>
                                    </tr>
                                )
                            }
                          
                        </tbody>
                    </table> 
                    <Box mt={4}>
                    <hr />
                    <Grid container>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography variant='h3'>
                                Total
                            </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                         <Typography variant='h3' textAlign='right'>
                                1554
                            </Typography>
                        </Grid>
                    </Grid>
                    <hr />
                    </Box>

                </Box>
            </Box>
            :
            null
        }
    </div>
  );
};

export default Receipt;

