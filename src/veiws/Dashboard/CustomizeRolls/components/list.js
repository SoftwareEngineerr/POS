import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Switch, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { PostRequest } from '../../../../redux/actions/PostRequest';
import { useDispatch, useSelector } from 'react-redux';

const List = (props) => {
    const theme = useTheme();
    const style = theme.palette.Main.Dashboard;
    const url = useSelector((state) => state.Api.switchpublicannouncemnet);
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const dispatch = useDispatch()

    const [checked, setChecked] = React.useState(props.status == 1 ? true : false);
    console.log(checked)
    // const handleChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    //     setChecked(event.target.checked);
    //     console.log(event.target.checked)
    //     const inputValues = {Srn:props.Srn}
    //     await dispatch(PostRequest(url ,userToken, inputValues ))
    //     props.func();
    //   };
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Switch toggled');
        setChecked(event.target.checked);
        console.log(event.target.checked);
        const inputValues = { Srn: props.Srn };
        await dispatch(PostRequest(url, userToken, inputValues));
        props.func(); // Check if this line is being reached
      };
      
      

      
    //   const getTime = props.Time.split('T03')
  return (
    <Box sx={style.client}>
        {/* <Box component="img" sx={style.image} src={`${props.imageServer}${props.Picture}`} /> */}
            <Box sx={style.fullBox}>
                {/* <Typography variant='h6' sx={style.heading}>
                    {props.Name}
                </Typography> */}
                <Grid container>
                    <Grid item lg={10}>
                        {props.Message}
                    </Grid>
                    <Grid lg={2}>
                        {/* {props.Time} */}
                        {
                            checked ?
                                <Switch
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            :
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }

                    </Grid>
                </Grid>

            </Box>
        </Box>
  )
}

List.propTypes = {}

export default List