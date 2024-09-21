import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Main } from '../../../../../constant';
import { Input } from '../../../../../components/input/input';
import { Box, Icon, Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginauth } from '../../../../../redux/actions/loginauth';
import { WebSrnStorage } from '../../../../../hooks/FirstTimeWebSrn/Websrn';


const Auth = (props) => {
    const [data, setData] = useState(Main().Login);
    const dispatch = useDispatch();
    const apilink = useSelector((state) => state.Api.Login);
    const veri = useSelector((state) => state.Auth.permission);
    const [websrndata, serWebsrndata] = useState(WebSrnStorage())

    const initialInputValues = Object.fromEntries(
        data.inputs.map((item) => [item.name, ''])
    );
    const [res, setRes] = useState(true)

    const [inputValues, setInputValues] = useState(initialInputValues);
    const [getlocation, setGetlocation] = useState('');
    const [blockLogin, setBlockLogin] = useState(false);


    function handleInputChange(e) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }

    async function myfunc(event) {
        event.preventDefault();
        console.log(websrndata)
        const payload = { ...inputValues, api: apilink, WebSrn: JSON.parse(localStorage.getItem("WebSrn")), geoLocation: getlocation }
        // console.log(payload)
        setRes(false)
        await dispatch(loginauth(payload))
        setTimeout(() => {
            setRes(true)
        }, 1000)
    }


//     fetch('https://ipapi.co/json/')
//   .then(response => {
//     // Parse the JSON response
//     return response.json();
//   })
//   .then(data => {
//     // Access the IP address and country name from the response data
//     const ipAddress = data.ip;
//     const countryName = data.country_name;
//     console.log('User IP address:', ipAddress);
//     console.log('User country:', countryName);
//   })
//   .catch(error => {
//     console.error('Error fetching IP and country:', error);
//   });


    // console.log(veri)
    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        const isChrome = /Chrome/.test(userAgent);
        const isEdge = /Edge/.test(userAgent);
        console.log(isEdge, isChrome)
        
        if (!isChrome || isEdge) {
            alert('Please use only Chrome Browser مهرباني وکړئ یوازې کروم براوزر وکاروئ')
            window.location.href = `https://${window.location.host}/`;
        }
          
        if (veri == true) {
            dispatch({ type: "SHOW_LOADER", Seconds: '1' });
            window.location.href = `https://${window.location.host}/Private/Home`;
        }
    }, [veri])

    useEffect(()=>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              position => {
                    const objLoc = { latitude : '', longitude: '' }
                    objLoc.latitude = position.coords.latitude;
                    objLoc.longitude = position.coords.longitude;
                    setGetlocation(JSON.stringify(objLoc));
                    setBlockLogin(true)
              },
              error => {
                console.error('Error getting geolocation:', error);
              }
            );
          } else {
            console.error('Geolocation is not supported by this browser.');
          }
          console.log(getlocation,navigator)
    }, [])

    return (
        <form onSubmit={myfunc}>
            <Stack>
                {data.inputs.map((item, ind) => (
                    <Grid item lg={12} key={ind}>
                        <Box mt="25px">
                            <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='password' mb="5px" >
                                {item.label}
                            </Typography>
                            <Input
                                key={ind}
                                type={item.type}
                                placeholder={item.data}
                                required={item.required}
                                name={item.name}
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Box>
                    </Grid>
                ))}
                <Box>
                    <br />
                    {
                        // res == true ?
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            fullWidth
                            // mt={1}
                            // component={Link}
                            // to="/"
                            type="submit"
                            disabled={!res || !blockLogin}
                        // onClick={console.log('butn')}
                        >
                            {data.butn}
                        </Button>
                        // :
                        // null
                    }
                </Box>
                <>
      {blockLogin === false && (
        <div className='geoLocation'>
            <p><Icon component={LocationOnOutlinedIcon} /></p>
            <p className='blinking-text'> مهرباني وکړئ د براوزر موقعیت ته اجازه ورکړئ او ریفریش کړئ</p>
            <p className='blinking-text'>Please Allow Browser Location and Refresh </p>
        </div>
      )}
    </>
            </Stack>
        </form>
    );
};

Auth.propTypes = {};

export default Auth;
