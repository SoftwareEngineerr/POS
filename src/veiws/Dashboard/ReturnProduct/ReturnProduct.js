import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CustomForm from '../../../components/form/form';
import { Main } from '../../../constant';
import { CustomBtn } from '../../../components/button/button';
import { Box, Grid } from '@mui/material';

const ReturnProduct = (props) => {
    const [data , setData] = useState(Main().Return);
    const [getfilterdata , setGetfilterdata ] = useState(data.inputs.filter((item) => item.feildtype !== 'label'));
    const [initialInputValues , setInitialInputValues] = useState(Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, ''])
    ));
    const [inputValues, setInputValues] = useState(initialInputValues);

    function handleInputChange(e) {
        console.log(inputValues )
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }
  return (
    <div>
        <Grid container>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <CustomForm data={data.inputs} handleInputChange={handleInputChange}  />
                {
                    inputValues.bill_id ? (
                        <Box mt={1}>
                            <CustomBtn
                                data="Watch Bill"
                            />
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