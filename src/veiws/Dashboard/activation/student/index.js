import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../../../../components/Container/pageContainer'
import { Box, Grid, Typography } from '@mui/material'
import CustomForm from '../../../../components/form/form'
import { Main } from '../../../../constant'
import { CustomBtn } from '../../../../components/button/button'
import SuggestionInput from '../../../../components/suggestionInput/suggestionInput'
import { Date } from '../../../../components/Date/Date'
import dayjs from 'dayjs'
import CustomTable from '../../../../components/table/SimpleTable'
import { Input } from '../../../../components/input/input'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { FullDate } from '../../../../components/Date/FullDate'
import { PostRequest } from '../../../../redux/actions/PostRequest'
import { CustomSelect } from '../../../../components/select/select'
import StudentReportComponent from '../../../../components/report/student'
import { ShowLoader } from '../../../../redux/actions/loader'

const StudentActivation = props => {
    const [data , setData] = useState(Main().Fee);
    const [getfilterdata , setGetfilterdata ] = useState(data.inputs.filter((item) => item.feildtype !== 'label'));
    const [initialInputValues , setInitialInputValues] = useState(Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, ''])
    ));
    const [suggestions , setSuggestions] = useState();
    const dispatch = useDispatch();
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const url = useSelector((state) => state.Api);
    const [update , setUpdate] = useState(0);
    const [ studentOldDetails , setStudentOldDetails ] = useState()
    const [maxSelectableDate , setMaxSelectableDate] = useState(); 




    const [inputValues, setInputValues] = useState({Date: dayjs().format('MMMM YYYY'), ...initialInputValues});

    const fetchstudent = (param) => {
        dispatch(ShowLoader('1'))
        axios.post(url.studentactivationshow, param,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              res.data.result.activatePage= true;
              setStudentOldDetails(res.data);
              setMaxSelectableDate(dayjs(res.data.lastrecord))
              setTimeout(()=>{
                dispatch(ShowLoader('0'))
              },1000)
            }
          })
          .catch((err) => {
            console.error(err); // Log the error response for debugging
          });
    }
    function suggestionhandleInputChange(e) {
        setStudentOldDetails('')
         // setInputValues((prevValues) => ({
        //     ...prevValues,
        //     RollNum: e.target.value,
        // }));
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
            Fee: '',
        }));
        const RollNum = { RollNum: e.target.value}
        console.log(inputValues)

        fetchstudent(RollNum)   
    }
    const submitfunc = async (e) =>{
        e.preventDefault();
        const payload = {...inputValues}
        console.log(payload)
        await dispatch(await PostRequest(url.studentActivitionInsertFee , userToken , payload))
        setUpdate((update)=>update+1)
        const RollNum = {RollNum : inputValues.RollNum}
        fetchstudent(RollNum)
    }
    useEffect(() => {
        try {
          dispatch(ShowLoader('1'))
          console.log('try start here')
          axios.get(url.studentsuggestion, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
          })
          .then((res) => {
          console.log('200 msg')
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
      }, [update]);
      function handleInputChange(e) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
        console.log(inputValues)
    }

  return (
    <PageContainer title="Stduent Details Update" description="Stduent Details Update">
            <Grid container>
                
                <Grid item lg={6} md={9} sm={12} xs={12}>         
                <Grid item lg={12} md={12} sm={12} xs={12}>Student Fees & Discount Update &nbsp;&nbsp;&nbsp;  دمتعلم فیس او تخفیف بدلول </Grid> 
                <form onSubmit={submitfunc}>
                <Grid container>
                  <Grid item lg={12} md={12} sm={12} xs={12}>        
                    <SuggestionInput 
                        handleInputChange={suggestionhandleInputChange}
                        Suggestions={suggestions}
                        placeholder='Roll No / Name'
                        name='RollNum'
                        />
                        {
                            studentOldDetails ? studentOldDetails.result && (
                                <>                                  
                                  <Input sx={{margin:'15px 0px 0px'}} type="number" onChange={(event)=>handleInputChange(event)} name="Fee" placeholder='Monthly Fees' />
                                  <Input sx={{margin:'15px 0px 0px'}} type="number" onChange={(event)=>handleInputChange(event)} name="Discount" placeholder='Discount' />
                                  <Input sx={{margin:'15px 0px 0px'}} onChange={(event)=>handleInputChange(event)} name="Comments" placeholder='Comments' />
                                  <Box mt={1}></Box>
                                  <CustomBtn disable={inputValues.Fee == '' || inputValues.Fee ==undefined} data='Submit' />
                                </>
                            )
                            :
                            null
                        }
                        </Grid>
                      </Grid>
                   </form>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  {
                    studentOldDetails && (
                      <StudentReportComponent updatefunc={()=>fetchstudent({ RollNum:inputValues.RollNum})} data={studentOldDetails.result} />

                    )
                  }
                </Grid>
            </Grid>
        <Grid container>
            <Grid item lg={9} mt={4}>
                {
                    studentOldDetails && studentOldDetails.fee.length != 0 && studentOldDetails.fee != null && studentOldDetails.fee != undefined  ?
                    <CustomTable data={studentOldDetails.fee} />            
                    :
                    null
                }
            </Grid> 
        </Grid>
    </PageContainer>
  )
}

StudentActivation.propTypes = {}

export default StudentActivation