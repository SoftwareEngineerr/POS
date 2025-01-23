// src/Receipt.js
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { Box, Grid, Typography } from '@mui/material';
import Barcode from 'react-barcode';

const Receipt = (props) => {
    console.log(props.data)
    const [data , setData] = useState(props.data)
    // const [getDate, setGetDate] = useState(new Date(props.data.Bill_Details.Date || Date.now()));
    const [getDate, setGetDate] = useState(new Date(props.data.Bill_Details.Date || Date.now()));

    useEffect(() => {
        if (props.data.Bill_Details.Date) {
            setGetDate(new Date(props.data.Bill_Details.Date));
        }
    }, [props.data.Bill_Details.Date]);

    // Format the date for display
    const formattedDate = getDate.toLocaleString(); 
    // const [getDate , setGetDate ] = useState(new Date(props.data.Bill_Details.Date))
  return (
    <div id="Receipt">
        {
            props.data ? 
            <Box>
                <Box textAlign='center'>
                    <Typography variant='h2' sx={{margin:'0'}}>
                        {data.OwnerDetails?.Shop_Name}
                    </Typography>
                    <Typography variant='p'>
                        {data.OwnerDetails?.Address}
                    </Typography>
                    <br />
                    <Typography variant='p'>
                        Phone: {data.OwnerDetails?.customerMobile}
                    </Typography>
                    <hr />
                </Box>
                <Box>
                    <Typography variant='b' sx={{margin:'0'}}>
                        Bill No : {data.Bill_Details.Id}
                    </Typography>
                    <br />
                    <Typography variant='b' sx={{margin:'0'}}>
                        Date : {formattedDate}
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
                                {
                                    data.Bill_Details.Discount ? 
                                    <td>
                                        Dis
                                    </td>
                                    :
                                    null    
                                }
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
                                        {
                                            data.Bill_Details.Discount ? 
                                        <td>
                                            {item.Discount}
                                        </td>
                                        :
                                        null
                                        }
                                        <td>
                                            {item.Sell_Price * item.Quantity}
                                        </td>
                                    </tr>
                                )
                            }
                          
                        </tbody>
                    </table> 
                    {/* <Box mt={4}>
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
                            </Box> */}
                    {
                        data.Bill_Details.Discount ? 
                        <>
                            <Grid container mt={4}>
                                <Grid item lg={6} md={6} xs={6} sm={6}>
                                    <Box>
                                        <hr />
                                    <Grid container>
                                        <Grid item lg={6} md={6} sm={6} xs={6}>
                                            <Typography variant='h5'>
                                                Total
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <Typography variant='h5' textAlign='right' pr={1}>
                                                {data.Bill_Details.Discount + data.Bill_Details.Total}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    </Box>
                                </Grid>
                                <Grid item lg={6} md={6} xs={6} sm={6}>
                                    <Box>
                                    <hr />
                                    <Grid container>
                                        <Grid item lg={6} md={6} sm={6} xs={6}>
                                            <Typography variant='h5' pl={1}>
                                                Discount
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <Typography variant='h5' textAlign='right'>
                                                {data.Bill_Details.Discount}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    </Box>
                                </Grid>

                            </Grid>
                                    <hr />
                            <Box>
                            {/* <hr /> */}
                            <Grid container>
                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                    <Typography variant='h3'>
                                        After Discount
                                    </Typography>
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='h3' textAlign='right'>
                                        {data.Bill_Details.Total}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            </Box>
                        </>
                        :
                        <>
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
                                        {data.Bill_Details.Total}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <hr />
                        </Box>
                        </>
                    }
                    <Box textAlign='center' mt={2} >
                        <Barcode value={data.Bill_Details.Id} />
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

