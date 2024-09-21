import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@emotion/react'
import axios from 'axios'
import { ShowLoader } from '../../../../redux/actions/loader'
import { CustomBtn } from '../../../../components/button/button'
import Modal from './modal'

const ShowKhataPerson = props => {
    const image = useSelector((state)=>state.Api.imageServer)
    const style = useTheme().palette.Components.teacherreoprt;
    const dispatch = useDispatch();
    const api = useSelector((state)=>state.Api)
    const [ data , setData  ] = useState()
    const [open, setOpen] = useState(false);


    

    useEffect(()=>{
        const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
        try {
          dispatch(ShowLoader('1'))
          axios.get(`${api.ShowPersonData}/${props.id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data.result);
              setData(res.data.result[0]);
              dispatch(ShowLoader('0'))
            }
          })
          .catch((err) => {
            console.error(err); // Log the error response for debugging
          });
        } catch (err) {
          console.error(err);
        }
    },[props.id])

    const openclose = () => {
        setOpen(false)
    }
    // const openfunc = () => {
    //     setOpen(true)
    // }


  return (
    <div>
           <Dialog
            open={open}
            onClose={openclose}
            aria-labelledby="responsive-dialog-title"
            className='dialogCustomSize'
            
            >
                <DialogTitle id="responsive-dialog-title" >
                    Creating New Bill
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box 
                        sx={{
                            minWidth: '400px',
                            minHeight: '448px'
                        }}
                        >
                            <Modal
                            //  myfunc={updateinfo}
                              />
                        </Box>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={openclose}>
                    Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        <Grid container>
                    {
                        data && (
                            <>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='flex-start' height='100%'>
                                        <Avatar
                                        src={`${image}${data.image}`}
                                        sx={style.image}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Name: <b>{data.Name}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Typography variant='p'>
                                    Phone: <b>{data.Phone}</b>
                                </Typography>
                            </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Typography variant='p'>
                                    IdNo: <b>{data.IdNo}</b>
                                </Typography>
                            </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Typography variant='p'>
                                    Date: <b>{data.Date}</b>
                                </Typography>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Typography variant='p'>
                                    Create Bill: <b>
                                        <CustomBtn
                                        click={()=>setOpen(true)}
                                        data="Create New Bill"
                                        />
                                    </b>
                                </Typography>
                            </Grid>
                    </Grid>
                </>
                    )
                    }
            </Grid>
    </div>
  )
}

ShowKhataPerson.propTypes = {}

export default ShowKhataPerson