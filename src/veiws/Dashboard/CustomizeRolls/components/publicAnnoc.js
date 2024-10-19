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
import { Box, Card, Grid, Link, Switch, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Input } from '../../../../components/input/input';
import { CustomBtn } from '../../../../components/button/button';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PostRequest } from '../../../../redux/actions/PostRequest';
import List from './list';
// import Switch from '@mui/material/Switch';

const PublicAnnoc = () => {
  const theme = useTheme();
  const style = theme.palette.Main.Dashboard;

  const [data, setData] = useState([]);
  const url = useSelector((state) => state.Api.publicannouncemnet);
  const  imageServer = useSelector((state) => state.Api.imageServer);
  const addpublicannouncemnet = useSelector((state)=> state.Api.addpublicannouncemnet)
  const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
  const dispatch = useDispatch();
  const [ sentmessage , setSentmessage ] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
              setData(response.data.result);
              console.log(response.data.result)
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, [url, userToken,sentmessage]);

const [inputValues, setInputValues] = useState();
 function handleInputChange(e) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }

    const submitfunc = (event)=>{
      event.preventDefault();
      dispatch(PostRequest(addpublicannouncemnet ,userToken, inputValues ))
      setSentmessage((sentmessage)=>sentmessage+1)
  }

//   const func = () => {
//     console.log('func called')
//     setSentmessage(Math.random())
//   }
const func = () => {
    console.log('func called');
    setSentmessage(Math.random()) 
  };
  

  return (
    <DashboardCard title="Public Messages">
      <>
      <Box sx={style.chatBox}>
      {data.map((item, key) => (
        <Grid key={key} container>
            <List key={item.Srn} Name={item.Name} imageServer={imageServer} Srn={item.Srn} func={func} status={item.status} Picture={item.Picture} Message={item.Message} Time={item.Date} />
        </Grid>
        ))}

         {/* </Box> */}
      </Box>
      <form onSubmit={submitfunc}>
            <Box mt={1} display='flex'>
                <Input name="Message" onChange={handleInputChange} placeholder='Enter Massage' />
                <button className='butnstyle'>
                <SendIcon />
                </button>
            </Box>

      </form>
      </>
    </DashboardCard>
  );
};



export default PublicAnnoc