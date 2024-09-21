import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ShowKhata from '../../../components/suggestionInput/showKhata'
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoader } from '../../../redux/actions/loader';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import CustomTable from '../../../components/table/SimpleTable';
import ShowKhataPerson from './component/ShowKhataPerson';

const KhataBill = props => {
    const [suggestions , setSuggestions] = useState();
    const dispatch = useDispatch();
    const api = useSelector((state)=>state.Api)

    const [inputValues, setInputValues] = useState({});
    const [ image , setImage ] = useState();


    useEffect(() => {
        const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
        try {
          dispatch(ShowLoader('1'))
          axios.get(api.khataSuggest, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
          })
          .then((res) => {
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
      }, []);

      function suggestionhandleInputChange(e) {
        setImage(e.target.Image)
        console.log(e)
        setInputValues((prevValues) => ({
            ...prevValues,
            id: e.target.id,
        }));
        // const RollNum = { RollNum: e.target.value}
        // fetchstudent(RollNum)   
    }
  return (
    <div>
        <Grid container>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <ShowKhata
                handleInputChange={suggestionhandleInputChange}
                Suggestions={suggestions}
                placeholder='Roll No / Name'
                name='RollNum'
                />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                {
                    inputValues.id && (
                        <ShowKhataPerson
                        id={inputValues.id}
                        />
                    )
                }
            </Grid>
            <Grid item lg={12}>
                <Typography variant='h1' textAlign='left' mb={2} mt={2}>
                    Old Records
                </Typography>
                <CustomTable data={[{Name:'Abdul-Sami',}]} />
            </Grid>
        </Grid>

    </div>
  )
}

KhataBill.propTypes = {}

export default KhataBill