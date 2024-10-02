import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../../components/input/input'
import { CustomBtn } from '../../../../components/button/button'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { PostRequest } from '../../../../redux/actions/PostRequest'

const PayModal = (props) => {
    // alert(props.khataId)
    const [ inputValues , setInputValues] = useState({pay:'' , id: props.khataId})
    const dispatch = useDispatch();
    const url = useSelector((state)=>state.Api);
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const pay = (e) => {
        let amount = Math.abs(props.Amount);
        if(amount >= e.target.value){
            setInputValues((prevValues) => ({
                ...prevValues,
                pay: parseInt(e.target.value),
            }));

            // //console.log(e.target.value , props.data[ind].Sell_Price , e.target.value * props.data[ind].Sell_Price,)
            // props.data[ind].defaultQuatity = e.target.value
            e.target.style.background = 'white'
        }
        else{
            e.target.value = amount
            // e.target.style.border = '1px solid red'
            e.target.style.background = '#ffcccc'
            setInputValues((prevValues) => ({
                ...prevValues,
                pay: parseInt(e.target.value),
            }));
        }
    }

    const submitfunc = async(e) => {
        e.preventDefault();
        await dispatch(PostRequest(url.userPay , userToken , inputValues))
        props.closepaymodal()
    }
    

  return (
    <div>
        <Input
        placeholder="Type Amount"
        onChange={pay}
        type='number'
        />
        {
            inputValues.pay ? (
                <form onSubmit={submitfunc}>
                    <Box mt={1}>
                        <CustomBtn 
                        data="Pay"
                        />
                    </Box>
                </form>
            )
            :
            null
        }
    </div>
  )
}

PayModal.propTypes = {}

export default PayModal