import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { CustomBtn } from '../../../../components/button/button'
import { PostRequest } from '../../../../redux/actions/PostRequest'
import { useDispatch, useSelector } from 'react-redux'

const Annoucement = props => {
    const dispatch = useDispatch()
    const url = useSelector((state)=>state.Api)
    const fee = () =>{
        dispatch(PostRequest(url.annnounceFees,JSON.parse(sessionStorage.getItem("User_Data")).token))
    }
    const salary = () =>{
        dispatch(PostRequest(url.annnounceSalary,JSON.parse(sessionStorage.getItem("User_Data")).token))
    }
  return (
    <>
        <Grid container>
            <Grid lg={4}>
                <CustomBtn data="Annoucement Of Student Fee" click={fee} />
            </Grid>
            <Grid lg={2}></Grid>
            <Grid lg={4}>
                <CustomBtn data="Annoucement Of Teacher Salary" click={salary} />
            </Grid>
        </Grid>
    </>
  )
}

Annoucement.propTypes = {}

export default Annoucement