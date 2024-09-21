import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid } from '@mui/material'
import { useTheme } from '@emotion/react'
import CustomForm from '../../../../components/form/form'
import { Main } from '../../../../constant'
import { useDispatch, useSelector } from 'react-redux'
import { PostRequest } from '../../../../redux/actions/PostRequest'

const Modal = (props) => {
    const theme = useTheme();
    const tablestyle = theme.palette.Main.Inventory.modal;
        const data = Main().Khata;
        const dispatch = useDispatch();
    const api = useSelector((state)=>state.Api)
    // debugger;

 
    const getfilterdata =  data.inputs.filter((item) => item.feildtype !== 'label');
    const initialInputValues = Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, item.value])
    );
    const [inputValues, setInputValues] = useState(initialInputValues);

    

    function handleInputChange(e) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }

    const Submitfunc = async (e) => {
        e.preventDefault();
        // alert('welcome')
        await dispatch(PostRequest(api.addKhata,  JSON.parse(sessionStorage.getItem("User_Data")).token , inputValues))
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
    
  return (
    <>
        <Box sx={tablestyle.box}>
            {/* Welcome  */}
            <form onSubmit={Submitfunc}>
                <Grid container>
                        <CustomForm data={data.inputs} handleInputChange={handleInputChange}  ChangeOnSelect={ChangeOnSelect} />
                </Grid>

            </form>
        </Box>
    </>
  )
}

Modal.propTypes = {}

export default Modal