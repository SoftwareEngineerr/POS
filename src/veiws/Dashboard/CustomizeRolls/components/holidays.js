import React, { useState } from 'react';
import DashboardCard from '../../../../components/shared/DashboardCard';

import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Box, Card, Grid, Link, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Input } from '../../../../components/input/input';
import { CustomBtn } from '../../../../components/button/button';
import SendIcon from '@mui/icons-material/Send';
import { Main } from '../../../../constant';
import CustomForm from '../../../../components/form/form';
import { useDispatch, useSelector } from 'react-redux';
import { PostRequest } from '../../../../redux/actions/PostRequest';

const Holiday = () => {
  const theme = useTheme();
  const style = theme.palette.Main.Dashboard;
  const [data , setData] = useState(Main().CustomizeRoles.holidays)
  const dispatch = useDispatch();
  // const api = useSelector((state)=>state.Api)
  const getfilterdata =  data.filter((item) => item.feildtype !== 'label');
  const api = useSelector((state)=>state.Api.annnouncmentholidays)
  const initialInputValues = Object.fromEntries(
      getfilterdata
          .map((item) => [item.name, ''])
  );
      console.log(initialInputValues)
  const [inputValues, setInputValues] = useState(initialInputValues);


  function handleInputChange(e) {
      setInputValues((prevValues) => ({
          ...prevValues,
          [e.target.name]: e.target.value,
      }));
  }
  
  function handleRadioChange(e) {
      console.log(e)
      setInputValues((prevValues) => ({
          ...prevValues,
          [e.target.name]: e.target.placeholder,
      }));
  }
  const ChangeOnSelect = (getparam) => {
      console.log(getparam[1])
      setInputValues((oldData)=> ({
          ...oldData,
          [getparam[1]]: getparam[0]
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

  function myfunc(event) {
      event.preventDefault();
      console.log(inputValues);
      const startDate = new Date(inputValues.startDate);
      const endDate = new Date(inputValues.endDate);

      // Function to format date as 'YYYY-MM-DD'
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      // Generate an array of objects representing the date range
      const dateRangeArray = [];
      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dateRangeArray.push({ date: formatDate(currentDate) });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // console.log(dateRangeArray);
      inputValues.getDate = dateRangeArray;
      console.log(inputValues)

      dispatch(PostRequest(api,  JSON.parse(sessionStorage.getItem("User_Data")).token , inputValues))
  }
  return (
    <DashboardCard title="Holiday Announsment">
      <>
      <Box sx={style.chatBox}>
      {/* <Box sx={style.client}>
        <Box component="img" sx={style.image} src='/images/profile/user-1.jpg' />
          <Box sx={style.status}>
             <Typography variant='h6' sx={style.heading}>
                Sami
             </Typography>
                Absent
          </Box>
        </Box> */}
        <form onSubmit={myfunc}>
            <Grid container>
                <CustomForm data={data}  ChangeOnSelect={ChangeOnSelect} ChangeDate={ChangeDate}  handleInputChange={handleInputChange}  />
            </Grid>
        </form>
      </Box>
      </>
    </DashboardCard>
  );
};

export default Holiday;
