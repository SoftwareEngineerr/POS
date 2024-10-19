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
import TeacherReportComponent from '../../../../components/report/teacher'
import TeacherSuggestion from '../../../../components/suggestionInput/teachersuggestion'
import { ShowLoader } from '../../../../redux/actions/loader'

const TeacherActivation = (props) => {
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
        axios.post(url.teacheractivationshow, param,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              res.data.result.safari = 'yes';
              setStudentOldDetails(res.data);
              setMaxSelectableDate(dayjs(res.data.lastrecord))
              dispatch(ShowLoader('0'))
            }
          })
          .catch((err) => {
            console.error(err); // Log the error response for debugging
          });
    }
    function suggestionhandleInputChange(e) {
        setStudentOldDetails('')
        // console.log(e.target.name,e.target.value)
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
            Salary: '',
            Comments: '',
        }));
        const RollNum = { RollNum: e.target.value}
        fetchstudent(RollNum)   
    }
    const submitfunc = async (e) =>{
        e.preventDefault();
        const payload = {...inputValues}
        console.log(payload)
        await dispatch(await PostRequest(url.teacherActivitionInsertFee , userToken , payload))
        setUpdate((update)=>update+1)
        const RollNum = {RollNum : inputValues.RollNum}
        fetchstudent(RollNum)
    }
    function handleInputChange(e) {
        //  let getComments = inputValues.Comments == null || inputValues.Comments == undefined ?  ''  : inputValues.Comments
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
            // ['Comments'] : getComments
        }));        
        console.log(inputValues)

    }

  return (
    <PageContainer title="Student Fee" description="Stduent Fee">
            <Grid container>
                <Grid item lg={6} md={9} sm={12} xs={12}>
                    <form onSubmit={submitfunc}>
                    <Grid container>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TeacherSuggestion 
                        handleInputChange={suggestionhandleInputChange}
                        Suggestions={suggestions}
                        placeholder='Roll No / Name'
                        name='RollNum'
                        />
                        {
                            studentOldDetails ? studentOldDetails.result && (
                                <>
                                  
                                    <Input sx={{margin:'15px 0px 0px'}} type="number" onChange={(event)=>handleInputChange(event)} name="Salary" placeholder='New Salary' />
                                    <Input sx={{margin:'15px 0px 0px'}} onChange={(event)=>handleInputChange(event)} name="Comments" placeholder='Comments' />
                                    
                                    <Box mt={1}></Box>
                                    <CustomBtn disable={inputValues.Salary == '' || inputValues.Salary ==undefined} data='Submit' />
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
                      <TeacherReportComponent updatefunc={()=>fetchstudent({ RollNum:inputValues.RollNum})} data={studentOldDetails.result} />

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

TeacherActivation.propTypes = {}

export default TeacherActivation