import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grid, Input, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import CustomForm from '../../../../components/form/form'
import { Main } from '../../../../constant'
import { useDispatch, useSelector } from 'react-redux'
import { PostRequest } from '../../../../redux/actions/PostRequest'
import axios from 'axios'
import { DateGlobalConvertor } from '../../../../components/Date/DateGlobalConverter'
import dayjs from 'dayjs'

const Modal = (props) => {
    const theme = useTheme();
    const tablestyle = theme.palette.Main.Inventory.modal;
    const data = Main().Inventory;
    const dispatch = useDispatch();
    const api = useSelector((state)=>state.Api)
    const loadDate = dayjs(Date.now())
    // debugger;

    const makingDate = `${loadDate.$y}-${loadDate.$M}-${loadDate.$D}`
        console.log(makingDate)
    const getfilterdata =  data.inputs.filter((item) => item.feildtype !== 'label');
    const initialInputValues = Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, item.value])
    );
    const [inputValues, setInputValues] = useState({BarCode:'' , ...initialInputValues , expiryDate: makingDate});

    

    function handleInputChange(e) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }

    const Submitfunc = async (e) => {
        e.preventDefault();
        // alert('welcome')
        await dispatch(PostRequest(api.addProduct,  JSON.parse(sessionStorage.getItem("User_Data")).token , inputValues))
        props.myfunc();
    }
    const ChangeOnSelect = (getparam) => {
        console.log(getparam[1])
        setInputValues((oldData)=> ({
            ...oldData,
            [getparam[1]]:getparam[0]
        })
        )
    }



    const [barcode, setBarcode] = useState('');
    const [googleRes , setGoogleRes ] = useState('')

    useEffect(() => {

        const handleScan = async (event) => {
            const scannedValue = event.key;

            if (scannedValue === 'Enter') {
                // Log the barcode to ensure it's captured correctly
                // alert(barcode)
                debugger
                inputValues.BarCode = barcode;
                console.log(`Scanned barcode: ${barcode}`);
                
                const apiKey = 'AIzaSyCArRE_45dmQ9Q1MNvju3oG1JJ5OAdjfU0';
                const searchEngineId = 'a55309a5c45ba4bbb';
                const query = encodeURIComponent(barcode);

                // try {
                //     const response = await axios.get(
                //         `https://www.googleapis.com/customsearch/v1`, {
                //         params: {
                //             q: query,
                //             cx: searchEngineId,
                //             key: apiKey,
                //             searchType: 'image'
                //         }
                //     }
                // );
                //     setGoogleRes(response.data.items)

                //      if(response.data.items[0]){
                //          setInputValues((prevValues) => ({
                //              ...prevValues,
                //              Name: response.data.items[0].title,
                //             }))
                //         //     [{name:'Name',value: response.data.items[0].title}].map(item , ind)=>(
                //         //         // alert(item.name)
                //         //     document.getElementsByName(item.name).value = item.value
                //         // )
                //     }
                //     // console.log('API response data:', response.data.items.map((item , ind)=>{ return item.image.thumbnailLink}));
                //     // Handle the response data
                // } catch (error) {
                //     console.error('Error fetching data:', error);
                // }
                
                setBarcode('');
            } else {
                setBarcode(prev => prev + scannedValue);
            }
        };

        window.addEventListener('keydown', handleScan);

        return () => {
            window.removeEventListener('keydown', handleScan);
        };
    }, [barcode]);

    const ChangeDate = (e , name) =>{
        console.log(e , name)
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: e
    }));
    }


  return (
    <>
        <Box sx={tablestyle.box}>
            {/* Welcome  */}
            <form onSubmit={Submitfunc}>
                <Grid container>
                        <CustomForm data={data.inputs} handleInputChange={handleInputChange}  ChangeDate={ChangeDate} ChangeOnSelect={ChangeOnSelect} />
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                        <Box mt="34px">
                            <Typography variant="h6"
                            component="label" htmlFor='password' mb="5px" >
                                Bar Code
                            </Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={9} md={9} sm={12} xs={12}>
                    <Box mt="15px" mr="10px"> 
                    <Input
                        type='text'
                        placeholder='Bar Code'
                        name='BarCode'
                        value={inputValues.BarCode}
                        onChange={(event) => handleInputChange(event)}
                        sx={{
                            font: 'inherit',
                            letterSpacing: 'inherit',
                            color: 'currentColor',
                            padding: '4px 0 5px',
                            border: '0',
                            boxSizing: 'content-box',
                            background: 'none',
                            height: '1.4375em',
                            margin: '0',
                            // -webkit-tap-highlight-color: 'transparent',
                            display: 'block',
                            minWidth: '0',
                            width: '100%',
                            animationName: 'mui-auto-fill-cancel',
                            // -webkit-animation-duration: '10ms',
                            animationDuration: '10ms',
                            padding: '16.5px 14px',
                            marginBottom: '20px'
                        }}
                        autoComplete='off'
                            
                    />
                    </Box>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type={'submit'}
                    component={'button'}
                    >
                    {/* {props.data} */}
                    Add Product
                    </Button>
            </Grid>
                    {
                        googleRes && (
                            googleRes.map((item , ind)=>
                                <>
                                    <img src={item.image.thumbnailLink} />
                                </>
                            )
                        )
                    }
                </Grid>

            </form>
        </Box>
    </>
  )
}

Modal.propTypes = {}

export default Modal