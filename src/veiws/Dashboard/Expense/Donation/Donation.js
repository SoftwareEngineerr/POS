import React , { useEffect, useState }  from 'react'
import PropTypes from 'prop-types'
import CustomForm from '../../../../components/form/form'
import { Main } from '../../../../constant'
import { CustomBtn } from '../../../../components/button/button'
import { Box, Grid } from '@mui/material'
import CustomTable from '../../../../components/table/SimpleTable'
import PageContainer from '../../../../components/Container/pageContainer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { FullDate } from '../../../../components/Date/FullDate'
import { PostRequest } from '../../../../redux/actions/PostRequest'

const Donation = (props) => {
    const [data , setData ] = useState(Main().Expense)
    const [getfilterdata , setGetfilterdata ] = useState(data.inputs.filter((item) => item.feildtype !== 'label'));
    const dispatch = useDispatch();
    const url = useSelector((state) => state.Api);
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const [initialInputValues , setInitialInputValues] = useState(Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, ''])
    ));
    const [ serverData , setServerData ] = useState()
    const [inputValues, setInputValues] = useState({...initialInputValues });
    function handleInputChange(e) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }
    
    const submitForm = async(e) =>{
        e.preventDefault();
        console.log(inputValues)
        await dispatch(PostRequest(url.donation , userToken , inputValues))
        // setUpdate((update)=>update+1)
        fetchData()
    }


      
          const fetchData = async (param1 , param2) => {
            const FromDate = new Date(param1);
            const newdate = `${FromDate.getFullYear()}-${FromDate.getMonth() + 1}-${FromDate.getDate()}`;
            console.log(newdate)
            

            // const payload = {...inputValues , ...Box(param1 ? {[param2]:newdate} : {})}
            const payload = { 
                ...inputValues,
                ...(param1 ? { [param2]: newdate } : {})
            };
            
            console.log(payload)
              try {
                  const response = await axios.post(url.veiwDonation, payload, {
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${userToken}`,
                      },
                  });
      
                  if (response.status === 200) {
                    // setServerData(response.data.result);
                    if(response.data.result != []){
                        setServerData((prevValues) => ({
                            ...prevValues,
                            veiwDonation: response.data.result,
                        }));
                    }
                  }
              } catch (error) {
                  console.error(error);
              }
          };
      


    const ChangeDate = (e , name) =>{
        console.log(e , name)
        const converterToDate = new Date(e)
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]:  `${converterToDate.getFullYear()}-${converterToDate.getMonth() + 1}-${converterToDate.getDate()}`
    }));
    fetchData(e,name)
    }
      
    // Table Data Ended
  return (
    <PageContainer title='Donation' description='Donation'>
        <form onSubmit={submitForm}>
            <Grid container>
            <CustomForm  data={data.inputs} handleInputChange={handleInputChange } />
            </Grid>
            <Box mt={2}>
                <CustomBtn mt={2} data={data.btn.data}  style={data.btn.style} />
            </Box>
            
        </form>


        <Box mt={3}>
                    <Grid container>
                        <CustomForm data={data.Date}  ChangeDate={ChangeDate}  />            
                    </Grid>
                    {
                        serverData && serverData.veiwDonation && serverData.veiwDonation.length !== 0 && (
                            <>
                                {/* <CustomForm data={serverData.veiwDonation} handleInputChange={handleInputChange} /> */}
                                <CustomTable data={serverData.veiwDonation} />
                            </>
                        )
                    }


        </Box>
    </PageContainer>
  )
}

Donation.propTypes = {}

export default Donation