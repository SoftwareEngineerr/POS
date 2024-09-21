import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Main } from '../../../../../constant';
import { Input } from '../../../../../components/input/input';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import RadioButn from '../../../../../components/radioButn/radioButn';
import { CustomBtn } from '../../../../../components/button/button';
import CustomForm from '../../../../../components/form/form';
import { useDispatch, useSelector } from 'react-redux';
import { TeacherRegistation } from '../../../../../redux/actions/registration/teacherregistation';
import { DateGlobalConvertor } from '../../../../../components/Date/DateGlobalConverter'
import dayjs from 'dayjs';
const Auth = (props) => {
    const [data , setDate] = useState(Main().TechRegistration);
    const [formKey, setFormKey] = useState(0);
    const dispatch = useDispatch()
    const api = useSelector((state)=>state.Api);
    const getfilterdata =  data.inputs.filter((item) => item.feildtype !== 'label');
    const [loadDate, setLoadDate] = useState(DateGlobalConvertor(dayjs(Date.now())))
    console.log(loadDate)
    const initialInputValues = Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, ''])
    );

    const [inputValues, setInputValues] = useState(initialInputValues);

    
    const[ butnVisiablity , setButnVisiablity] = useState(true)


    function handleInputChange(e) {
        if (inputValues.AdmissionDate === '') { 
            updateAdmDate()
        }
        console.log(inputValues )
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }
    
    function handleRadioChange(e) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.placeholder,
        }));
    }
    

    async function myfunc(event) {
        event.preventDefault();
        
        console.log(inputValues)
        // console.log(JSON.parse(sessionStorage.getItem("User_Data")).token);
        await setButnVisiablity(false)
        await dispatch(TeacherRegistation(api.TeacherRegistation,  JSON.parse(sessionStorage.getItem("User_Data")).token , inputValues))
        setTimeout(()=>{
            refreshForm()
            setInputValues(initialInputValues)
            setButnVisiablity(true)
        },1000)
    }
    function updateAdmDate(){
        setInputValues((prevValues) => ({
            ...prevValues,
            'AdmissionDate': loadDate.formatNormalDate,
            'admGrDate': loadDate.gregorianDate,
            'admArDate': loadDate.arabicDate,
        }));
    }

    const ChangeDate = (e, name, grDate, arDate) => {
        const grDateConst = name != 'DOB' ? 'admGrDate' : 'dobGrDate';
        const arDateConst = name != 'DOB' ? 'admArDate' : 'dobArDate';
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: e,
            [grDateConst]: grDate,
            [arDateConst]: arDate
        }));
    }
const ChangeOnSelect = (getparam) => {
    setInputValues((oldData)=> ({
        ...oldData,
        [getparam[1]]:getparam[0]
    })
    )
    console.log(inputValues)
}

 // Function to refresh the form
 const refreshForm = () => {
    setFormKey(prevKey => prevKey + 1);
}

    return (
        <form onSubmit={myfunc}>
            <Grid container>
            <CustomForm key={formKey} data={data.inputs} ChangeOnSelect={ChangeOnSelect} ChangeDate={ChangeDate}  handleRadioChange={handleRadioChange} handleInputChange={handleInputChange}  />
            </Grid>
            
            <Grid container mt={1}>
                <Grid lg={3} item>
                    <Box>

                    </Box>
                </Grid>
                <Grid lg={6} item>
                    <Box>
                        <CustomBtn disable={!butnVisiablity} data={data.butn} style={{maxWidth:'600px' , margin:'auto',display:'block' , marginTop:'10px'}} />
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

Auth.propTypes = {};

export default Auth;


