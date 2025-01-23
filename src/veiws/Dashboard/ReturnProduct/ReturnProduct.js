import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CustomForm from '../../../components/form/form';
import { Main } from '../../../constant';
import { CustomBtn } from '../../../components/button/button';
import { Box, Grid } from '@mui/material';
import { ShowLoader } from '../../../redux/actions/loader';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import CalculatorTable from '../../../components/table/calculatorTable';
import HistoryCalculatorTable from '../../../components/table/historycalculatorTable';

const ReturnProduct = (props) => {
    const [data , setData] = useState(Main().Return);
    const [getfilterdata , setGetfilterdata ] = useState(data.inputs.filter((item) => item.feildtype !== 'label'));
    const [initialInputValues , setInitialInputValues] = useState(Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, ''])
    ));
    const [ realdata , setRealdata ] = useState()
    const [inputValues, setInputValues] = useState(initialInputValues);
    const dispatch = useDispatch();
    const api = useSelector((state)=>state.Api)
    const [ list , setList ] = useState()
    const [update , setUpdate ] = useState(0)

    function handleInputChange(e) {
        console.log(inputValues )
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }
    const trackBill = () => {
      const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
            try {
              dispatch(ShowLoader('1'))
              axios.post(`${api.track_Bill_Id}`, inputValues, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userToken}`,
                },
              })
              .then(async(res) => {
                if (res.status === 200) {
                  console.log(res.data.productresults)
                  setRealdata(res.data.productresults)
                  setList(res.data.fakedata)
                  setUpdate((data)=>data+1)
                  dispatch(ShowLoader('0'))
                }
                else{
                  dispatch(ShowLoader('0'))
                }
              })
              .catch((err) => {
                console.error(err); // Log the error response for debugging
                dispatch(ShowLoader('0'))

              });
            } catch (err) {
              console.error(err);
              dispatch(ShowLoader('0'))

            }
    }
    const submitfunc = (e) => {
        e.preventDefault()
        trackBill();
        console.log(inputValues)
    }
  return (
    <div>
        <Grid container>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <CustomForm data={data.inputs} handleInputChange={handleInputChange}  />
                {
                    inputValues.bill_id ? (
                        <form onSubmit={submitfunc}>
                            <Box mt={1}>
                                <CustomBtn
                                    data="Watch Bill"
                                />
                            </Box>
                        </form>
                    )
                    :
                    null
                }
            </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>

                    {
                        list && 
                            list[0] ? (
                            <Box mt={2}>
                            <HistoryCalculatorTable updateData={update} data={list} realdata={realdata} bill_id={inputValues.bill_id} update={trackBill} />
                            </Box>
                        )
                        :
                        null
                    
                    }
            </Grid>
        </Grid>
    </div>
  )
}

ReturnProduct.propTypes = {}

export default ReturnProduct