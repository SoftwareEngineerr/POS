import React, { useEffect, useState } from 'react';
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
import { Box, Card, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Input } from '../../../../components/input/input';
import { CustomBtn } from '../../../../components/button/button';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CustomSelect } from '../../../../components/select/select';
import { PostRequest } from '../../../../redux/actions/PostRequest';

const PrivateMessage = () => {
  const theme = useTheme();
  const style = theme.palette.Main.Dashboard;

  const [data, setData] = useState([]);
  const url = useSelector((state) => state.Api.selectedmessage);
  const teachersuggestionurl = useSelector((state) => state.Api.teachersuggestion);
  const  imageServer = useSelector((state) => state.Api.imageServer);
  const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
  const [teachersuggestionres ,setTeachersuggestionres] = useState()
  const [selectvalue, setSelectvalue] = useState('');
  const [inputValues, setInputValues] = useState();
  const dispatch = useDispatch();
  const privateMessage = useSelector((state)=> state.Api.privateMessage)
  const [ sentmessage , setSentmessage ] = useState(0)



    
  useEffect(() => {

    const teachersuggestion = async () => {
        try {
            const response = await axios.get(teachersuggestionurl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
              setTeachersuggestionres(response.data.message );
                fetchusermessage(inputValues)

            }
        } catch (error) {
            console.error(error);
        }
    };
    teachersuggestion()
}, [url, userToken]);

const submitfunc = async(event)=>{
    event.preventDefault();
    console.log(inputValues);
    await dispatch(PostRequest(privateMessage ,userToken, inputValues ))
    await fetchusermessage(inputValues)
    setSentmessage((sentmessage)=>sentmessage+1)
}
// useEffect
const handleChange = async(event) => {
    setSelectvalue(event.target.value);
    setInputValues((prevValues) => ({
        ...prevValues,
        RollNum: event.target.value,
    }));
    const RollNum ={RollNum:event.target.value};
    fetchusermessage(RollNum)
  };
  const fetchusermessage = async(RollNum) =>{
    try {
        const response = await axios.post(url, RollNum, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
        });

        if (response.status === 200) {
          await setData(response.data.result);
        }
    } catch (error) {
        console.error(error);
    }
  }
  function handleInputChange(e) {
       setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }
  return (
    <DashboardCard title="Personal Messages  شخصي پیغام">
      <>
      {
        teachersuggestionres ?
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Teacher</InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectvalue}
          label="Age"
          onChange={handleChange}
        >
            {
                teachersuggestionres &&(
                teachersuggestionres.map((item , ind)=>
                <MenuItem key={ind} value={item.roll}>{item.name}</MenuItem>
                )
                )
            }
        </Select>
      </FormControl>
            :
            null
      }
      <Box sx={style.chatBox} mt={1}>
            {
            data != undefined && (data.map((item , key)=>(
            <Box sx={style.client} key={key}>
            {/* <Box component="img" sx={style.image} src={`${imageServer}${item.Picture}`} /> */}
            <Box sx={style.clientBox}>
                {/* <Typography variant='h6' sx={style.heading}>
                {item.Name}
                </Typography> */}
                {item.Message}
            </Box>
            </Box>
            )))   
        }
    </Box>
    <form onSubmit={submitfunc}>
        <Box mt={1} display='flex'>
          <Input name="Message" onChange={handleInputChange}  placeholder='Enter Massage' />
          <button className='butnstyle'>
          <SendIcon />
          </button>
          </Box>

    </form>
       
      </>
    </DashboardCard>
  );
};

export default PrivateMessage;
