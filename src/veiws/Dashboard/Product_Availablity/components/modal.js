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
import ShowProduct from '../../../../components/suggestionInput/showProduct'
import { ShowLoader } from '../../../../redux/actions/loader'

const Modal = (props) => {
    const theme = useTheme();
    const tablestyle = theme.palette.Main.Inventory.modal;
    const data = Main().ProductAvailiable;
    const dispatch = useDispatch();
    const api = useSelector((state)=>state.Api)
    const loadDate = dayjs(Date.now())
    const [suggestions , setSuggestions] = useState();
    const [ image , setImage ] = useState();
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
        await dispatch(PostRequest(api.productAdd,  JSON.parse(sessionStorage.getItem("User_Data")).token , inputValues))
        props.myfunc();
        console.log(inputValues)
    }
    const ChangeOnSelect = (getparam) => {
        console.log(getparam[1])
        setInputValues((oldData)=> ({
            ...oldData,
            [getparam[1]]:getparam[0]
        })
        )
    }




    const ChangeDate = (e , name) =>{
        console.log(e , name)
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: e
    }));
    }

    function suggestionhandleInputChange(e) {
        setImage(e.target.Image)
        console.log(e)
        setInputValues((prevValues) => ({
            ...prevValues,
            id: e.target.id,
        }));
        // const RollNum = { RollNum: e.target.value}
        // fetchstudent(RollNum)   
    }

    useEffect(() => {
        const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
        try {
          dispatch(ShowLoader('1'))
          axios.get(api.hintProduct, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data.message);
              setSuggestions(res.data.message);
              dispatch(ShowLoader('0'))
            }
          })
          .catch((err) => {
            console.error(err); // Log the error response for debugging
          });
        } catch (err) {
          console.error(err);
        }
      }, []);

  return (
    <>
        <Box sx={tablestyle.box}>
            {/* Welcome  */}
            <form onSubmit={Submitfunc}>
                <Grid container>
                <Grid item  lg={3} md={3} sm={12} xs={12}>
                  <Box mt="34px">
                      <Typography variant="h6"
                      component="label" htmlFor='password' mb="5px" >
                          Suggestion
                      </Typography>
                    </Box>
                </Grid>
                    <Grid item  lg={9} md={9} sm={12} xs={12}>
                    <ShowProduct 
                    handleInputChange={suggestionhandleInputChange}
                    Suggestions={suggestions}
                    placeholder='Roll No / Name'
                    name='RollNum'
                    />

                    </Grid>
                        <CustomForm data={data.inputs} handleInputChange={handleInputChange}  ChangeDate={ChangeDate} ChangeOnSelect={ChangeOnSelect} />

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box mt={2}>
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
                      </Box>
                  </Grid>
                  {
                    image && (
                      [image].map((item , ind)=>
                        <Box key={ind}>
                          {/* <img src={`${api.imageServer}/${item}`} /> */}
                          <Box
                          component="img"
                          src={`${api.imageServer}/${item}`} 
                          mt={2}
                          // alt="Description of image"
                          sx={{
                            width: '100%', // Adjust size as needed
                            height: 'auto', // Maintain aspect ratio
                            borderRadius: 2, // Optional: add rounded corners
                            boxShadow: 2,   // Optional: add shadow
                          }}
                        />
                        </Box>
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